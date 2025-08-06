import '@ant-design/v5-patch-for-react-19';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router'
import { Button, Flex, Input, Table } from 'antd';
import CustomDrawer from '@/components/Drawer'; 

export const Route = createFileRoute('/regCert/reg/local')({
  component: RouteComponent,
})

interface License {
  licenseNumber: string;
  fishType: string[];
  fishingGrounds: string;
  seasons: string;
  output: string;
}

interface DataType {
  key: string;
  boatSymbol: string;
  boatType: string;
  regisDate: string;
  regisNumber: string;
  regisOffice: string;
  occupation: string;
  inspectDate: string;
  inspectPlace: string;
  ownerInfo: string;
  ownerNID: string;
  ownerPhone: string;
  license: License[];
}

const sampleData: DataType[] = [
  {
    key: '1',
    boatSymbol: 'VN-001',
    boatType: 'Fishing Vessel',
    regisDate: '12/05/2023',
    regisNumber: 'RC-12345',
    regisOffice: 'Hanoi Maritime',
    inspectDate: '12/7/2024',
    inspectPlace: 'ABC',
    occupation: 'Fishing',
    ownerInfo: 'Nguyen Van A',
    ownerNID: '0123456789',
    ownerPhone: '0901234567',
    license: [
      {
        licenseNumber: 'LIC-001',
        fishType: ['Tuna', 'Mackerel'],
        fishingGrounds: 'South Sea',
        seasons: 'Summer',
        output: '500kg',
      },
    ],
  },
];

const fieldsConfig = [
  { name: 'boatSymbol', label: 'Boat Symbol', rules: [{ required: true, message: 'Please input boat symbol!' }] },
  { name: 'boatType', label: 'Boat Type', rules: [{ required: true, message: 'Please input boat type!' }] },
  { name: 'regisDate', label: 'Registration Date', type: 'date', rules: [{ required: true, message: 'Please select registration date!' }] },
  { name: 'regisNumber', label: 'Registration Number', rules: [{ required: true, message: 'Please input registration number!' }] },
  { name: 'regisOffice', label: 'Registration Office', rules: [{ required: true, message: 'Please input registration office!' }] },
  { name: 'inspectDate', label: 'Inspection Date', type: 'date', rules: [{ required: true, message: 'Please select inspection date!' }] },
  { name: 'inspectPlace', label: 'Inspection Place', rules: [{ required: true, message: 'Please input inspection place!' }] },
  { 
    name: 'occupation', 
    label: 'Occupation', 
    type: 'select',
    options: [
      { value: 'Fishing', label: 'Fishing' },
      { value: 'Transport', label: 'Transport' },
      { value: 'Tourism', label: 'Tourism' }
    ]
  },
  { name: 'ownerInfo', label: 'Owner Info', rules: [{ required: true, message: 'Please input owner info!' }] },
  { name: 'ownerNID', label: 'Owner NID', rules: [{ required: true, message: 'Please input owner NID!' }] },
  { name: 'ownerPhone', label: 'Owner Phone', rules: [{ required: true, message: 'Please input owner phone!' }] },
];

const columns = [
  {
    title: 'Boat Symbol',
    dataIndex: 'boatSymbol',
    key: 'boatSymbol',
  },
  {
    title: 'Boat Type',
    dataIndex: 'boatType',
    key: 'boatType',
  },
  {
    title: 'Registration Date',
    dataIndex: 'regisDate',
    key: 'regisDate',
  },
  {
    title: 'Registration Number',
    dataIndex: 'regisNumber',
    key: 'regisNumber',
  },
  {
    title: 'Registration Office',
    dataIndex: 'regisOffice',
    key: 'regisOffice',
  },
  {
    title: 'Occupation',
    dataIndex: 'occupation',
    key: 'occupation',
  },
  {
    title: 'Owner Info',
    dataIndex: 'ownerInfo',
    key: 'ownerInfo',
  },
  {
    title: 'Owner NID',
    dataIndex: 'ownerNID',
    key: 'ownerNID',
  },
  {
    title: 'Inspection Date',
    dataIndex: 'inspectDate',
    key: 'inspectDate',
  },
  {
    title: 'Inspection Place',
    dataIndex: 'inspectPlace',
    key: 'inspectPlace',
  },
  {
    title: 'Owner Phone',
    dataIndex: 'ownerPhone',
    key: 'ownerPhone',
  },
  {
    title: 'Licenses',
    key: 'license',
    render: (_: any, record: DataType) => (
      <div>
        {record.license.map((lic, index) => (
          <div key={index}>
            <div>License Number: {lic.licenseNumber}</div>
            <div>Fish Types: {lic.fishType.join(', ')}</div>
            <div>Fishing Grounds: {lic.fishingGrounds}</div>
            <div>Seasons: {lic.seasons}</div>
            <div>Output: {lic.output}</div>
          </div>
        ))}
      </div>
    ),
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
        pagination={false}
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