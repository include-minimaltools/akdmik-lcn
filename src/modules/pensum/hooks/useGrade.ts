import type { Grade } from "../models";
import { useFetch } from "hooks";
import { useCallback } from "react";
import {
  createGrade,
  deleteGrade,
  getGrade,
  getGrades,
  updateGrade,
} from "../services";
import { optionFetchType } from "hooks/useFetch";

const useGrade = (options: optionFetchType = {}) => {
  const { loading, callEndpoint } = useFetch(options);

  const create = useCallback((Grade: Grade) => {
    return callEndpoint(createGrade(Grade));
  }, []);

  const update = useCallback((Grade: Grade) => {
    return callEndpoint(updateGrade(Grade));
  }, []);

  const getAll = useCallback(() => {
    return callEndpoint(getGrades());
  }, []);

  const remove = useCallback((idGrade: number) => {
    return callEndpoint(deleteGrade(idGrade));
  }, []);

  const get = useCallback((idGrade: number) => {
    return callEndpoint(getGrade(idGrade));
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

export default useGrade;
