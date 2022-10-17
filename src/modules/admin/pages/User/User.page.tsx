import { UserTable } from "../../components";
import { FC } from "react";
import { UserStyle } from "./User.style";

const UserPage: FC = () => {
  return (
    <UserStyle>
      <UserTable />
    </UserStyle>
  );
};

export default UserPage;
