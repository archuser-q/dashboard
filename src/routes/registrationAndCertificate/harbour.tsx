import { createFileRoute } from '@tanstack/react-router'
import { Table, type TableColumnsType } from 'antd';

export const Route = createFileRoute('/registrationAndCertificate/harbour')({
  component: RouteComponent,
})

export interface DataType{
  key: number;
  name: string;
  address: string;
  gpsCoordinate: string;
  businessModel: string;
  nationalID: string;
  power: string;
  referenceCode: string;
  ownerName: string;
  ownerPhone: string;
}

const columns: TableColumnsType<DataType>= [
  {title:'Số',dataIndex:'key',key:'key'},
  {title:'Tên cảng',dataIndex:'name',key:'name'},
  {title:'Địa chỉ',dataIndex:'address',key:'address'},
  {title:'Tọa độ GPS',dataIndex:'gpsCoordinate',key:'gpsCoordinate'},
  {title:'Loại hình',dataIndex:'businessModel',key:'businessModel'},
  {title:'CCCD/Mã số DN',dataIndex:'nationalID',key:'nationalID'},
  {title:'Công suất khai thác',dataIndex:'power',key:'power'},
  {title:'Mã chỉ định',dataIndex:'referenceCode',key:'referenceCode'},
  {title:'Họ tên chủ/giám đốc cảng',dataIndex:'ownerName',key:'ownerName'},
  {title:'Điện thoại chủ/giám đốc cảng',dataIndex:'ownerPhone',key:'ownerPhone'}
]

function RouteComponent() {
  return <Table<DataType> columns={columns} />
}
