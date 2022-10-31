import * as AntdIcons from "@ant-design/icons";
import { Layout, Menu, MenuProps, Typography } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoStyle, TitleSectionStyle } from "../AdminLayout.style";

const { Sider } = Layout;
const { Title, Text } = Typography;

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
    key: "pensum",
    label: "Pensum",
    icon: "DeploymentUnitOutlined",
    type: "divider",
    children: [
      {
        label: "Asignaturas",
        key: "/pensum/course",
        icon: "BookOutlined",
      },
      {
        label: "Areas",
        key: "/pensum/area",
        icon: "TagOutlined",
      },
      {
        label: "Grados",
        key: "/pensum/grade",
        icon: "ReconciliationOutlined",
      },
      {
        label: "Parciales",
        key: "/pensum/partial",
        icon: "OrderedListOutlined",
      },
    ],
  },
  {
    key: "student",
    label: "Info Estudiantil",
    icon: "FolderOpenOutlined",
    type: "divider",
    children: [
      {
        label: "Estudiantes",
        key: "/student/information",
        icon: "TeamOutlined",
      },
      {
        label: "Familiar",
        key: "/student/parent",
        icon: "PartitionOutlined",
      },
      {
        label: "Parentescos",
        key: "/student/relationship",
        icon: "LinkOutlined",
      },
    ],
  },
  {
    key: "school-report",
    label: "Registro de Notas",
    icon: "SolutionOutlined",
    type: "divider",
    children: [],
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

const AdminSider = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Sider
      collapsible
      breakpoint="sm"
      onCollapse={(broken) => setIsCollapsed(broken)}
      style={{
        overflow: "auto",
        height: "100vh",
        // position: "fixed",
        // left: 0,
        // top: 0,
        // bottom: 0,
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
  );
};

export default AdminSider;
