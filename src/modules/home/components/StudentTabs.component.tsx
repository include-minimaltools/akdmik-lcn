import { Empty, Spin, Tabs } from "antd";
import { useSearch, useServiceWithParams } from "hooks";
import {
  getCoursesByGrade,
  getStudentByAcademicYearPartialAndGrade,
} from "services";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import HomeRoutes from "../home.routes";
import CourseScoreContent from "./CourseScoreContent.component";
import { TableProvider } from "context";

type StudentTabsProps = { idGrade: number };

const StudentTabs: FC<StudentTabsProps> = ({ idGrade }) => {
  const { idAcademicYearPartial } = useParams();
  const [students, loading, reload] = useServiceWithParams(
    getStudentByAcademicYearPartialAndGrade,
    {
      idAcademicYearPartial: idAcademicYearPartial ? +idAcademicYearPartial : 0,
      idGrade,
    },
    [idAcademicYearPartial, idGrade]
  );

  const [courses, coursesLoading] = useServiceWithParams(
    getCoursesByGrade,
    { idGrade },
    [idGrade]
  );

  const { searchValue } = useSearch(
    [
      {
        label: "Nombres de Estudiante",
        options: students?.map((x) => x.name) || [],
      },
      {
        label: "Apellidos de Estudiante",
        options: students?.map((x) => x.lastName) || [],
      },
      {
        label: "Carnet",
        options: students?.map((x) => x.idStudent) || [],
      },
    ],
    [students]
  );

  if (students && !students.length)
    return (
      <Empty
        description={
          <>
            No existen alumnos relacionados a este grado en este año lectivo.
            <br />
            Para registrar estudiantes en este grado{" "}
            <Link
              to={[HomeRoutes.academicYearStudent, idAcademicYearPartial].join(
                "/"
              )}
            >
              pulse aquí
            </Link>
          </>
        }
      />
    );

  return (
    <Spin spinning={loading}>
      <TableProvider reload={reload}>
        <Tabs
          style={{ marginTop: "1rem", minHeight: "74vh", margin: "1rem" }}
          tabPosition="left"
          items={students
            ?.filter(
              (x) =>
                x.name.includes(searchValue) ||
                x.lastName.includes(searchValue) ||
                x.idStudent.includes(searchValue)
            )
            .map(
              ({
                idStudent,
                status,
                name,
                lastName,
                idStudentAcademicYear,
                schoolReport,
                schoolReportDetails,
              }) => ({
                label: `${name} ${lastName}`,
                key: `tab-${idGrade}-${idStudent}`,
                children: (
                  <CourseScoreContent
                    key={`${idStudent}-${idStudentAcademicYear}-${idAcademicYearPartial}`}
                    courses={courses || []}
                    loading={coursesLoading}
                    idStudentAcademicYear={idStudentAcademicYear}
                    schoolReport={schoolReport}
                    schoolReportDetails={schoolReportDetails}
                  />
                ),
                disabled: status !== "A",
                forceRender: false,
              })
            )}
          destroyInactiveTabPane
        />
      </TableProvider>
    </Spin>
  );
};
export default StudentTabs;
