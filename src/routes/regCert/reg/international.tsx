import { PlusOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router'
import { Button, Flex, Input, Table } from 'antd';
import { useState } from 'react';
import CustomDrawer from '@/components/Drawer';

export const Route = createFileRoute('/regCert/reg/international')({
  component: RouteComponent,
})

export interface DataType {
  key: string;
  boatSymbol: string;
  boatType: string;
  regisDate: string;
  regisOffice: string;
  occupation: string[];
  harbourCode: string;
  inspectDate: string;
  inspectPlace: string;
  ownerInfo: string;
  ownerNID: string;
  ownerPhone: string;
  captain: string;
  captainPassport: string;
  captainPhone: string;
  crewList: string[];
  licenseNumber: string;
  fishType: string[];
  fishingGrounds: string;
  seasons: string;
  output: string;
}

const columns = [
  { title: 'Ký hiệu tàu', dataIndex: 'boatSymbol', key: 'boatSymbol' },
  { title: 'Loại tàu', dataIndex: 'boatType', key: 'boatType' },
  { title: 'Ngày đăng ký', dataIndex: 'regisDate', key: 'regisDate' },
  { title: 'Cơ quan cấp đăng ký', dataIndex: 'regisOffice', key: 'regisOffice' },
  {
    title: 'Ngành nghề khai thác',
    dataIndex: 'occupation',
    key: 'occupation',
    render: (occupations: string[]) => occupations.join(', '),
  },
  { title: 'Mã cảng', dataIndex: 'harbourCode', key: 'harbourCode' },
  { title: 'Ngày đăng kiểm', dataIndex: 'inspectDate', key: 'inspectDate' },
  { title: 'Nơi đăng kiểm', dataIndex: 'inspectPlace', key: 'inspectPlace' },
  { title: 'Thông tin chủ tàu', dataIndex: 'ownerInfo', key: 'ownerInfo' },
  { title: 'CCCD chủ tàu', dataIndex: 'ownerNID', key: 'ownerNID' },
  { title: 'SĐT chủ tàu', dataIndex: 'ownerPhone', key: 'ownerPhone' },
  { title: 'Trưởng tàu', dataIndex: 'captain', key: 'captain' },
  { title: 'Số hộ chiếu trưởng tàu', dataIndex: 'captainPassport', key:'captainPassport'},
  { title: 'SĐT thuyền trưởng', dataIndex: 'captainPhone', key: 'captainPhone' },
  {
    title: 'Danh sách thuyền viên',
    dataIndex: 'crewList',
    key: 'crewList',
    render: (crew: string[]) => crew.join(', '),
  },
  {title: 'Giấy phép khai thác',key: 'license',
    render: (_: any, record: DataType) => (
        <div>
            <div>Số giấy phép: {record.licenseNumber}</div>
            <div>
                Loài cá:{' '}
                {Array.isArray(record.fishType)
                ? record.fishType.join(', ')
                : '—'}
            </div>
            <div>Ngư trường: {record.fishingGrounds}</div>
            <div>Mùa vụ: {record.seasons}</div>
            <div>Sản lượng: {record.output}</div>
        </div>
    ),
  },
];

export const fieldsConfig = [
  { name: 'boatSymbol', label: 'Ký hiệu tàu', type: 'text' },
  { name: 'boatType', label: 'Loại tàu', type: 'text' },
  { name: 'regisDate', label: 'Ngày đăng ký', type: 'date' },
  { name: 'regisOffice', label: 'Cơ quan cấp đăng ký', type: 'text' },
  { name: 'occupation', label: 'Ngành nghề khai thác', type: 'multi-select' },
  { name: 'harbourCode', label: 'Mã cảng', type: 'text' },
  { name: 'inspectDate', label: 'Ngày đăng kiểm', type: 'date' },
  { name: 'inspectPlace', label: 'Nơi đăng kiểm', type: 'text' },
  { name: 'ownerInfo', label: 'Thông tin chủ tàu', type: 'textarea' },
  { name: 'ownerNID', label: 'CCCD chủ tàu', type: 'text' },
  { name: 'ownerPhone', label: 'SĐT chủ tàu', type: 'text' },
  { name: 'captain', label: 'Trưởng tàu', type: 'text' },
  { name: 'captainPassport', label: 'Số hộ chiếu trưởng tàu', type: 'text' },
  { name: 'captainPhone', label: 'SĐT thuyền trưởng', type: 'text' },
  { name: 'crewList', label: 'Danh sách thuyền viên', type: 'multi-select' },
  { name: 'licenseNumber', label: 'Số giấy phép', type: 'text' },
  { name: 'fishType', label: 'Loài cá', type: 'multi-select' },
  { name: 'fishingGrounds', label: 'Ngư trường', type: 'text' },
  { name: 'seasons', label: 'Mùa vụ', type: 'text' },
  { name: 'output', label: 'Sản lượng', type: 'text' },
];

export const sampleData: DataType[] = [
  {
    key: '1',
    boatSymbol: 'VN001',
    boatType: 'Tàu cá xa bờ',
    regisDate: '2021-06-15',
    regisOffice: 'Chi cục Thủy sản Hà Tĩnh',
    occupation: ['Khai thác xa bờ', 'Đánh bắt mực'],
    harbourCode: 'HT001',
    inspectDate: '2023-04-10',
    inspectPlace: 'Cảng Cửa Sót',
    ownerInfo: 'Nguyễn Văn A - Thôn Hải Thành, Cẩm Nhượng',
    ownerNID: '123456789012',
    ownerPhone: '0901234567',
    captain: 'Trần Văn B',
    captainPassport: 'PA987654321',
    captainPhone: '0912345678',
    crewList: ['Lê Văn C', 'Phạm Văn D'],
    licenseNumber: 'GP0012023',
    fishType: ['Cá ngừ', 'Cá thu'],
    fishingGrounds: 'Quần đảo Hoàng Sa',
    seasons: 'Mùa hè',
    output: '12 tấn',
  },
  {
    key: '2',
    boatSymbol: 'VN002',
    boatType: 'Tàu khai thác ven bờ',
    regisDate: '2020-09-05',
    regisOffice: 'Chi cục Thủy sản Quảng Ngãi',
    occupation: ['Khai thác ven bờ'],
    harbourCode: 'QN002',
    inspectDate: '2022-10-20',
    inspectPlace: 'Cảng Sa Kỳ',
    ownerInfo: 'Phạm Thị D - Xã Bình Châu, Bình Sơn',
    ownerNID: '987654321098',
    ownerPhone: '0934567890',
    captain: 'Ngô Văn E',
    captainPassport: 'PA123456789',
    captainPhone: '0965432109',
    crewList: ['Bùi Văn F', 'Đỗ Văn G'],
    licenseNumber: 'GP0022022',
    fishType: ['Cá cơm', 'Tôm'],
    fishingGrounds: 'Vịnh Quảng Ngãi',
    seasons: 'Mùa xuân',
    output: '7 tấn',
  },
  {
    key: '3',
    boatSymbol: 'VN003',
    boatType: 'Tàu dịch vụ hậu cần nghề cá',
    regisDate: '2019-12-01',
    regisOffice: 'Chi cục Thủy sản Khánh Hòa',
    occupation: ['Hậu cần nghề cá'],
    harbourCode: 'KH003',
    inspectDate: '2023-02-28',
    inspectPlace: 'Cảng Đá Bạc',
    ownerInfo: 'Lê Văn H - TP Nha Trang',
    ownerNID: '456789012345',
    ownerPhone: '0971122334',
    captain: 'Vũ Văn I',
    captainPassport: 'PA192837465',
    captainPhone: '0987654321',
    crewList: ['Trịnh Văn J', 'Nguyễn Văn K'],
    licenseNumber: 'GP0032023',
    fishType: ['Cá nục', 'Cá cam'],
    fishingGrounds: 'Vịnh Nha Trang',
    seasons: 'Quanh năm',
    output: '20 tấn',
  },
];


function RouteComponent() {
  const [data, setData] = useState<DataType[]>(sampleData);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<DataType | undefined>(undefined);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleRowClick = (record: DataType) => {
    setSelectedRecord(record);
    setIsAdding(false);
    setDrawerVisible(true);
  };

  const handleAddClick = () => {
    setSelectedRecord(undefined);
    setIsAdding(true);
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setSelectedRecord(undefined);
    setIsAdding(false);
  };

  const handleAdd = (values: any) => {
    const newRecord: DataType = {
      ...values,
      key: (data.length + 1).toString(),
      license: [],
    };
    setData([...data, newRecord]);
  };

  const handleUpdate = (updatedRecord: DataType) => {
    setData(data.map(item => item.key === updatedRecord.key ? updatedRecord : item));
  };

  const handleDelete = (key: string) => {
    setData(data.filter(item => item.key !== key));
  };

  const tableColumns = columns.map(col => ({
    ...col,
    onCell: (record: DataType) => ({
      onClick: () => handleRowClick(record),
      style: { cursor: 'pointer' }
    })
  }));

  return (
    <Flex vertical gap={10}>
      <Flex gap={10}>
        <Input.Search placeholder="Tìm kiếm" variant="filled" />
        <Button type='primary' onClick={handleAddClick}>
          <PlusOutlined />
        </Button>
      </Flex>
      <Table 
        columns={tableColumns} 
        dataSource={data} 
        pagination={{
          pageSize: 5,
          defaultCurrent: 1
        }}
      />
      <CustomDrawer
        visible={drawerVisible}
        onClose={handleDrawerClose}
        record={selectedRecord}
        onUpdate={handleUpdate}
        onAdd={handleAdd}
        onDelete={handleDelete}
        fieldsConfig={fieldsConfig}
        isAdding={isAdding}
      />
    </Flex>
  )
}