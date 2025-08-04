import { AppstoreOutlined, CompassOutlined, ContactsOutlined, DockerOutlined, HomeOutlined, KubernetesOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, type MenuProps } from "antd"

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {key:1, label: 'Tổng quan', icon:<HomeOutlined/>},
    {key:2, label:'Tàu cá', icon:<DockerOutlined/>, children:[
        {key:'2-1',label:'Trong nước'},
        {key:'2-2',label:'Ngoài nước'}
    ]},
    {key:3, label: 'Cảng cá', icon:<KubernetesOutlined />},
    {key:4, label:'Danh sách thuyền viên', icon:<ContactsOutlined />},
    {key:5, label:'Tài khoản', icon:<UserOutlined />, children:[
        {key:'5-1',label:'Trong nước'},
        {key:'5-2',label:'Ngoài nước'}
    ]},
    {key:6, label:'Danh mục', icon:<AppstoreOutlined/>, children:[
        {key:'6-1',label:'Ngành nghề'},
        {key:'6-2',label:'Loài cá'},
        {key:'6-3',label:'Ngư trường'}
    ]},
    {key:'7',label:'Hoạt động',icon:<CompassOutlined />,children:[
        {key:'7-1',label:'Xuất bến'},
        {key:'7-2',label:'Cập bến'},
        {key:'7-3',label:'Vị trí'}
    ]},
    {key:'8',label:'Đăng xuất', icon: <LogoutOutlined/>}
]

const Sidebar: React.FC = () => {
    return(
        <Menu
        mode="inline"
        items={items}/>
    );
}

export default Sidebar;