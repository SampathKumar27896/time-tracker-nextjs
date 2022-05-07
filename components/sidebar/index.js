import { Layout, Menu } from "antd";
const { Sider } = Layout;
import Link from "next/link";
const Sidebar = () => {
  return (
    <Sider width={200}>
      <Menu defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1">
          <Link href="/tasks">Tasks</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/projects">Project</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
