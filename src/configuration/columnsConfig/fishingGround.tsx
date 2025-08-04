import type { TableProps } from "antd";

export interface DataType{
  key: number;
  name: string;
  range: string;
}

export const columns: TableProps<DataType>['columns'] = [
    {title:'Số', dataIndex: 'key', key:'key'},
    {title:'Tên ngư trường',dataIndex:'name',key:'name'},
    {title:'Phạm vi',dataIndex:'range',key:'range'}
]