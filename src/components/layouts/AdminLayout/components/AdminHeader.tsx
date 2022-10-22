import { Avatar, Layout, Menu, Popover, Typography } from "antd";
import { useReduxAuth } from "hooks";
import AdminNewButton from "./AdminNewButton";
import AdminSearch from "./AdminSearch";

const { Header } = Layout;

const { Text } = Typography;

const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

const AdminHeader = () => {
  const {
    user: { username, firstName, lastName },
  } = useReduxAuth();

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: "0 10px 0 10px",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        gap: "5rem",
      }}
    >
      <div>
        <AdminNewButton />
      </div>
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AdminSearch />
      </div>
      <div style={{ alignItems: "center", gap: "0.5rem", display: "flex" }}>
        <Text>
          Bienvenido a Akdmik,{" "}
          {firstName || lastName ? `${firstName} ${lastName}` : username}
        </Text>
        <Popover
          content={
            <Menu
              style={{ width: 256 }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="vertical"
              theme="light"
              items={[]}
            />
          }
          trigger="click"
          placement="topRight"
        >
          <Avatar
            style={{
              backgroundColor: ColorList[3],
              verticalAlign: "middle",
            }}
            size="large"
          >
            {username.charAt(1).toUpperCase()}
          </Avatar>
        </Popover>
      </div>
    </Header>
  );
};

export default AdminHeader;
