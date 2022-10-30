import type { Partial } from "../models";
import { useFetch } from "hooks";
import { useCallback } from "react";
import {
  createPartial,
  deletePartial,
  getPartial,
  getPartials,
  updatePartial,
} from "../services";
import { optionFetchType } from "hooks/useFetch";

const usePartial = (options: optionFetchType = {}) => {
  const { loading, callEndpoint } = useFetch(options);

  const create = useCallback((partial: Partial) => {
    return callEndpoint(createPartial(partial));
  }, []);

  const update = useCallback((partial: Partial) => {
    return callEndpoint(updatePartial(partial));
  }, []);

  const getAll = useCallback(() => {
    return callEndpoint(getPartials());
  }, []);

  const remove = useCallback((idPartial: number) => {
    return callEndpoint(deletePartial(idPartial));
  }, []);

  const get = useCallback((idPartial: number) => {
    return callEndpoint(getPartial(idPartial));
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

export default usePartial;
