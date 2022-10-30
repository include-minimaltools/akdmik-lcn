import type { User } from "models";
import { useFetch, useService } from "hooks";
import { useCallback } from "react";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../services";
import { optionFetchType } from "hooks/useFetch";

const useUser = (options: optionFetchType = {}) => {
  const { loading, callEndpoint } = useFetch(options);

  const create = useCallback((user: User) => {
    return callEndpoint(createUser(user));
  }, []);

  const update = useCallback((user: User) => {
    return callEndpoint(updateUser(user));
  }, []);

  const getAll = useCallback(() => {
    return callEndpoint(getUsers());
  }, []);

  const remove = useCallback((username: string) => {
    return callEndpoint(deleteUser(username));
  }, []);

  const get = useCallback((username: string) => {
    return callEndpoint(getUser(username));
  }, []);

  return {
    get,
    getAll,
    create,
    update,
    remove,
    loading,
  };
};

export default useUser;
