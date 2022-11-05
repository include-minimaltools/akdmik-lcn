import { Spin, Tabs } from "antd";
import { useService } from "hooks";
import { getGrades } from "services";
import { GradeStudentTable } from "../components";

const AcademicYearStudent = () => {
  const [grades, loading] = useService(getGrades);

  return (
    <Spin spinning={loading}>
      <Tabs
        style={{ marginTop: "1rem", height: "100%", margin: "1rem" }}
        tabPosition="left"
        items={grades?.map(({ idGrade, active, description }) => ({
          label: description,
          key: idGrade.toString(),
          children: <GradeStudentTable idGrade={idGrade} />,
          disabled: !active,
          forceRender: false,
        }))}
        destroyInactiveTabPane
      />
    </Spin>
  );
};
export default AcademicYearStudent;
