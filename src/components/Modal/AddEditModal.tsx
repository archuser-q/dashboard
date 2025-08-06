import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { useModalStore } from '@/store/useModalStore';
import { type DataType } from '@/types/registrationAndCertificate/harbour';

interface AddEditModalProps {
  onSave: (values: Omit<DataType, 'key'>, isEdit: boolean) => void;
}

export const AddEditModal: React.FC<AddEditModalProps> = ({ onSave }) => {
  const { 
    isAddEditModalVisible, 
    isEditMode, 
    selectedRecord, 
    hideAddEditModal 
  } = useModalStore();
  
  const [form] = Form.useForm();

  useEffect(() => {
    if (isAddEditModalVisible) {
      if (isEditMode && selectedRecord) {
        form.setFieldsValue(selectedRecord);
      } else {
        form.resetFields();
      }
    }
  }, [isAddEditModalVisible, isEditMode, selectedRecord, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave(values, isEditMode);
      form.resetFields();
      hideAddEditModal();
      message.success(
        isEditMode 
          ? 'Cập nhật thông tin cảng thành công!' 
          : 'Thêm thông tin cảng thành công!'
      );
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    hideAddEditModal();
  };

  return (
    <Modal
      title={isEditMode ? "Chỉnh sửa thông tin cảng" : "Thêm thông tin cảng mới"}
      open={isAddEditModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      okText={isEditMode ? "Cập nhật" : "Thêm"}
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
        name={isEditMode ? "editHarborForm" : "addHarborForm"}
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
  );
};