import type { Course } from "../models";
import { useFetch } from "hooks";
import { useCallback } from "react";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../services";
import { optionFetchType } from "hooks/useFetch";

const useCourse = (options: optionFetchType = {}) => {
  const { loading, callEndpoint } = useFetch(options);

  const create = useCallback((Course: Course) => {
    return callEndpoint(createCourse(Course));
  }, []);

  const update = useCallback((Course: Course) => {
    return callEndpoint(updateCourse(Course));
  }, []);

  const getAll = useCallback(() => {
    return callEndpoint(getCourses());
  }, []);

  const remove = useCallback((idCourse: number) => {
    return callEndpoint(deleteCourse(idCourse));
  }, []);

  const get = useCallback((idCourse: number) => {
    return callEndpoint(getCourse(idCourse));
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

export default useCourse;
