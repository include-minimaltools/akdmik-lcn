import type { Parent } from "../models";
import { useFetch } from "hooks";
import { useCallback } from "react";
import {
  createParent,
  deleteParent,
  getParent,
  getParents,
  updateParent,
} from "../services";
import { optionFetchType } from "hooks/useFetch";

const useParent = (options: optionFetchType = {}) => {
  const { loading, callEndpoint } = useFetch(options);

  const create = useCallback((parent: Parent) => {
    return callEndpoint(createParent(parent));
  }, []);

  const update = useCallback((parent: Parent) => {
    return callEndpoint(updateParent(parent));
  }, []);

  const getAll = useCallback(() => {
    return callEndpoint(getParents());
  }, []);

  const remove = useCallback((idParent: number) => {
    return callEndpoint(deleteParent(idParent));
  }, []);

  const get = useCallback((idParent: number) => {
    return callEndpoint(getParent(idParent));
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

export default useParent;
