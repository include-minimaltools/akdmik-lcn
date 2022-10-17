import { ApiResponse, AxiosCall } from "models";
import { DependencyList, useEffect, useState } from "react";
import useFetch from "./useFetch";

type serviceType<T> = () => AxiosCall<ApiResponse<T>>;

const useService = <T>(service: serviceType<T>, deps: DependencyList = []) => {
  const [response, setResponse] = useState<ApiResponse<T>>();
  const { loading, callEndpoint } = useFetch();

  useEffect(() => {
    let isActive = true;

    callEndpoint(service()).then((response) => {
      isActive && setResponse(response);
    });

    return () => {
      isActive = false;
    };
  }, deps);

  return { response, loading };
};

export default useService;
