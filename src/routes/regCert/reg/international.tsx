import { PlusOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router'
import { Button, Flex, Input, Table } from 'antd';
import { useState } from 'react';
import CustomDrawer from '@/components/Drawer';
import { columns } from '@/config/columnsConfig/regCert/reg/international';
import { fieldsConfig } from '@/config/fieldsConfig/regCert/reg/international';
import type { DataType } from '@/types/regCert/reg/international';
import { sampleData } from '@/mockupdata/regCert/reg/internationale';

export const Route = createFileRoute('/regCert/reg/international')({
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
        scroll={{ x: 'max-content' }}
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