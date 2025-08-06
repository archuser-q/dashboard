import React, { useState, useEffect } from 'react';
import { Drawer, Form, Input, Button, Space, Popconfirm, Typography, message, DatePicker, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;

interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  rules?: any[];
  options?: { value: any; label: string }[];
}

interface CarbonDrawerProps {
  visible: boolean;
  onClose: () => void;
  record?: any;
  onUpdate: (values: any) => void;
  onAdd: (values: any) => void;
  onDelete: (key: any) => void;
  fieldsConfig: FieldConfig[];
  isAdding: boolean;
  initialValues?: any;
}

const CarbonDrawer: React.FC<CarbonDrawerProps> = ({ 
  visible, 
  onClose, 
  record, 
  onUpdate, 
  onAdd, 
  onDelete, 
  fieldsConfig, 
  isAdding, 
  initialValues 
}) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState<boolean>(isAdding);

  useEffect(() => {
    if (isAdding) {
      form.resetFields();
      form.setFieldsValue(initialValues || {});
      setIsEditing(true);
    } else if (record) {
      const initialValues = { ...record };
      if (record.thoiGian) {
        initialValues.thoiGian = dayjs(record.thoiGian);
      }
      form.setFieldsValue(initialValues);
      setIsEditing(false);
    }
  }, [isAdding, record, form, initialValues]);

  const handleEdit = () => {
    setIsEditing(true);
    if (record) {
      const initialValues = { ...record };
      if (record.thoiGian) {
        ['thoiGian', 'dob'].forEach((field) => {
          const raw = record?.[field];
          const parsed = dayjs(raw, 'DD/MM/YYYY', true);
          if (parsed.isValid()) {
            initialValues[field] = parsed;
          }
        });
      }
      form.setFieldsValue(initialValues);
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
        message.success('Adding Success');
      } else {
        onUpdate({ ...record, ...values });
        message.success('Update Success');
      }

      setIsEditing(false);
      onClose();
    } catch (error) {
      message.error(isAdding ? 'Adding Fail' : 'Update Fail');
    }
  };

  const handleDelete = () => {
    onDelete(record.key);
    onClose();
    message.success('Delete Success');
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
    if (isAdding) onClose();
  };

  return (
    <Drawer
      title={isAdding ? 'Adding Data' : isEditing ? 'Edit Data' : 'Detail Data'}
      width={400}
      onClose={onClose}
      open={visible}
      footer={
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          {isEditing ? (
            <>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Popconfirm
                title="Confirm Delete"
                onConfirm={handleDelete}
                okText="Delete"
                cancelText="Cancel"
              >
                <Button danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
              <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                Edit
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
              {...(field.rules ? { rules: field.rules } : {})}
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

export default CarbonDrawer;