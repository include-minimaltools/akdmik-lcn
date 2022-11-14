import { Divider, Form, Row, Spin, Switch, Tabs, Typography } from "antd";
import { useService, useServiceWithParams } from "hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getGrades } from "services";
import { StudentScoreTable, StudentTabs } from "../components";
import { getInfoByIdAcademicYearPartial } from "../services";

const { Title } = Typography;

const RegistryScore = () => {
  const { idAcademicYearPartial } = useParams();
  const [grades, loading] = useService(getGrades);
  const [info, infoLoading] = useServiceWithParams(
    getInfoByIdAcademicYearPartial,
    {
      idAcademicYearPartial: idAcademicYearPartial ? +idAcademicYearPartial : 0,
    },
    [idAcademicYearPartial]
  );
  const [isPerStudentMode, setIsPerStudentMode] = useState(false);

  return (
    <>
      <Row justify="space-around" style={{ margin: "30px 0 0 0" }}>
        <Title>Registro de Notas</Title>
        <Title level={4}>
          {info?.partialName} - {info?.year}
        </Title>
        <Form.Item label="Visualización por Estudiante">
          <Switch
            checked={isPerStudentMode}
            onChange={setIsPerStudentMode}
            loading={loading}
          />
        </Form.Item>
      </Row>
      <Divider />
      <Spin spinning={loading}>
        <Tabs
          style={{ marginTop: "1rem", height: "100%", margin: "1rem" }}
          tabPosition={isPerStudentMode ? "left" : "top"}
          items={grades?.map(({ idGrade, active, description }) => ({
            label: description,
            key: `tab-${idGrade}`,
            children: isPerStudentMode ? (
              <StudentTabs idGrade={idGrade} key={`pane-${idGrade}`} />
            ) : (
              <StudentScoreTable
                description={description}
                idGrade={idGrade}
                key={`pane-${idGrade}`}
              />
            ),
            disabled: !active,
            forceRender: false,
          }))}
        />
      </Spin>
    </>
  );
};
export default RegistryScore;
