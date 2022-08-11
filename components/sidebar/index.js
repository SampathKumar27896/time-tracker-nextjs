import { Layout } from "antd";
const { Sider } = Layout;

const Sidebar = ({ children, width }) => {
  return <Sider width={width}>{children}</Sider>;
};

export default Sidebar;
