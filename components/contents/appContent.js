import { Layout } from 'antd';
const { Content } = Layout;
const AppContent = ({children}) => {
    return (
        <Content className="app-content">
          {children}
        </Content>
    )
}

export default AppContent;