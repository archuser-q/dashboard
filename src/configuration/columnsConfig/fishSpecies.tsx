import { ActionButton } from "@/components/Button";
import type { TableProps } from "antd";

export interface DataType{
    key: number;
    vietnameseName: string;
    englishName: string;
    fishingGrounds: string;
}

export const columns: TableProps<DataType>['columns'] = [
    {title:'Số',dataIndex:'key',key:'key'},
    {title:'Tên tiếng việt',dataIndex:'vietnameseName',key:'vietnameseName'},
    {title:'Tên tiếng anh',dataIndex:'englishName',key:'englishName'},
    {title:'Ngư trường',dataIndex:'fishingGrounds',key:'fishingGrounds'},
    {title:'Hành động',dataIndex:'action',key:'action',
      render: (_, record) => <ActionButton record={record} />
    }
]