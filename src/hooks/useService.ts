import { ApiResponse, AxiosCall } from "models";
import { DependencyList, useCallback, useEffect, useState } from "react";
import useFetch from "./useFetch";

type serviceType<T> = () => AxiosCall<ApiResponse<T>>;

const useService = <T>(
  service: serviceType<T>,
  deps: DependencyList = []
): [T | undefined, boolean, Function] => {
  const [data, setData] = useState<T>();
  const { loading, callEndpoint } = useFetch();

  useEffect(() => {
    let isActive = true;

    callEndpoint(service()).then((response) => {
      isActive && setData(response.data);
    });

    return () => {
      isActive = false;
    };
  }, deps);

  const reload = useCallback(async () => {
    callEndpoint(service()).then((response) => setData(response.data));
  }, []);

  return [data, loading, reload];
};

export default useService;
