import type { AcademicYear } from "../models";
import { useFetch } from "hooks";
import { useCallback } from "react";
import {
  createAcademicYear,
  disableAcademicYear,
  disableAcademicYearPartial,
  getAcademicYear,
  getAcademicYears,
  reactivateAcademicYearPartial,
} from "../services";
import { optionFetchType } from "hooks/useFetch";

const useAcademicYear = (options: optionFetchType = {}) => {
  const { loading, callEndpoint } = useFetch(options);

  const create = useCallback((academicYear: AcademicYear) => {
    return callEndpoint(createAcademicYear(academicYear));
  }, []);

  // const update = useCallback((academicYear: AcademicYear) => {
  //   return callEndpoint(updateAcademicYear(academicYear));
  // }, []);

  const getAll = useCallback(() => {
    return callEndpoint(getAcademicYears());
  }, []);

  const disable = useCallback((idAcademicYear: number) => {
    return callEndpoint(disableAcademicYear(idAcademicYear));
  }, []);

  const disablePartial = useCallback((idAcademicYearPartial: number) => {
    return callEndpoint(disableAcademicYearPartial(idAcademicYearPartial));
  }, []);

  const reactivatePartial = useCallback((idAcademicYearPartial: number) => {
    return callEndpoint(reactivateAcademicYearPartial(idAcademicYearPartial));
  }, []);

  const get = useCallback((idAcademicYear: number) => {
    return callEndpoint(getAcademicYear(idAcademicYear));
  }, []);

  return {
    get,
    getAll,
    create,
    disable,
    disablePartial,
    reactivatePartial,
    loading,
  };
};

export default useAcademicYear;
