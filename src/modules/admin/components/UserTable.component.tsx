import { ColumnsType, User } from "models";
import { Table, TableProps } from "antd";
import useUser from "../hooks/useUser.";

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

  const props: TableProps<User> = {
    columns,
    dataSource: users,
    loading
  };

  return <Table {...props} />;
};

export default UserTable;
