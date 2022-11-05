import type { AcademicYear } from "../models";
import { useFetch } from "hooks";
import { useCallback } from "react";
import {
  createAcademicYear,
  disableAcademicYear,
  disableAcademicYearPartial,
  finishAcademicYear,
  finishAcademicYearPartial,
  finishAcademicYearWithPartials,
  getAcademicYear,
  getAcademicYears,
  reactivateAcademicYearPartial,
  registerStudentsInAcademicYearGrade,
  unregisterStudentsInAcademicYearGrade,
} from "../services";
import { optionFetchType, showTypes } from "hooks/useFetch";

const useAcademicYear = (options: optionFetchType = { showInfo: "none" }) => {
  const { loading, callEndpoint } = useFetch(options);

  const create = useCallback((academicYear: AcademicYear) => {
    return callEndpoint(createAcademicYear(academicYear));
  }, []);

  const getAll = useCallback(() => {
    return callEndpoint(getAcademicYears());
  }, []);

  const disable = useCallback((idAcademicYear: number) => {
    return callEndpoint(disableAcademicYear(idAcademicYear));
  }, []);

  const finish = useCallback(
    (idAcademicYear: number, showType = options.showInfo) => {
      return callEndpoint(finishAcademicYear(idAcademicYear), showType);
    },
    []
  );

  const finishWithPartials = useCallback(
    (idAcademicYear: number, showType = options.showInfo) => {
      return callEndpoint(
        finishAcademicYearWithPartials(idAcademicYear),
        showType
      );
    },
    []
  );

  const disablePartial = useCallback((idAcademicYearPartial: number) => {
    return callEndpoint(disableAcademicYearPartial(idAcademicYearPartial));
  }, []);

  const reactivatePartial = useCallback((idAcademicYearPartial: number) => {
    return callEndpoint(reactivateAcademicYearPartial(idAcademicYearPartial));
  }, []);

  const finishPartial = useCallback((idAcademicYearPartial: number) => {
    return callEndpoint(finishAcademicYearPartial(idAcademicYearPartial));
  }, []);

  const get = useCallback((idAcademicYear: number) => {
    return callEndpoint(getAcademicYear(idAcademicYear));
  }, []);

  const registerStudentsInGrade = useCallback(
    (idAcademicYear: number, idGrade: number, idStudents: string[]) => {
      return callEndpoint(
        registerStudentsInAcademicYearGrade({
          idAcademicYear,
          idGrade,
          idStudents,
        })
      );
    },
    []
  );

  const unregisterStudentsInGrade = useCallback(
    (idAcademicYear: number, idGrade: number, idStudents: string[]) => {
      return callEndpoint(
        unregisterStudentsInAcademicYearGrade({
          idAcademicYear,
          idGrade,
          idStudents,
        })
      );
    },
    []
  );

  return {
    get,
    getAll,
    create,
    disable,
    finish,
    finishPartial,
    disablePartial,
    reactivatePartial,
    finishWithPartials,
    registerStudentsInGrade,
    unregisterStudentsInGrade,
    loading,
  };
};

export default useAcademicYear;
