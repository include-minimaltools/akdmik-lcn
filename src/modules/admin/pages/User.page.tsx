import { UserModal, UserTable } from "../components";
import { FC, useCallback, useState } from "react";
import { UserStyle } from "../styles/User.style";
import { Button, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { User } from "models";
import { getUsers } from "modules/admin/services";
import { useService } from "hooks";
import { useUser } from "modules/admin/hooks";

const UserPage: FC = () => {
  const { remove, loading: eventLoading } = useUser();
  const [users, loading, reload] = useService(getUsers);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [user, setUser] = useState<User>();

  const onCloseModal = useCallback((refresh: boolean) => {
    setUser(undefined);
    setIsOpenModal(false);
    refresh && reload();
  }, []);

  return (
    <UserStyle>
      <UserModal user={user} onClose={onCloseModal} open={isOpenModal} />
      <Row justify="end">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          shape="round"
          onClick={() => setIsOpenModal(true)}
          style={{ margin: "1rem" }}
        >
          Crear nuevo
        </Button>
      </Row>
      <UserTable
        users={users}
        onPressEdit={(user) => {
          setUser(user);
          setIsOpenModal(true);
        }}
        onPressDelete={async (username) => {
          const { error } = await remove(username);
          error || reload();
        }}
        loading={loading || eventLoading}
      />
    </UserStyle>
  );
};

export default UserPage;
