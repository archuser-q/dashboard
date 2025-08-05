import { createFileRoute } from '@tanstack/react-router'
import { Table, type TableColumnsType, Checkbox, Space, Modal, Button } from 'antd';
import { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';

export const Route = createFileRoute('/registrationAndCertificate/harbour')({
  component: RouteComponent,
})

export interface DataType {
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

interface ColumnConfig {
  key: string;
  title: string;
  dataIndex: string;
  visible: boolean;
}

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

function RouteComponent() {
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(
    allColumns.reduce((acc, col) => ({ ...acc, [col.key]: col.visible }), {})
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const visibleColumns: TableColumnsType<DataType> = allColumns
    .filter(col => columnVisibility[col.key])
    .map(col => ({
      title: col.title,
      dataIndex: col.dataIndex,
      key: col.key
    }));

  const allSelected = allColumns.every(col => columnVisibility[col.key]);
  const someSelected = allColumns.some(col => columnVisibility[col.key]);
  const visibleColumnCount = Object.values(columnVisibility).filter(Boolean).length;
  const sampleData: DataType[] = [
    {
      key: 1,
      name: 'Cảng Hải An',
      address: 'Số 12, Đường Nguyễn Văn Linh, Hải Phòng',
      gpsCoordinate: '20.8449, 106.6881',
      businessModel: 'Doanh nghiệp tư nhân',
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
      businessModel: 'Công ty cổ phần',
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
      businessModel: 'Doanh nghiệp nhà nước',
      nationalID: '0304050607',
      power: '8000 tấn/năm',
      referenceCode: 'DN003',
      ownerName: 'Lê Văn C',
      ownerPhone: '0923456789'
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button 
          type="primary" 
          icon={<SettingOutlined />} 
          onClick={showModal}
        >
          Tùy chọn cột ({visibleColumnCount}/{allColumns.length})
        </Button>
      </div>
      
      <Modal
        title="Tùy chọn hiển thị cột"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        okText="Đóng"
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Checkbox
            indeterminate={someSelected && !allSelected}
            checked={allSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
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
                onChange={(e) => handleColumnVisibilityChange(column.key, e.target.checked)}
              >
                {column.title}
              </Checkbox>
            ))}
          </div>
        </Space>
      </Modal>
      
      <Table<DataType> 
        columns={visibleColumns} 
        dataSource={sampleData}
        scroll={{ x: 'max-content' }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}