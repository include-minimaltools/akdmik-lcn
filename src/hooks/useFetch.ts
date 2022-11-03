import { message, Modal } from "antd";
import { AxiosError, CanceledError } from "axios";
import type { ErrorResponse, AxiosCall, ApiResponse } from "models";
import { useEffect, useState } from "react";

export type showTypes = "modal" | "message" | "none";

export type optionFetchType = {
  showInfo?: showTypes;
};

const useFetch = ({ showInfo }: optionFetchType = { showInfo: "none" }) => {
  const [loading, setLoading] = useState(false);
  let controller: AbortController;

  const callEndpoint = async <T>(
    call: AxiosCall<ApiResponse<T>>,
    show = showInfo
  ) => {
    if (call.controller) controller = call.controller;

    setLoading(true);

    let result = {} as ApiResponse<T>;

    try {
      const { data } = await call.call;
      result.error = data.error;
      result.data = data.data;
      result.message = data.message;

      if (show == "message") message.success(result.message, 0.75);
      else if (show == "modal")
        Modal.success({
          title: result.message,
          maskClosable: true,
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

        if (show == "modal")
          Modal.error({
            title: "Ha ocurrido un error",
            content: result.message,
          });
        else if (show == "message") message.error(result.message);
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
