import { Layout } from "antd";
import { SplashScreen } from "pages";
import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AdminHeader, AdminSider } from "./components";

const { Content, Footer } = Layout;

const AdminLayout: FC = () => {
  return (
    <Layout hasSider style={{ minHeight: "100%" }}>
      <AdminSider />
      <Layout
        className="site-layout"
        style={
          {
            // marginLeft: isCollapsed ? 80 : 200,
          }
        }
      >
        <AdminHeader />
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

export default AdminLayout;
