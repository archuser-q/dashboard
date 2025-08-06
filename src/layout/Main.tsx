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
        <Layout style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header style={{ display: 'flex', alignItems: 'center', background: colorBgContainer }}>
                <CustomHeader />
            </Header>

            <Layout style={{ flex: 1, display: 'flex' }}>
                <Sider width={200} style={{ background: colorBgContainer }} collapsible collapsedWidth={0}>
                    <Sidebar />
                </Sider>

                <Layout style={{ flex: 1, padding: 24 }}>
                    <Content
                        style={{
                        flex: 1,
                        padding: 24,
                        margin: 0,
                        overflow: 'auto',
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