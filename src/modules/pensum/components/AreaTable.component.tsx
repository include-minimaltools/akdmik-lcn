import { FC } from "react";
import { Area } from "../models";
import { useSearch } from "hooks";
import { ColumnsType } from "models";
import { Badge, Button, Row, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export type areaTableProps = {
  onPressEdit: (area: Area) => any;
  onPressDelete: (idArea: number) => any;
  areas?: Area[];
  loading: boolean;
};

const AreaTable: FC<areaTableProps> = ({
  areas,
  loading,
  onPressEdit,
  onPressDelete,
}) => {
  const { searchValue } = useSearch(
    [
      {
        label: "Areas",
        options: areas?.map((area) => area.description) || [],
      },
    ],
    [areas]
  );

  const columns: ColumnsType<Area> = [
    {
      title: "Id",
      dataIndex: "idArea",
    },
    {
      title: "Área",
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
      dataIndex: "idArea",
      render: (idArea, area) => (
        <Row justify="space-around">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onPressEdit(area)}
          />
          <Button
            type="link"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => onPressDelete(idArea)}
            danger
            disabled={!area.active}
          />
        </Row>
      ),
    },
  ];

  const props: TableProps<Area> = {
    columns,
    dataSource: searchValue
      ? areas?.filter((x) => x.description.includes(searchValue))
      : areas,
    loading,
    rowKey: ({ idArea }) => `row-${idArea}`,
    pagination: {
      style: { margin: "10px" },
      hideOnSinglePage: true,
    },
  };

  return <Table {...props} />;
};

export default AreaTable;
