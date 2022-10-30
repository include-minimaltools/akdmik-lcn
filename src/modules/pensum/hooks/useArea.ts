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

  const create = useCallback((Area: Area) => {
    return callEndpoint(createArea(Area));
  }, []);

  const update = useCallback((Area: Area) => {
    return callEndpoint(updateArea(Area));
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
