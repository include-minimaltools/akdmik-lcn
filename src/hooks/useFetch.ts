import { message } from "antd";
import { AxiosError, CanceledError } from "axios";
import type { ErrorResponse, AxiosCall, ApiResponse } from "models";
import { useEffect, useState } from "react";

const useFetch = () => {
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

      message.success(result.message);
    } catch (error) {
      if (error instanceof CanceledError<ErrorResponse>) {
        message.info("Se ha cancelado la petición de datos");
      } else if (error instanceof AxiosError<ErrorResponse>) {
        const { response } = error as AxiosError<ErrorResponse>;
        result.error = true;
        result.message = response?.data.detail || error.message;
        message.error(result.message);
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
