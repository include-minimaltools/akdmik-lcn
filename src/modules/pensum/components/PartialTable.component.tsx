import { FC } from "react";
import { Partial } from "../models";
import { useSearch } from "hooks";
import { ColumnsType } from "models";
import { Badge, Button, Row, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export type partialTableProps = {
  onPressEdit: (partial: Partial) => any;
  onPressDelete: (idPartial: number) => any;
  partials?: Partial[];
  loading: boolean;
};

const PartialTable: FC<partialTableProps> = ({
  partials,
  loading,
  onPressEdit,
  onPressDelete,
}) => {
  const { searchValue } = useSearch(
    [
      {
        label: "Partials",
        options: partials?.map((partial) => partial.name) || [],
      },
    ],
    [partials]
  );

  const columns: ColumnsType<Partial> = [
    {
      title: "Id",
      dataIndex: "idPartial",
    },
    {
      title: "Nombre del Parcial",
      dataIndex: "name",
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
      dataIndex: "idPartial",
      render: (idPartial, partial) => (
        <Row justify="space-around">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onPressEdit(partial)}
          />
          <Button
            type="link"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => onPressDelete(idPartial)}
            danger
            disabled={!partial.active}
          />
        </Row>
      ),
    },
  ];

  const props: TableProps<Partial> = {
    columns,
    dataSource: searchValue
      ? partials?.filter((x) => x.name.includes(searchValue))
      : partials,
    loading,
    rowKey: ({ idPartial }) => `row-${idPartial}`,
    pagination: {
      style: { margin: "10px" },
      hideOnSinglePage: true,
    },
  };

  return <Table {...props} />;
};

export default PartialTable;
