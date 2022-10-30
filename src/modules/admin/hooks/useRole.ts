import type { Role, User } from "models";
import { useFetch } from "hooks";
import { useCallback } from "react";
import {
  createRole,
  deleteRole,
  getRole,
  getRoles,
  updateRole,
} from "../services";
import { optionFetchType } from "hooks/useFetch";

const useRole = (options: optionFetchType = {}) => {
  const { loading, callEndpoint } = useFetch(options);

  const create = useCallback((role: Role) => {
    return callEndpoint(createRole(role));
  }, []);

  const update = useCallback((role: Role) => {
    return callEndpoint(updateRole(role));
  }, []);

  const getAll = useCallback(() => {
    return callEndpoint(getRoles());
  }, []);

  const remove = useCallback((idRole: number) => {
    return callEndpoint(deleteRole(idRole));
  }, []);

  const get = useCallback((idRole: number) => {
    return callEndpoint(getRole(idRole));
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

export default useRole;
