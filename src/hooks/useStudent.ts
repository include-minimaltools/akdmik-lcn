import type { Student } from "models";
import { useFetch } from "hooks";
import { useCallback } from "react";
import { createSchoolReportWithDetailsProps, saveGradeSchoolReportWithDetails, saveGradeSchoolReportWithDetailsProps } from "services";
import {
  createSchoolReportWithDetails,
  createStudent,
  createStudentWithParents,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
  updateStudentWithParents,
  updateSchoolReportWithDetails,
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

  const createSchoolReport = useCallback(
    (args: createSchoolReportWithDetailsProps) => {
      return callEndpoint(createSchoolReportWithDetails(args));
    },
    []
  );

  const updateSchoolReport = useCallback(
    (args: createSchoolReportWithDetailsProps) => {
      return callEndpoint(updateSchoolReportWithDetails(args));
    },
    []
  );

  const saveGradeSchoolReport = useCallback(
    (args: saveGradeSchoolReportWithDetailsProps) => {
      return callEndpoint(saveGradeSchoolReportWithDetails(args));
    },
    []
  );


  return {
    get,
    getAll,
    create,
    createWithParents,
    update,
    updateWithParents,
    createSchoolReport,
    updateSchoolReport,
    saveGradeSchoolReport,
    remove,
    loading,
  };
};

export default useStudent;
