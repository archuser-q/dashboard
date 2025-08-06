// components/ColumnSelectionModal.tsx
import React from 'react';
import { Modal, Checkbox, Space } from 'antd';
import { useModalStore } from '@/store/useModalStore';
import { type ColumnConfig } from '@/types/registrationAndCertificate/harbour';

interface ColumnSelectionModalProps {
  allColumns: ColumnConfig[];
  columnVisibility: Record<string, boolean>;
  onColumnVisibilityChange: (columnKey: string, visible: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

export const ColumnSelectionModal: React.FC<ColumnSelectionModalProps> = ({
  allColumns,
  columnVisibility,
  onColumnVisibilityChange,
  onSelectAll,
}) => {
  const { isColumnModalVisible, hideColumnModal } = useModalStore();

  const allSelected = allColumns.every(col => columnVisibility[col.key]);
  const someSelected = allColumns.some(col => columnVisibility[col.key]);

  return (
    <Modal
      title="Tùy chọn hiển thị cột"
      open={isColumnModalVisible}
      onOk={hideColumnModal}
      onCancel={hideColumnModal}
      width={600}
      okText="Đóng"
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Checkbox
          indeterminate={someSelected && !allSelected}
          checked={allSelected}
          onChange={(e) => onSelectAll(e.target.checked)}
        >
          Chọn tất cả
        </Checkbox>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '12px',
          marginTop: '16px'
        }}>
          {allColumns.map(column => (
            <Checkbox
              key={column.key}
              checked={columnVisibility[column.key]}
              onChange={(e) => onColumnVisibilityChange(column.key, e.target.checked)}
            >
              {column.title}
            </Checkbox>
          ))}
        </div>
      </Space>
    </Modal>
  );
};