import type { Area } from "../models";
import { useFetch } from "hooks";
import { useCallback } from "react";
import {
  createArea,
  deleteArea,
  getArea,
  getAreas,
  updateArea,
} from "../services";
import { optionFetchType } from "hooks/useFetch";

const useArea = (options: optionFetchType = {}) => {
  const { loading, callEndpoint } = useFetch(options);

  const create = useCallback((area: Area) => {
    return callEndpoint(createArea(area));
  }, []);

  const update = useCallback((area: Area) => {
    return callEndpoint(updateArea(area));
  }, []);

  const getAll = useCallback(() => {
    return callEndpoint(getAreas());
  }, []);

  const remove = useCallback((idArea: number) => {
    return callEndpoint(deleteArea(idArea));
  }, []);

  const get = useCallback((idArea: number) => {
    return callEndpoint(getArea(idArea));
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

export default useArea;
