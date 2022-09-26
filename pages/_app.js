import Layout from "../components/layouts/appLayout";
import "../css/styles.css";
import APIContext from "../context/apiContext";
import { useContext, useEffect, useState } from "react";
import { Spin, message } from "antd";
import Router, { useRouter } from "next/router";
import { Loading3QuartersOutlined } from "@ant-design/icons";
const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const backendAPI = useContext(APIContext);
  const pageLoadeStart = () => {
    setLoading(true);
  };
  const pageLoadEnd = () => {
    setLoading(false);
  };
  useEffect(() => {
    Router.events.on("routeChangeStart", pageLoadeStart);
    Router.events.on("routeChangeComplete", pageLoadEnd);
    Router.events.on("routeChangeError", pageLoadEnd);
    return () => {
      Router.events.off("routeChangeStart", pageLoadeStart);
      Router.events.off("routeChangeComplete", pageLoadEnd);
      Router.events.off("routeChangeError", pageLoadEnd);
    };
  });
  const callBackendAPI = async (args) => {
    try {
      setLoading(true);
      const result = await backendAPI(args);
      setLoading(false);
      if (result.status && result.message) {
        message.success(result.message);
      } else if (!result.status && result.message === "Unauthorized") {
        message.error(result.message);
        router.push("/login");
      }
      return result;
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error(error.message);
      return { status: false, message: "Internal server error" };
    }
  };
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return (
    <Spin
      size="large"
      spinning={loading}
      indicator={<Loading3QuartersOutlined className="spinner" spin />}
    >
      {getLayout(<Component {...pageProps} callBackendAPI={callBackendAPI} />)}
    </Spin>
  );
};

export default App;
