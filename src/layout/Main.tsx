import { Layout, theme } from "antd";
import CustomHeader from '@/components/Header';
import Sidebar from "@/components/Sidebar";
import { Outlet } from "@tanstack/react-router";
const { Header, Content, Sider } = Layout;

const Main: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return(
        <Layout style={{height: '100vh'}}>
            <Header style={{ display: 'flex', alignItems: 'center', background: colorBgContainer }}>
                <CustomHeader/>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }} >
                    <Sidebar/>
                </Sider>
                <Layout style={{ padding: '24px 24px 24px 24px' }}>
                    <Content
                        style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
export default Main;