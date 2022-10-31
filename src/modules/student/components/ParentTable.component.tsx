import { FC } from "react";
import { Parent } from "../models";
import { useSearch } from "hooks";
import { ColumnsType } from "models";
import { Badge, Button, Row, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export type parentTableProps = {
  onPressEdit: (parent: Parent) => any;
  onPressDelete: (idParent: number) => any;
  parents?: Parent[];
  loading: boolean;
};

const ParentTable: FC<parentTableProps> = ({
  parents,
  loading,
  onPressEdit,
  onPressDelete,
}) => {
  const { searchValue } = useSearch(
    [
      {
        label: "Nombres",
        options: parents?.map((parent) => parent.name) || [],
      },
    ],
    [parents]
  );

  const columns: ColumnsType<Parent> = [
    {
      title: "Id",
      dataIndex: "idParent",
    },
    {
      title: "Nombre de Familiar",
      dataIndex: "name",
    },
    {
      title: "Parentesco",
      dataIndex: "relationshipDescription",
    },
    {
      title: "Otros Datos",
      children: [
        {
          title: "Correo",
          dataIndex: "email",
        },
        {
          title: "Cédula",
          dataIndex: "identityDocument",
        },
        {
          title: "Celular",
          dataIndex: "phoneNumber",
        },
      ],
    },
    {
      title: "Estado",
      width: 100,
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
      dataIndex: "idParent",
      width: 100,
      render: (idParent, parent) => (
        <Row justify="space-around">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onPressEdit(parent)}
          />
          <Button
            type="link"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => onPressDelete(idParent)}
            danger
            disabled={!parent.active}
          />
        </Row>
      ),
    },
  ];

  const props: TableProps<Parent> = {
    columns,
    dataSource: searchValue
      ? parents?.filter((x) => x.name.includes(searchValue))
      : parents,
    loading,
    rowKey: ({ idParent }) => `row-${idParent}`,
    pagination: {
      style: { margin: "10px" },
      hideOnSinglePage: true,
    },
  };

  return <Table {...props} />;
};

export default ParentTable;
