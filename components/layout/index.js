import React from "react";
import { Layout } from "antd";
import Sidebar from "../sidebar";
import AppHeader from "../header";
import AppContent from "../content";

const AppLayout = ({ children }) => {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <Sidebar />
        <Layout>
          <AppContent>{children}</AppContent>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
