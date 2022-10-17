import * as AntdIcons from "@ant-design/icons";
import { Layout, Menu, MenuProps, Typography } from "antd";
import { SplashScreen } from "pages";
import { FC, Fragment, Suspense, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LogoStyle, TitleSectionStyle } from "./AdminLayout.style";

const { Header, Content, Footer, Sider } = Layout;

const { Text, Title } = Typography;

type ItemType = Required<MenuProps>["items"][number];

type MenuType = {
  label: string;
  key: string;
  icon?: string;
  children?: MenuType[];
  type?: "group" | "divider";
};

const menuExample: MenuType[] = [
  {
    label: "Dashboard",
    key: "/",
    icon: "PieChartOutlined",
  },
  {
    key: "administrator",
    label: "Administración",
    icon: "SlidersOutlined",
    type: "divider",
    children: [
      {
        label: "Usuarios",
        key: "/admin/user",
        icon: "UserOutlined",
      },
      {
        label: "Roles",
        key: "/admin/role",
        icon: "FlagOutlined",
      },
    ],
  },
  {
    key: "examples",
    label: "Extras",
    icon: "AuditOutlined",
    type: "divider",
    children: [
      {
        label: "Item 1",
        key: "g1",
        type: "group",
        children: [
          {
            label: "Option 1",
            key: "o1",
          },
          {
            label: "Option 2",
            key: "o2",
          },
        ],
      },
      {
        label: "Item 2",
        key: "g2",
        type: "group",
        children: [
          {
            label: "Option 3",
            key: "o3",
          },
          {
            label: "Option 4",
            key: "o4",
          },
        ],
      },
    ],
  },
];

const createItem = ({
  type,
  key,
  label,
  children,
  icon,
}: MenuType): ItemType => {
  //@ts-ignore
  const Icon = AntdIcons[icon];

  return {
    key,
    label,
    children: children?.map(createItem),
    type,
    icon: Icon && <Icon />,
  } as ItemType;
};

const items = menuExample.map(createItem);

const AdminLayout: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Layout hasSider style={{ minHeight: "100%" }}>
      <Sider
        collapsible
        breakpoint="sm"
        onCollapse={(broken) => setIsCollapsed(broken)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        theme="light"
      >
        <LogoStyle url="/assets/icon-lcn.png" />
        <TitleSectionStyle visible={!isCollapsed}>
          <Title level={3}>Liceo Cultural Nicaragüense</Title>
          <Text type="secondary">Akdmik</Text>
        </TitleSectionStyle>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={items}
          onSelect={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: isCollapsed ? 80 : 200,
        }}
      >
        <Header
          className="site-layout-background"
          style={{ padding: 0, background: "white" }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            backgroundColor: "white",
            borderRadius: "1rem",
          }}
        >
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          AKDMIK ©2022 Created by HSC Minimal Tools
        </Footer>
      </Layout>
    </Layout>
  );
};

export const AdminLayoutStyle = styled.div``;

export default AdminLayout;
