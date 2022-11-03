export type PartialStatus = "P" | "C" | "F";

export type AcademicYearPartial = {
  idAcademicYearPartial: number;
  status: PartialStatus;
  name: string;
};
