import { createFileRoute } from '@tanstack/react-router'
import { Table, type TableColumnsType, Button } from 'antd';
import { useState } from 'react';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';

import { useModalStore } from '@/store/useModalStore';
import { ColumnSelectionModal } from '@/components/Modal/SelectionModal';
import { AddEditModal } from '@/components/Modal/AddEditModal';
import { DetailModal } from '@/components/Modal/DetailModal';
import type { DataType } from '@/types/registrationAndCertificate/harbour';
import { initialData } from '@/mockupData/registrationAndCertificate/harbour';
import { allColumns } from '@/config/columnsConfig/registrationAndCertificate/harbour';

export const Route = createFileRoute('/registrationAndCertificate/harbour')({
  component: RouteComponent,
})

function RouteComponent() {
  const [data, setData] = useState<DataType[]>(initialData);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(
    allColumns.reduce((acc, col) => ({ ...acc, [col.key]: col.visible }), {})
  );

  const { 
    showColumnModal, 
    showAddModal, 
    showDetailModal,
    selectedRecord 
  } = useModalStore();

  const handleColumnVisibilityChange = (columnKey: string, visible: boolean) => {
    setColumnVisibility(prev => ({
      ...prev,
      [columnKey]: visible
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    const newVisibility = allColumns.reduce((acc, col) => ({
      ...acc,
      [col.key]: checked
    }), {});
    setColumnVisibility(newVisibility);
  };

  const handleSave = (values: Omit<DataType, 'key'>, isEdit: boolean) => {
    if (isEdit && selectedRecord) {
      // Edit existing record
      const updatedData = data.map(item => 
        item.key === selectedRecord.key 
          ? { ...item, ...values }
          : item
      );
      setData(updatedData);
    } else {
      // Add new record
      const newEntry: DataType = {
        key: data.length > 0 ? Math.max(...data.map(item => item.key)) + 1 : 1,
        ...values
      };
      setData([...data, newEntry]);
    }
  };

  const handleDelete = (record: DataType) => {
    const filteredData = data.filter(item => item.key !== record.key);
    setData(filteredData);
  };

  const handleRowClick = (record: DataType) => {
    showDetailModal(record);
  };

  const visibleColumns: TableColumnsType<DataType> = allColumns
    .filter(col => columnVisibility[col.key])
    .map(col => ({
      title: col.title,
      dataIndex: col.dataIndex,
      key: col.key
    }));

  const visibleColumnCount = Object.values(columnVisibility).filter(Boolean).length;

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={showAddModal}
        >
          Thêm mới
        </Button>
        <Button 
          icon={<SettingOutlined />} 
          onClick={showColumnModal}
        >
          Tùy chọn cột ({visibleColumnCount}/{allColumns.length})
        </Button>
      </div>

      <ColumnSelectionModal
        allColumns={allColumns}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        onSelectAll={handleSelectAll}
      />

      <AddEditModal onSave={handleSave} />

      <DetailModal onDelete={handleDelete} />
      
      <Table<DataType> 
        columns={visibleColumns} 
        dataSource={data}
        scroll={{ x: 'max-content' }}
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: 'pointer' }
        })}
      />
    </div>
  );
}