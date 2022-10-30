import { FC } from "react";
import { Grade } from "../models";
import { useSearch } from "hooks";
import { ColumnsType } from "models";
import { Badge, Button, Row, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export type gradeTableProps = {
  onPressEdit: (grade: Grade) => any;
  onPressDelete: (idGrade: number) => any;
  grades?: Grade[];
  loading: boolean;
};

const GradeTable: FC<gradeTableProps> = ({
  grades,
  loading,
  onPressEdit,
  onPressDelete,
}) => {
  const { searchValue } = useSearch(
    [
      {
        label: "Grades",
        options: grades?.map((grade) => grade.description) || [],
      },
    ],
    [grades]
  );

  const columns: ColumnsType<Grade> = [
    {
      title: "Id",
      dataIndex: "idGrade",
    },
    {
      title: "Rol",
      dataIndex: "description",
    },
    {
      title: "Estado",
      dataIndex: "active",
      render: (_, { active }) => {
        return (
          <Badge
            status={active ? "success" : "default"}
            text={active ? "Activo" : "Inactivo"}
          />
        );
      },
    },
    {
      dataIndex: "idGrade",
      render: (idGrade, grade) => (
        <Row justify="space-around">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onPressEdit(grade)}
          />
          <Button
            type="link"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => onPressDelete(idGrade)}
            danger
            disabled={!grade.active}
          />
        </Row>
      ),
    },
  ];

  const props: TableProps<Grade> = {
    columns,
    dataSource: searchValue
      ? grades?.filter((x) => x.description.includes(searchValue))
      : grades,
    loading,
    rowKey: ({ idGrade }) => `row-${idGrade}`,
    pagination: {
      style: { margin: "10px" },
      hideOnSinglePage: true,
    },
  };

  return <Table {...props} />;
};

export default GradeTable;
