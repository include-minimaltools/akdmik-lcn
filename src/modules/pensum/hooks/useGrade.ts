import type { Grade } from "../models";
import { useFetch } from "hooks";
import { useCallback } from "react";
import {
  createGrade,
  createGradeWithCourses,
  deleteGrade,
  getGrade,
  getGrades,
  updateGrade,
  updateGradeWithCourses,
} from "../services";
import { optionFetchType } from "hooks/useFetch";

const useGrade = (options: optionFetchType = {}) => {
  const { loading, callEndpoint } = useFetch(options);

  const create = useCallback((grade: Grade) => {
    return callEndpoint(createGrade(grade));
  }, []);

  const update = useCallback((grade: Grade) => {
    return callEndpoint(updateGrade(grade));
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

  const createWithCourses = useCallback((grade: Required<Grade>) => {
    return callEndpoint(createGradeWithCourses(grade));
  }, []);

  const updateWithCourses = useCallback((grade: Required<Grade>) => {
    return callEndpoint(updateGradeWithCourses(grade));
  }, []);

  return {
    get,
    getAll,
    create,
    update,
    remove,
    updateWithCourses,
    createWithCourses,
    loading,
  };
};

export default useGrade;
