import Link from "next/link";
import { Menu } from 'antd';
const SidebarMenu = () => {
  return (
    <Menu defaultSelectedKeys={["1"]} mode="inline">
      <Menu.Item key="1">
        <Link href="/tasks">Tasks</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link href="/projects">Project</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link href="/login">Login</Link>
      </Menu.Item>
    </Menu>
  );
};
export default SidebarMenu;
