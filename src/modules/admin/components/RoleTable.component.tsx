import { ColumnsType, Role, User } from "models";
import { Badge, Button, Row, Table, TableProps } from "antd";
import { useSearch } from "hooks";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { FC } from "react";

export type roleTableProps = {
  onPressEdit: (role: Role) => any;
  onPressDelete: (idRole: number) => any;
  roles?: Role[];
  loading: boolean;
};

const RoleTable: FC<roleTableProps> = ({
  roles,
  loading,
  onPressEdit,
  onPressDelete,
}) => {
  const { searchValue } = useSearch(
    [
      {
        label: "Roles",
        options: roles?.map((role) => role.description) || [],
      },
    ],
    [roles]
  );

  const columns: ColumnsType<Role> = [
    {
      title: "Id",
      dataIndex: "idRole",
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
      dataIndex: "idRole",
      render: (idRole, role) => (
        <Row justify="space-around">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onPressEdit(role)}
          />
          <Button
            type="link"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => onPressDelete(idRole)}
            danger
            disabled={!role.active}
          />
        </Row>
      ),
    },
  ];

  const props: TableProps<Role> = {
    columns,
    dataSource: searchValue
      ? roles?.filter((x) => x.description.includes(searchValue))
      : roles,
    loading,
    rowKey: ({ idRole }) => `row-${idRole}`,
    pagination: {
      style: { margin: "10px" },
      hideOnSinglePage: true,
    },
  };

  return <Table {...props} />;
};

export default RoleTable;
