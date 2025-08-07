import React, { useState, useEffect } from 'react';
import { Drawer, Form, Input, Button, Space, Popconfirm, Typography, message, DatePicker, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;

interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  mode?: string;
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

  // Get all date field names from fieldsConfig - memoize to prevent unnecessary re-renders
  const dateFields = React.useMemo(() => 
    fieldsConfig.filter(field => field.type === 'date').map(field => field.name),
    [fieldsConfig]
  );

  useEffect(() => {
    // Only run this effect when the drawer is opened with a new record, not during editing
    if (visible) {
      if (isAdding) {
        form.resetFields();
        form.setFieldsValue(initialValues || {});
        setIsEditing(true);
      } else if (record && !isEditing) {
        const formValues = { ...record };
        
        // Handle all date fields dynamically
        dateFields.forEach((fieldName) => {
          if (record[fieldName]) {
            let parsed;
            if (dayjs.isDayjs(record[fieldName])) {
              // If it's already a dayjs object
              parsed = record[fieldName];
            } else {
              // Parse the date string
              parsed = dayjs(record[fieldName]);
            }
            
            if (parsed && parsed.isValid()) {
              formValues[fieldName] = parsed;
            }
          }
        });
        
        form.setFieldsValue(formValues);
        setIsEditing(false);
      }
    }
  }, [visible, isAdding, record, form, initialValues, dateFields]);

  const handleEdit = () => {
    setIsEditing(true);
    
    if (record) {
      const initialValues = { ...record };
      
      // Handle all date fields dynamically for editing
      dateFields.forEach((fieldName) => {
        const raw = record?.[fieldName];
        
        if (raw) {
          // Try different date formats and handle various input types
          let parsed;
          if (dayjs.isDayjs(raw)) {
            // If it's already a dayjs object
            parsed = raw;
          } else if (typeof raw === 'string') {
            // Try parsing as DD/MM/YYYY format first
            parsed = dayjs(raw, 'DD/MM/YYYY', true);
            if (!parsed.isValid()) {
              // Try other common formats
              parsed = dayjs(raw);
            }
          } else {
            // For other types, try direct parsing
            parsed = dayjs(raw);
          }
          
          if (parsed && parsed.isValid()) {
            initialValues[fieldName] = parsed;
          }
        }
      });
      
      form.setFieldsValue(initialValues);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // Handle all date fields dynamically for saving
      dateFields.forEach((fieldName) => {
        if (values[fieldName]) {
          values[fieldName] = values[fieldName].format('DD/MM/YYYY');
        }
      });

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
              <Button onClick={handleCancel}>Hủy</Button>
              <Button type="primary" onClick={handleSave}>
                Lưu
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
                  Xóa
                </Button>
              </Popconfirm>
              <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                Sửa
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
                <Select
                  style={{ width: '100%' }}
                  mode={field.mode} 
                >
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
                {(() => {
                  const value = record?.[field.name];
                  
                  // Xử lý kiểu date
                  if (field.type === 'date') {
                    const parsed = dayjs(value);
                    return parsed.isValid() ? parsed.format('DD/MM/YYYY') : value;
                  }

                  // Xử lý kiểu mảng (multi-select)
                  if (Array.isArray(value)) {
                    return value.map((item: string, idx: number) => (
                      <div key={idx}> - {item}</div>
                    ));
                  }

                  // Mặc định
                  return value || '—';
                })()}
              </Text>
            </div>
          ))}
        </Space>
      )}
    </Drawer>
  );
};

export default CarbonDrawer;