import React from "react";
import { Layout } from "antd";
import Sidebar from "../sidebar";
import AppHeader from "../header";
import AppContent from "../contents/appContent";
import SidebarMenu from "../sidebarMenu";

const AppLayout = ({ children }) => {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <Sidebar width={100}>
          <SidebarMenu />
        </Sidebar>
        <Layout>
          <AppContent>{children}</AppContent>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
