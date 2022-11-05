import { ApiResponse, AxiosCall } from "models";
import { DependencyList, useCallback, useEffect, useState } from "react";
import useFetch from "./useFetch";

type serviceType<M, P> = (params: P) => AxiosCall<ApiResponse<M>>;

const useServiceWithParams = <M, P>(
  service: serviceType<M, P>,
  params: P,
  deps: DependencyList = []
): [M | undefined, boolean, () => void] => {
  const [data, setData] = useState<M>();
  const { loading, callEndpoint } = useFetch();

  useEffect(() => {
    let isActive = true;

    callEndpoint(service(params)).then((response) => {
      isActive && setData(response.data);
    });

    return () => {
      isActive = false;
    };
  }, deps);

  const reload = useCallback(async () => {
    callEndpoint(service(params)).then((response) => setData(response.data));
  }, []);

  return [data, loading, reload];
};

export default useServiceWithParams;
