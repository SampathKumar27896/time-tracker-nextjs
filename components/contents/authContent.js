import { Layout } from 'antd';
const { Content } = Layout;
const AppContent = ({children}) => {
    return (
        <Content className="auth-content">
          {children}
        </Content>
    )
}

export default AppContent;