import { FC } from "react";
import { Student } from "../models";
import { useSearch } from "hooks";
import { ColumnsType } from "models";
import { Badge, Button, Row, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export type studentTableProps = {
  onPressEdit: (student: Student) => any;
  onPressDelete: (idStudent: number) => any;
  students?: Student[];
  loading: boolean;
};

const StudentTable: FC<studentTableProps> = ({
  students,
  loading,
  onPressEdit,
  onPressDelete,
}) => {
  const { searchValue } = useSearch(
    [
      {
        label: "Nombres",
        options: students?.map((student) => student.name) || [],
      },
    ],
    [students]
  );

  const columns: ColumnsType<Student> = [
    {
      title: "Id",
      dataIndex: "idStudent",
    },
    {
      title: "Área",
      dataIndex: "description",
    },
    {
      title: "Estado",
      width: 100,
      dataIndex: "active",
      render: (_, { status }) => {
        return (
          <Badge
            status={status == "A" ? "success" : "default"}
            text={status == "A" ? "Activo" : "Inactivo o Egresado"}
          />
        );
      },
    },
    {
      dataIndex: "idStudent",
      width: 100,
      render: (idStudent, student) => (
        <Row justify="space-around">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onPressEdit(student)}
          />
          <Button
            type="link"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => onPressDelete(idStudent)}
            danger
            disabled={student.status === "I"}
          />
        </Row>
      ),
    },
  ];

  const props: TableProps<Student> = {
    columns,
    dataSource: searchValue
      ? students?.filter((x) => x.name.includes(searchValue))
      : students,
    loading,
    rowKey: ({ idStudent }) => `row-${idStudent}`,
    pagination: {
      style: { margin: "10px" },
      hideOnSinglePage: true,
    },
  };

  return <Table {...props} />;
};

export default StudentTable;
