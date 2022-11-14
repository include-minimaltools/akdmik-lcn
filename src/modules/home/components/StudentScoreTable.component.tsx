import { SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Row,
  Spin,
  Table,
  Typography,
} from "antd";
import { useServiceWithParams, useStudent } from "hooks";
import { ColumnsType, StudentAcademicYearGrade } from "models";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCoursesByGrade,
  getStudentByAcademicYearPartialAndGrade,
} from "services";

const { Item } = Form;

type StudentScoreTableProps = {
  idGrade: number;
  description: string;
};

const StudentScoreTable: FC<StudentScoreTableProps> = ({
  idGrade,
  description,
}) => {
  const { idAcademicYearPartial, idAcademicYear } = useParams();
  const navigate = useNavigate();
  const { saveGradeSchoolReport } = useStudent({ showInfo: "message" });
  const [students, loading] = useServiceWithParams(
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

  if (loading) return <Spin style={{ width: "100%" }} />;

  const initialValues: any = {};
  students?.forEach(({ schoolReport, schoolReportDetails, idStudent }) => {
    initialValues[`absences$${idStudent}`] =
      schoolReport?.absences ?? undefined;
    initialValues[`tardiness$${idStudent}`] =
      schoolReport?.tardiness ?? undefined;
    initialValues[`conduct$${idStudent}`] = schoolReport?.conduct ?? undefined;

    schoolReportDetails?.forEach(({ idCourse, score }) => {
      initialValues[`${idCourse}$${idStudent}`] = score ?? undefined;
    });
  });

  const courseColumns: ColumnsType<StudentAcademicYearGrade> =
    courses?.map(({ name, idCourse }) => ({
      title: (
        <Typography.Text
          key={`title-${idCourse}`}
          style={{
            writingMode: "vertical-rl",
            maxHeight: 200,
          }}
        >
          {name}
        </Typography.Text>
      ),
      width: "75px",
      render: (_, { idStudent }) => (
        <Item
          name={`${idCourse}$${idStudent}`}
          noStyle
          key={`item-${idCourse}`}
        >
          <InputNumber
            style={{ width: "100%", height: "100%" }}
            min={0}
            max={100}
            bordered={false}
          />
        </Item>
      ),
    })) || [];

  const columns: ColumnsType<StudentAcademicYearGrade> = [
    {
      title: "Estudiantes",
      fixed: "left",
      width: 100,
      render: (_, { name, lastName }) => `${name} ${lastName}`,
    },
    ...courseColumns,
    {
      title: (
        <Typography.Text
          style={{
            writingMode: "vertical-rl",
            maxHeight: 200,
          }}
        >
          Conducta
        </Typography.Text>
      ),
      width: "75px",
      render: (_, { idStudent }) => (
        <Item name={`conduct$${idStudent}`} noStyle>
          <InputNumber
            style={{ width: "100%", height: "100%" }}
            min={0}
            max={100}
            bordered={false}
          />
        </Item>
      ),
    },
    {
      title: (
        <Typography.Text
          style={{
            writingMode: "vertical-rl",
            maxHeight: 200,
          }}
        >
          Ausencias
        </Typography.Text>
      ),
      width: "75px",
      render: (_, { idStudent }) => (
        <Item name={`absences$${idStudent}`} noStyle>
          <InputNumber
            style={{ width: "100%", height: "100%" }}
            min={0}
            max={100}
            bordered={false}
          />
        </Item>
      ),
    },
    {
      title: (
        <Typography.Text
          style={{
            writingMode: "vertical-rl",
            maxHeight: 200,
          }}
        >
          Tardanzas
        </Typography.Text>
      ),
      width: "75px",
      render: (_, { idStudent }) => (
        <Item name={`tardiness$${idStudent}`} noStyle>
          <InputNumber
            style={{ width: "100%", height: "100%" }}
            min={0}
            max={100}
            bordered={false}
          />
        </Item>
      ),
    },
  ];

  const onFinish = async (values: any) => {
    if (!idAcademicYearPartial || !students || !courses || !idAcademicYear)
      return navigate("/error-404");

    const result = students.map(({ idStudent, idStudentAcademicYear }) => {
      const schoolReportDetails = courses.map(({ idCourse }) => ({
        idCourse,
        score: values[`${idCourse}$${idStudent}`] as number,
      }));

      const schoolReport = {
        idAcademicYearPartial: +idAcademicYearPartial,
        absences: values[`absences$${idStudent}`] as number,
        conduct: values[`conduct$${idStudent}`] as number,
        tardiness: +values[`tardiness$${idStudent}`] as number,
        idStudentAcademicYear: idStudentAcademicYear,
      };

      return { schoolReportDetails, schoolReport };
    });

    await saveGradeSchoolReport({
      body: result,
      idAcademicYear: +idAcademicYear,
      idGrade,
    });
  };

  return (
    <Form onFinish={onFinish} initialValues={initialValues}>
      <Row justify="end" style={{ padding: "0 0 10px" }}>
        <Button
          type="primary"
          htmlType="submit"
          shape="round"
          icon={<SaveOutlined />}
        >
          Guardar Notas de {description}
        </Button>
      </Row>
      <Table
        columns={columns}
        dataSource={students}
        bordered
        size="small"
        scroll={{ x: 1000 }}
        pagination={{ pageSize: 100, hideOnSinglePage: true }}
        rowKey={({ idStudent }) => `row-${idStudent}-${idGrade}`}
        loading={loading || coursesLoading}
      />
    </Form>
  );
};
export default StudentScoreTable;
