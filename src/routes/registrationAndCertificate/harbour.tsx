// harbour.tsx (Refactored Main Component)
import { createFileRoute } from '@tanstack/react-router'
import { Table, type TableColumnsType, Button } from 'antd';
import { useState } from 'react';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';

import { useModalStore } from '@/store/useModalStore';
import { ColumnSelectionModal } from '@/components/Modal/SelectionModal';
import { AddEditModal } from '@/components/Modal/AddEditModal';
import { DetailModal } from '@/components/Modal/DetailModal';
import type { DataType, ColumnConfig } from '@/types/registrationAndCertificate/harbour';

export const Route = createFileRoute('/registrationAndCertificate/harbour')({
  component: RouteComponent,
})

const allColumns: ColumnConfig[] = [
  { key: 'key', title: 'Số', dataIndex: 'key', visible: true },
  { key: 'name', title: 'Tên cảng', dataIndex: 'name', visible: true },
  { key: 'address', title: 'Địa chỉ', dataIndex: 'address', visible: true },
  { key: 'gpsCoordinate', title: 'Tọa độ GPS', dataIndex: 'gpsCoordinate', visible: true },
  { key: 'businessModel', title: 'Loại hình', dataIndex: 'businessModel', visible: true },
  { key: 'nationalID', title: 'CCCD/Mã số DN', dataIndex: 'nationalID', visible: true },
  { key: 'power', title: 'Công suất khai thác', dataIndex: 'power', visible: true },
  { key: 'referenceCode', title: 'Mã chỉ định', dataIndex: 'referenceCode', visible: true },
  { key: 'ownerName', title: 'Họ tên chủ/giám đốc cảng', dataIndex: 'ownerName', visible: true },
  { key: 'ownerPhone', title: 'Điện thoại chủ/giám đốc cảng', dataIndex: 'ownerPhone', visible: true }
];

const initialData: DataType[] = [
  {
    key: 1,
    name: 'Cảng Hải An',
    address: 'Số 12, Đường Nguyễn Văn Linh, Hải Phòng',
    gpsCoordinate: '20.8449, 106.6881',
    businessModel: 'Tư nhân',
    nationalID: '0102030405',
    power: '5000 tấn/năm',
    referenceCode: 'HA001',
    ownerName: 'Nguyễn Văn A',
    ownerPhone: '0901234567'
  },
  {
    key: 2,
    name: 'Cảng Sài Gòn',
    address: 'Bến Nhà Rồng, Quận 4, TP. Hồ Chí Minh',
    gpsCoordinate: '10.7631, 106.7042',
    businessModel: 'Cổ phần',
    nationalID: '0203040506',
    power: '12000 tấn/năm',
    referenceCode: 'SG002',
    ownerName: 'Trần Thị B',
    ownerPhone: '0912345678'
  },
  {
    key: 3,
    name: 'Cảng Đà Nẵng',
    address: 'Số 1, Đường Bạch Đằng, Đà Nẵng',
    gpsCoordinate: '16.0678, 108.2208',
    businessModel: 'Nhà nước',
    nationalID: '0304050607',
    power: '8000 tấn/năm',
    referenceCode: 'DN003',
    ownerName: 'Lê Văn C',
    ownerPhone: '0923456789'
  }
];

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

      {/* Column Selection Modal */}
      <ColumnSelectionModal
        allColumns={allColumns}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        onSelectAll={handleSelectAll}
      />

      {/* Add/Edit Modal */}
      <AddEditModal onSave={handleSave} />

      {/* Detail Modal */}
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