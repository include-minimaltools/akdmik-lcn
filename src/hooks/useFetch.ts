import { message, Modal } from "antd";
import { AxiosError, CanceledError } from "axios";
import type { ErrorResponse, AxiosCall, ApiResponse } from "models";
import { useEffect, useState } from "react";

export type optionFetchType = {
  showInfo?: "modal" | "message";
};

const useFetch = ({ showInfo }: optionFetchType = {}) => {
  const [loading, setLoading] = useState(false);
  let controller: AbortController;

  const callEndpoint = async <T>(call: AxiosCall<ApiResponse<T>>) => {
    if (call.controller) controller = call.controller;

    setLoading(true);

    let result = {} as ApiResponse<T>;

    try {
      const { data } = await call.call;
      result.error = data.error;
      result.data = data.data;
      result.message = data.message;

      if (showInfo == "message") message.success(result.message, 0.75);
      else if (showInfo == "modal")
        Modal.success({
          title: result.message,
          maskClosable: true
        });
    } catch (error) {
      if (error instanceof CanceledError<ErrorResponse>) {
        message.info("Se ha cancelado la petición de datos");
      } else if (error instanceof AxiosError<ErrorResponse>) {
        const { response } = error as AxiosError<ErrorResponse>;
        result.error = true;

        // console.log(response);
        result.message =
          Object.values(response?.data.errors || {}).join("\n") ||
          response?.data?.message ||
          response?.data.detail ||
          response?.data.title ||
          error.message;

        if (showInfo == "modal")
          Modal.error({
            title: "Ha ocurrido un error",
            content: result.message,
          });
        else if (showInfo == "message") message.error(result.message);
      }
    } finally {
      setLoading(false);
      return result;
    }
  };

  const cancelEndpoint = () => {
    setLoading(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => cancelEndpoint();
  }, []);

  return { loading, callEndpoint };
};

export default useFetch;
