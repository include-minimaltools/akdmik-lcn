import { ColumnsType, User } from "models";
import { Badge, Button, Row, Table, TableProps } from "antd";
import { useSearch } from "hooks";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { FC } from "react";

export type userTableProps = {
  onPressEdit: (user: User) => any;
  onPressDelete: (username: string) => any;
  users?: User[];
  loading: boolean;
};

const UserTable: FC<userTableProps> = ({
  users,
  loading,
  onPressEdit,
  onPressDelete,
}) => {
  const { searchValue } = useSearch(
    [
      {
        label: "Nombre de Usuarios",
        options: users?.map((user) => user.username) || [],
      },
      {
        label: "Correos",
        options:
          users?.filter((user) => user.email).map((user) => user.email || "") ||
          [],
      },
      {
        label: "Roles",
        options: [...new Set(users?.map((user) => user.roleDescription) || [])],
      },
    ],
    [users]
  );

  const columns: ColumnsType<User> = [
    {
      title: "Usuario",
      dataIndex: "username",
    },
    {
      title: "Rol",
      dataIndex: "roleDescription",
    },
    {
      title: "Nombre",
      dataIndex: "firstName",
    },
    {
      title: "Apellido",
      dataIndex: "lastName",
    },
    {
      title: "Correo",
      dataIndex: "email",
    },
    {
      title: "Estado",
      dataIndex: "status",
      render: (_, { status }) => {
        return (
          <Badge
            status={status === "A" ? "success" : "default"}
            text={status === "A" ? "Activo" : "Inactivo"}
          />
        );
      },
    },
    {
      dataIndex: "username",
      render: (username, user) => (
        <Row justify="space-around">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onPressEdit(user)}
          />
          <Button
            type="link"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => onPressDelete(username)}
            danger
            disabled={user.status === "I"}
          />
        </Row>
      ),
    },
  ];

  const props: TableProps<User> = {
    columns: columns,
    dataSource: searchValue
      ? users?.filter(
          (x) =>
            x.username.includes(searchValue) ||
            x.email?.includes(searchValue) ||
            x.roleDescription.includes(searchValue)
        )
      : users,
    loading,
    rowKey: ({ username }) => `row-${username}`,
    pagination: {
      style: { margin: "10px" },
      hideOnSinglePage: true,
    },
  };

  return <Table {...props} />;
};

export default UserTable;
