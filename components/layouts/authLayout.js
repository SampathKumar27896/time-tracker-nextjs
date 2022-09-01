import React from "react";
import { Layout } from "antd";
import Sidebar from "../sidebar";
import AuthContent from "../contents/authContent";

const AuthLayout = ({ children }) => {
  return (
    <Layout>
      <Layout>
        <Sidebar width={200}>
        </Sidebar>
        <Layout>
          <AuthContent>{children}</AuthContent>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AuthLayout;
