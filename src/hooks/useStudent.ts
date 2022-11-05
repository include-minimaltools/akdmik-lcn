import type { Student } from "models";
import { useFetch } from "hooks";
import { useCallback } from "react";
import {
  createStudent,
  createStudentWithParents,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
  updateStudentWithParents,
} from "services";
import { optionFetchType } from "hooks/useFetch";

const useStudent = (options: optionFetchType = {}) => {
  const { loading, callEndpoint } = useFetch(options);

  const create = useCallback((student: Student) => {
    return callEndpoint(createStudent(student));
  }, []);

  const createWithParents = useCallback((student: Student) => {
    return callEndpoint(createStudentWithParents(student));
  }, []);

  const update = useCallback((student: Student) => {
    return callEndpoint(updateStudent(student));
  }, []);

  const updateWithParents = useCallback((student: Student) => {
    return callEndpoint(updateStudentWithParents(student));
  }, []);

  const getAll = useCallback(() => {
    return callEndpoint(getStudents());
  }, []);

  const remove = useCallback((idStudent: number) => {
    return callEndpoint(deleteStudent(idStudent));
  }, []);

  const get = useCallback((idStudent: number) => {
    return callEndpoint(getStudent(idStudent));
  }, []);

  return {
    get,
    getAll,
    create,
    createWithParents,
    update,
    updateWithParents,
    remove,
    loading,
  };
};

export default useStudent;
