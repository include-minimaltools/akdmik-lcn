import { DisconnectOutlined, LinkOutlined } from "@ant-design/icons";
import { Badge, Button, Col, Row, Table, TableColumnsType } from "antd";
import { TableProps } from "antd/es/table";
import { TableRowSelection } from "antd/lib/table/interface";
import { useSearch, useServiceWithParams } from "hooks";
import { FC, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAcademicYear } from "../hooks";
import { StudentGrade } from "../models/StudentGrade.model";
import { getStudentsByAcademicYearAndGrade } from "../services";

type GradeStudentTableProps = {
  idGrade: number;
};

const GradeStudentTable: FC<GradeStudentTableProps> = ({ idGrade }) => {
  const { idAcademicYear } = useParams();
  const [students, loading, reload] = useServiceWithParams(
    getStudentsByAcademicYearAndGrade,
    { idAcademicYear: (idAcademicYear && +idAcademicYear) || 0, idGrade },
    [idAcademicYear, idGrade]
  );
  const [selectedStudents, setSelectedStudents] = useState<StudentGrade[]>([]);
  const {
    registerStudentsInGrade,
    unregisterStudentsInGrade,
    loading: fetchLoading,
  } = useAcademicYear({ showInfo: "modal" });

  const navigate = useNavigate();

  const { searchValue } = useSearch(
    [
      {
        label: "Nombres",
        options: students?.map((student) => student.name) || [],
      },
      {
        label: "Apellidos",
        options: students?.map((student) => student.lastName) || [],
      },
      {
        label: "Carnet",
        options: students?.map((student) => student.idStudent) || [],
      },
    ],
    [students]
  );

  const register = useCallback(async () => {
    if (!idAcademicYear) return navigate("/error-404");

    const { error } = await registerStudentsInGrade(
      +idAcademicYear,
      idGrade,
      selectedStudents.map((x) => x.idStudent)
    );

    if (error) return;

    reload();
    setSelectedStudents([]);
  }, [selectedStudents, idAcademicYear, idGrade]);

  const unregister = useCallback(async () => {
    if (!idAcademicYear) return navigate("/error-404");

    const { error } = await unregisterStudentsInGrade(
      +idAcademicYear,
      idGrade,
      selectedStudents.map((x) => x.idStudent)
    );

    if (error) return;

    reload();
    setSelectedStudents([]);
  }, [selectedStudents, idAcademicYear, idGrade]);


  const columns: TableColumnsType<StudentGrade> = [
    {
      title: "Carnet",
      dataIndex: "idStudent",
      key: "idStudent",
    },
    {
      title: "Nombres",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellido",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Estado",
      dataIndex: "hasGrade",
      key: "hasGrade",
      render: (hasGrade) => (
        <Badge
          status={hasGrade ? "processing" : "default"}
          text={hasGrade ? "Matriculado" : "Disponible"}
        />
      ),
    },
    {
      title: "Acciones",
      dataIndex: "idStudent",
      key: "actions",
      render: (_, { hasGrade }) => (
        <Row justify="space-around">
          <Button type="link" icon={<LinkOutlined />} disabled={hasGrade} />
          <Button
            type="link"
            danger
            icon={<DisconnectOutlined />}
            disabled={!hasGrade}
          />
        </Row>
      ),
    },
  ];

  const props: TableProps<StudentGrade> = {
    columns,
    dataSource: searchValue
      ? students?.filter(
          (x) =>
            x.name.includes(searchValue) ||
            x.lastName.includes(searchValue) ||
            x.idStudent.includes(searchValue)
        )
      : students,
    loading,
    rowKey: ({ idStudent }) => `row-${idStudent}`,
    pagination: {
      style: { margin: "10px" },
      hideOnSinglePage: true,
    },
    rowSelection: {
      selectedRowKeys: selectedStudents.map(
        ({ idStudent }) => `row-${idStudent}`
      ),
      onChange: (_selectedRowKeys, selectedRows) =>
        setSelectedStudents(selectedRows),
      checkStrictly: true,
    },
  };

  return (
    <>
      <Row justify="end" gutter={[10, 10]}>
        <Col>
          <Button
            type="primary"
            disabled={
              selectedStudents.every((x) => x.hasGrade) ||
              !selectedStudents.length
            }
            loading={fetchLoading}
            onClick={register}
          >
            Ingresar
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            danger
            disabled={
              !selectedStudents.every((x) => x.hasGrade) ||
              !selectedStudents.length
            }
            loading={fetchLoading}
            onClick={unregister}
          >
            Remover
          </Button>
        </Col>
      </Row>
      <Table {...props} />;
    </>
  );
};
export default GradeStudentTable;
