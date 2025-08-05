import { AppstoreOutlined, AuditOutlined, CompassOutlined, SafetyCertificateOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, type MenuProps } from "antd"
import { useNavigate } from '@tanstack/react-router'
import { keyToPathMap } from '@/configuration/routing/routing'

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {key:'1',label:'Đăng ký & cấp phép', icon: <SafetyCertificateOutlined/>, 
        children:[
            {key:'1-1',label:'Đăng ký',
                children:[
                    {key:'1-1-1',label:'Trong nước'},
                    {key:'1-1-2',label:'Quốc tế'}
                ]
            },
            {key:'1-2',label:'Cấp phép',
                children:[
                    {key:'1-2-1',label:'Trong nước'},
                    {key:'1-2-2',label:'Quốc tế'}
                ]
            },
            {key:'1-3',label:'Cảng'}
        ]
    },
    {key:'2',label:'Thuyền viên', icon:<UserAddOutlined/>},
    {key:'3',label:'Hoạt động',icon:<AppstoreOutlined />,
        children:[
            {key:'3-1',label:'Tàu thuyền'},
            {key:'3-2',label:'Cảng'},
            {key:'3-3',label:'Đánh bắt'},
            {key:'3-4',label:'Bản đồ'}
        ]
    },
    {key:'4',label:'Người sử dụng', icon:<UserOutlined/>},
    {key:'5',label:'Nhật ký GPS',icon:<CompassOutlined />},
    {key:'6',label:'Tài khoản',icon:<AuditOutlined />,
        children:[
            {key:'6-1',label:'Thông tin tài khoản'},
            {key:'6-2',label:'Đổi mật khẩu'}
        ]
    }
]

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const handleClick: MenuProps['onClick'] = ({key})=> {
        const path = keyToPathMap[key];
        if (path){
            navigate({to: path});
        }
    }
    return(
        <Menu
        mode="inline"
        items={items}
        onClick={handleClick}/>
    );
}

export default Sidebar;