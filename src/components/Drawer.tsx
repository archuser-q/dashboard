import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Form,
  Input,
  Button,
  Space,
  Popconfirm,
  Typography,
  message,
  DatePicker,
  Select,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;

interface FieldConfig {
  name: string;
  label: string;
  type?: 'text' | 'date' | 'select';
  rules?: any[];
  options?: { value: string; label: string }[];
}

interface RecordType {
  key: string;
  [key: string]: any;
}

interface CustomDrawerProps {
  visible: boolean;
  onClose: () => void;
  record?: RecordType;
  onUpdate: (updated: RecordType) => void;
  onAdd: (newData: RecordType) => void;
  onDelete: (key: string) => void;
  fieldsConfig: FieldConfig[];
  isAdding: boolean;
  initialValues?: RecordType;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  visible,
  onClose,
  record,
  onUpdate,
  onAdd,
  onDelete,
  fieldsConfig,
  isAdding,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(isAdding);

  useEffect(() => {
    if (isAdding) {
      form.resetFields();
      form.setFieldsValue(initialValues || {});
      setIsEditing(true);
    } else if (record) {
      const initial = { ...record };
      if (record.thoiGian) {
        initial.thoiGian = dayjs(record.thoiGian);
      }
      form.setFieldsValue(initial);
      setIsEditing(false);
    }
  }, [isAdding, record, form, initialValues]);

  const handleEdit = () => {
    setIsEditing(true);
    if (record) {
      const initial = { ...record };
      ['thoiGian', 'dob'].forEach((field) => {
        const raw = record?.[field];
        const parsed = dayjs(raw, 'DD/MM/YYYY', true);
        if (parsed.isValid()) {
          initial[field] = parsed;
        }
      });
      form.setFieldsValue(initial);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (values.thoiGian) {
        values.thoiGian = values.thoiGian.format('DD/MM/YYYY');
      }

      if (isAdding) {
        onAdd(values);
        message.success('Thêm dữ liệu thành công');
      } else {
        onUpdate({ ...record, ...values });
        message.success('Cập nhật dữ liệu thành công');
      }

      setIsEditing(false);
      onClose();
    } catch (error) {
      message.error(isAdding ? 'Thêm dữ liệu thất bại' : 'Cập nhật dữ liệu thất bại');
    }
  };

  const handleDelete = () => {
    if (record) {
      onDelete(record.key);
      onClose();
      message.success('Xóa dữ liệu thành công');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
    if (isAdding) onClose();
  };

  return (
    <Drawer
      title={
        isAdding
          ? 'Thêm dữ liệu'
          : isEditing
          ? 'Chỉnh sửa dữ liệu'
          : 'Chi tiết dữ liệu'
      }
      width={400}
      onClose={onClose}
      open={visible}
      footer={
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          {isEditing ? (
            <>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button type="primary" onClick={handleSave}>
                Lưu
              </Button>
            </>
          ) : (
            <>
              <Popconfirm
                title="Bạn có chắc muốn xóa?"
                onConfirm={handleDelete}
                okText="Xóa"
                cancelText="Hủy"
              >
                <Button danger icon={<DeleteOutlined />}>
                  Xóa
                </Button>
              </Popconfirm>
              <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                Chỉnh sửa
              </Button>
            </>
          )}
        </Space>
      }
    >
      {isEditing ? (
        <Form form={form} layout="vertical">
          {fieldsConfig.map((field) => (
            <Form.Item
              key={field.name}
              name={field.name}
              label={field.label}
              rules={field.rules}
            >
              {field.type === 'date' ? (
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
              ) : field.type === 'select' && field.options ? (
                <Select style={{ width: '100%' }}>
                  {field.options.map((opt) => (
                    <Select.Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Input />
              )}
            </Form.Item>
          ))}
        </Form>
      ) : (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {fieldsConfig.map((field) => (
            <div key={field.name}>
              <Text strong>{field.label}: </Text>
              <Text>
                {['thoiGian', 'dob'].includes(field.name) && record?.[field.name]
                  ? dayjs(record[field.name], 'DD/MM/YYYY').format('DD/MM/YYYY')
                  : record?.[field.name] || ''}
              </Text>
            </div>
          ))}
        </Space>
      )}
    </Drawer>
  );
};

export default CustomDrawer;
