import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Empty,
  Form,
  InputNumber,
  Row,
  Spin,
  Table,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { useTable } from "context";
import { useStudent } from "hooks";
import { Course } from "modules/pensum/models";
import { FC, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PrivateRoutes } from "routes";
import { SchoolReport, SchoolReportDetail } from "../models";

const { Item } = Form;

type CourseScoreContentProps = {
  courses: Course[];
  loading: boolean;
  idStudentAcademicYear: string;
  schoolReport?: SchoolReport;
  schoolReportDetails?: SchoolReportDetail[];
};

const CourseScoreContent: FC<CourseScoreContentProps> = ({
  courses,
  loading,
  idStudentAcademicYear,
  schoolReport,
  schoolReportDetails,
}) => {
  const { reload } = useTable();
  const { idAcademicYearPartial } = useParams();
  const navigate = useNavigate();
  const {
    createSchoolReport,
    updateSchoolReport,
    loading: studentLoading,
  } = useStudent({
    showInfo: "modal",
  });

  const createReport = useCallback(
    async ({ absences, conduct, tardiness, ...values }: any) => {
      if (!idAcademicYearPartial) return navigate("/error-404");

      const schoolReportDetails = Object.keys(values).map((idCourse) => ({
        idCourse: +idCourse,
        score: +values[idCourse],
      }));

      const schoolReport = {
        idAcademicYearPartial: +idAcademicYearPartial,
        absences: +absences,
        conduct: +conduct,
        tardiness: +tardiness,
        idStudentAcademicYear: +idStudentAcademicYear,
      };

      await createSchoolReport({ schoolReportDetails, schoolReport });

      reload();
    },
    []
  );

  const updateReport = useCallback(
    async ({ absences, conduct, tardiness, ...values }: any) => {
      if (!idAcademicYearPartial || !schoolReportDetails || !schoolReport)
        return navigate("/error-404");

      const newSchoolReportDetails = Object.keys(values).map((idCourse) => ({
        ...schoolReportDetails.find((x) => x.idCourse === +idCourse),
        idCourse: +idCourse,
        score: +values[idCourse],
      }));

      const newSchoolReport = {
        ...schoolReport,
        absences: +absences,
        conduct: +conduct,
        tardiness: +tardiness,
      };

      await updateSchoolReport({
        schoolReportDetails: newSchoolReportDetails,
        schoolReport: newSchoolReport,
      });

      reload();
    },
    [schoolReportDetails, schoolReport]
  );

  if (!courses.length)
    return (
      <Empty
        description={
          <>
            No existen asignaturas relacionadas a este grado en este año
            lectivo.
            <br />
            Para registrar asignaturas en este grado{" "}
            <Link to={PrivateRoutes.grade}>pulse aquí</Link>
          </>
        }
      />
    );

  const initialValues: any = {
    absences: schoolReport?.absences,
    tardiness: schoolReport?.tardiness,
    conduct: schoolReport?.conduct,
  };

  schoolReportDetails?.forEach(({ idCourse, score }) => {
    initialValues[idCourse] = score;
  });

  const columns: ColumnsType<Course> = [
    {
      title: "Asignatura",
      key: "course",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Notas",
      key: "idCourse",
      dataIndex: "idCourse",
      render: (_, { idCourse }) => (
        <Item
          name={idCourse}
          rules={[
            {
              required: true,
              message: `La nota no puede quedar vacía`,
            },
          ]}
        >
          <InputNumber style={{ width: 75 }} min={0} max={100} />
        </Item>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <Form
        layout="vertical"
        onFinish={!!schoolReport ? updateReport : createReport}
        initialValues={initialValues}
      >
        <Table
          dataSource={courses}
          columns={columns}
          pagination={{ hideOnSinglePage: true, pageSize: 100 }}
        />
        <Divider>Información adicional del parcial</Divider>
        <Row justify="space-around" gutter={[10, 0]} style={{ width: "100%" }}>
          <Col>
            <Item
              label={"Conducta"}
              name={"conduct"}
              rules={[
                {
                  required: true,
                  message: `La conducta no puede quedar vacía`,
                },
              ]}
            >
              <InputNumber style={{ width: 75 }} min={0} max={100} />
            </Item>
          </Col>
          <Col>
            <Item
              label={"Ausencias"}
              name={"absences"}
              rules={[
                {
                  required: true,
                  message: `El numero de ausencias no puede quedar vacío`,
                },
              ]}
            >
              <InputNumber style={{ width: 75 }} min={0} max={100} />
            </Item>
          </Col>
          <Col>
            <Item
              label={"Tardanzas"}
              name={"tardiness"}
              rules={[
                {
                  required: true,
                  message: `El numero de tardanzas no puede quedar vacía`,
                },
              ]}
            >
              <InputNumber style={{ width: 75 }} min={0} max={100} />
            </Item>
          </Col>
        </Row>
        <Divider />
        <Row justify="center" style={{ width: "100%" }} gutter={[30, 30]}>
          <Col>
            <Button
              tabIndex={-1}
              type="default"
              onClick={() => navigate("/academic-year")}
              icon={<LeftOutlined />}
            >
              Regresar
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              loading={studentLoading}
              icon={<SaveOutlined />}
            >
              Guardar cambios
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
export default CourseScoreContent;
