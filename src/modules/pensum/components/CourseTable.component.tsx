import { FC } from "react";
import { Course } from "../models";
import { useSearch } from "hooks";
import { ColumnsType } from "models";
import { Badge, Button, Row, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export type courseTableProps = {
  onPressEdit: (course: Course) => any;
  onPressDelete: (idCourse: number) => any;
  courses?: Course[];
  loading: boolean;
};

const CourseTable: FC<courseTableProps> = ({
  courses,
  loading,
  onPressEdit,
  onPressDelete,
}) => {
  const { searchValue } = useSearch(
    [
      {
        label: "Courses",
        options: courses?.map((course) => course.name) || [],
      },
    ],
    [courses]
  );

  const columns: ColumnsType<Course> = [
    {
      title: "Id",
      dataIndex: "idCourse",
    },
    {
      title: "Asignatura",
      dataIndex: "name",
    },
    {
      title: "Área",
      dataIndex: "area",
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
      dataIndex: "idCourse",
      render: (idCourse, course) => (
        <Row justify="space-around">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onPressEdit(course)}
          />
          <Button
            type="link"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => onPressDelete(idCourse)}
            danger
            disabled={!course.active}
          />
        </Row>
      ),
    },
  ];

  const props: TableProps<Course> = {
    columns,
    dataSource: searchValue
      ? courses?.filter((x) => x.name.includes(searchValue))
      : courses,
    loading,
    rowKey: ({ idCourse }) => `row-${idCourse}`,
    pagination: {
      style: { margin: "10px" },
      hideOnSinglePage: true,
    },
  };

  return <Table {...props} />;
};

export default CourseTable;
