import { ColumnsType, User } from "models";
import { Table, TableProps } from "antd";
import useUser from "../hooks/useUser.";
import { useSearch } from "hooks";

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
    dataIndex: "firtName",
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
    render: (status) => <>{status}</>,
  },
];

const UserTable = () => {
  const { users, loading } = useUser();
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
        options: users?.map((user) => user.roleDescription) || [],
      },
    ],
    [users]
  );

  const props: TableProps<User> = {
    columns,
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
  };

  return <Table {...props} />;
};

export default UserTable;
