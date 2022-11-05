import { Empty, Spin, Tabs } from "antd";
import { useSearch, useServiceWithParams } from "hooks";
import { getStudentByAcademicYearPartialAndGrade } from "services";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import HomeRoutes from "../home.routes";
import CourseScoreContent from "./CourseScoreContent.component";

type StudentTabsProps = { idGrade: number };

const StudentTabs: FC<StudentTabsProps> = ({ idGrade }) => {
  const { idAcademicYearPartial } = useParams();
  const [students, loading] = useServiceWithParams(
    getStudentByAcademicYearPartialAndGrade,
    {
      idAcademicYearPartial: idAcademicYearPartial ? +idAcademicYearPartial : 0,
      idGrade,
    },
    [idAcademicYearPartial, idGrade]
  );
  const { searchValue } = useSearch(
    [
      {
        label: "Nombres de Estudiante",
        options: students?.map((x) => x.name) || [],
      },
      {
        label: "ApellidoS de Estudiante",
        options: students?.map((x) => x.lastName) || [],
      },
      {
        label: "Carnet",
        options: students?.map((x) => x.idStudent) || [],
      },
    ],
    [students]
  );

  if (!students?.length)
    return (
      <Empty
        description={
          <>
            No existen alumnos relacionados a este grado en este año lectivo.
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
      <Tabs
        style={{ marginTop: "1rem", height: "74vh", margin: "1rem" }}
        tabPosition="left"
        items={students
          ?.filter(
            (x) =>
              x.name.includes(searchValue) ||
              x.lastName.includes(searchValue) ||
              x.idStudent.includes(searchValue)
          )
          .map(({ idStudent, status, name, lastName }) => ({
            label: `${name} ${lastName}`,
            key: `tab-${idGrade}-${idStudent}`,
            children: <CourseScoreContent />,
            disabled: status !== "A",
            forceRender: false,
          }))}
        destroyInactiveTabPane
      />
    </Spin>
  );
};
export default StudentTabs;
