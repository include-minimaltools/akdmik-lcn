import { useFetch, useService } from "hooks";
import { useCallback } from "react";
import { getUsers } from "../services";

const useUser = () => {
  const { loading, response } = useService(getUsers);
  const { loading: loadingFetch, callEndpoint } = useFetch();

  const createUser = useCallback(() => {}, []);

  return {
    users: response?.data,
    loading,
    loadingFetch,
  };
};

export default useUser;
