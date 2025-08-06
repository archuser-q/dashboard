import { PlusOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router'
import { Button, Flex, Input, Table } from 'antd';
import { useState } from 'react';
import CustomDrawer from '@/components/Drawer'; 
import type { DataType } from '@/types/regCert/cert/local';
import { sampleData } from '@/mockupdata/regCert/cert/local';
import { columns } from '@/config/columnsConfig/regCert/cert/local';
import { fieldsConfig } from '@/config/fieldsConfig/regCert/cert/local';

export const Route = createFileRoute('/regCert/cert/local')({
  component: RouteComponent,
})

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
        scroll={{ x: 'max-content' }}
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
  );
}
