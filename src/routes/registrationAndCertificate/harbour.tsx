import { createFileRoute } from '@tanstack/react-router'
import { Table, type TableColumnsType, Checkbox, Space, Modal, Button, Form, Input, message, Descriptions } from 'antd';
import { useState } from 'react';
import { SettingOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';

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
  const [isColumnModalVisible, setIsColumnModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

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

  const showColumnModal = () => {
    setIsColumnModalVisible(true);
  };

  const handleColumnModalOk = () => {
    setIsColumnModalVisible(false);
  };

  const handleColumnModalCancel = () => {
    setIsColumnModalVisible(false);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddModalOk = async () => {
    try {
      const values = await form.validateFields();
      const newEntry: DataType = {
        key: data.length > 0 ? Math.max(...data.map(item => item.key)) + 1 : 1,
        ...values
      };
      setData([...data, newEntry]);
      form.resetFields();
      setIsAddModalVisible(false);
      message.success('Thêm thông tin cảng thành công!');
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleAddModalCancel = () => {
    form.resetFields();
    setIsAddModalVisible(false);
  };

  const handleRowClick = (record: DataType) => {
    setSelectedRecord(record);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
    setSelectedRecord(null);
  };

  const handleEdit = () => {
    if (selectedRecord) {
      editForm.setFieldsValue(selectedRecord);
      setIsDetailModalVisible(false);
      setIsEditModalVisible(true);
    }
  };

  const handleEditModalOk = async () => {
    try {
      const values = await editForm.validateFields();
      const updatedData = data.map(item => 
        item.key === selectedRecord?.key 
          ? { ...item, ...values }
          : item
      );
      setData(updatedData);
      editForm.resetFields();
      setIsEditModalVisible(false);
      setSelectedRecord(null);
      message.success('Cập nhật thông tin cảng thành công!');
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleEditModalCancel = () => {
    editForm.resetFields();
    setIsEditModalVisible(false);
    setSelectedRecord(null);
  };

  const handleDelete = () => {
    if (selectedRecord) {
      Modal.confirm({
        title: 'Xác nhận xóa',
        content: `Bạn có chắc chắn muốn xóa cảng "${selectedRecord.name}" không?`,
        okText: 'Xóa',
        cancelText: 'Hủy',
        okType: 'danger',
        onOk: () => {
          const filteredData = data.filter(item => item.key !== selectedRecord.key);
          setData(filteredData);
          setIsDetailModalVisible(false);
          setSelectedRecord(null);
          message.success('Xóa thông tin cảng thành công!');
        }
      });
    }
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
      <Modal
        title="Tùy chọn hiển thị cột"
        open={isColumnModalVisible}
        onOk={handleColumnModalOk}
        onCancel={handleColumnModalCancel}
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

      {/* Add New Harbor Modal */}
      <Modal
        title="Thêm thông tin cảng mới"
        open={isAddModalVisible}
        onOk={handleAddModalOk}
        onCancel={handleAddModalCancel}
        width={800}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          name="addHarborForm"
        >
          <Form.Item
            name="name"
            label="Tên cảng"
            rules={[{ required: true, message: 'Vui lòng nhập tên cảng!' }]}
          >
            <Input placeholder="Nhập tên cảng" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item
            name="gpsCoordinate"
            label="Tọa độ GPS"
            rules={[{ required: true, message: 'Vui lòng nhập tọa độ GPS!' }]}
          >
            <Input placeholder="Ví dụ: 20.8449, 106.6881" />
          </Form.Item>

          <Form.Item
            name="businessModel"
            label="Loại hình"
            rules={[{ required: true, message: 'Vui lòng nhập loại hình!' }]}
          >
            <Input placeholder="Nhập loại hình kinh doanh" />
          </Form.Item>

          <Form.Item
            name="nationalID"
            label="CCCD/Mã số DN"
            rules={[{ required: true, message: 'Vui lòng nhập CCCD/Mã số DN!' }]}
          >
            <Input placeholder="Nhập CCCD hoặc mã số doanh nghiệp" />
          </Form.Item>

          <Form.Item
            name="power"
            label="Công suất khai thác"
            rules={[{ required: true, message: 'Vui lòng nhập công suất khai thác!' }]}
          >
            <Input placeholder="Ví dụ: 5000 tấn/năm" />
          </Form.Item>

          <Form.Item
            name="referenceCode"
            label="Mã chỉ định"
            rules={[{ required: true, message: 'Vui lòng nhập mã chỉ định!' }]}
          >
            <Input placeholder="Nhập mã chỉ định" />
          </Form.Item>

          <Form.Item
            name="ownerName"
            label="Họ tên chủ/giám đốc cảng"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên chủ/giám đốc cảng!' }]}
          >
            <Input placeholder="Nhập họ tên" />
          </Form.Item>

          <Form.Item
            name="ownerPhone"
            label="Điện thoại chủ/giám đốc cảng"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="Thông tin chi tiết cảng"
        open={isDetailModalVisible}
        onCancel={handleDetailModalCancel}
        width={800}
        footer={[
          <Button key="cancel" onClick={handleDetailModalCancel}>
            Đóng
          </Button>,
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEdit}
          >
            Chỉnh sửa
          </Button>,
          <Button
            key="delete"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          >
            Xóa
          </Button>
        ]}
      >
        {selectedRecord && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Số">{selectedRecord.key}</Descriptions.Item>
            <Descriptions.Item label="Tên cảng">{selectedRecord.name}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{selectedRecord.address}</Descriptions.Item>
            <Descriptions.Item label="Tọa độ GPS">{selectedRecord.gpsCoordinate}</Descriptions.Item>
            <Descriptions.Item label="Loại hình">{selectedRecord.businessModel}</Descriptions.Item>
            <Descriptions.Item label="CCCD/Mã số DN">{selectedRecord.nationalID}</Descriptions.Item>
            <Descriptions.Item label="Công suất khai thác">{selectedRecord.power}</Descriptions.Item>
            <Descriptions.Item label="Mã chỉ định">{selectedRecord.referenceCode}</Descriptions.Item>
            <Descriptions.Item label="Họ tên chủ/giám đốc cảng">{selectedRecord.ownerName}</Descriptions.Item>
            <Descriptions.Item label="Điện thoại chủ/giám đốc cảng">{selectedRecord.ownerPhone}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Chỉnh sửa thông tin cảng"
        open={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
        width={800}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <Form
          form={editForm}
          layout="vertical"
          name="editHarborForm"
        >
          <Form.Item
            name="name"
            label="Tên cảng"
            rules={[{ required: true, message: 'Vui lòng nhập tên cảng!' }]}
          >
            <Input placeholder="Nhập tên cảng" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item
            name="gpsCoordinate"
            label="Tọa độ GPS"
            rules={[{ required: true, message: 'Vui lòng nhập tọa độ GPS!' }]}
          >
            <Input placeholder="Ví dụ: 20.8449, 106.6881" />
          </Form.Item>

          <Form.Item
            name="businessModel"
            label="Loại hình"
            rules={[{ required: true, message: 'Vui lòng nhập loại hình!' }]}
          >
            <Input placeholder="Nhập loại hình kinh doanh" />
          </Form.Item>

          <Form.Item
            name="nationalID"
            label="CCCD/Mã số DN"
            rules={[{ required: true, message: 'Vui lòng nhập CCCD/Mã số DN!' }]}
          >
            <Input placeholder="Nhập CCCD hoặc mã số doanh nghiệp" />
          </Form.Item>

          <Form.Item
            name="power"
            label="Công suất khai thác"
            rules={[{ required: true, message: 'Vui lòng nhập công suất khai thác!' }]}
          >
            <Input placeholder="Ví dụ: 5000 tấn/năm" />
          </Form.Item>

          <Form.Item
            name="referenceCode"
            label="Mã chỉ định"
            rules={[{ required: true, message: 'Vui lòng nhập mã chỉ định!' }]}
          >
            <Input placeholder="Nhập mã chỉ định" />
          </Form.Item>

          <Form.Item
            name="ownerName"
            label="Họ tên chủ/giám đốc cảng"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên chủ/giám đốc cảng!' }]}
          >
            <Input placeholder="Nhập họ tên" />
          </Form.Item>

          <Form.Item
            name="ownerPhone"
            label="Điện thoại chủ/giám đốc cảng"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Form>
      </Modal>
      
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