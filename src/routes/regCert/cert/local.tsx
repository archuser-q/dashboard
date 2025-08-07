import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router'
import { Button, Card, Checkbox, Flex, Input, Popover, Table } from 'antd';
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

  // Column visibility state
  const defaultCheckedList = columns.map((item) => item.key || item.dataIndex as string);
  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);

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
  
  // Checkbox options for column visibility
  const options = columns.map(({ key, dataIndex, title }) => ({
    label: title,
    value: key || dataIndex as string,
  }));

  // Filter columns based on checkedList
  const visibleColumns = columns
    .filter(col => checkedList.includes(col.key || col.dataIndex as string))
    .map(col => ({
      ...col,
      onCell: (record: DataType) => ({
        onClick: () => handleRowClick(record),
        style: { cursor: 'pointer' }
      })
    }));

  // Dropdown content
  const dropdownContent = (
    <Card style={{ width: 240 }}>
      <Checkbox.Group
        value={checkedList}
        options={options}
        onChange={(value) => setCheckedList(value as string[])}
      />
    </Card>
  );
  
  return (
    <Flex vertical gap={10}>
      <Flex gap={10} justify="space-between">
        <Input.Search placeholder="Tìm kiếm" variant="filled" />
        <Popover
          placement="bottomRight"
          content={dropdownContent}
          trigger="click"
        >
          <Button icon={<SettingOutlined />} shape="round" />
        </Popover>
        <Button type='primary' onClick={handleAddClick} shape='round'>
          <PlusOutlined />
        </Button>
      </Flex>
      <Table 
        columns={visibleColumns} 
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
