import { Drawer, Descriptions, Space, Button } from 'antd';
import { useDrawerStore } from '@/store/useDrawerStore';

export interface FieldConfig {
  key: string;
  label: string;
}

interface ReusableDrawerProps {
  fieldsConfig: FieldConfig[];
  data?: Record<string, any>;
}

export const ReusableDrawer = ({ fieldsConfig, data }: ReusableDrawerProps) => {
  const { visible, closeDrawer } = useDrawerStore();

  return (
    <Drawer
      title="Thông tin chi tiết"
      open={visible}
      onClose={closeDrawer}
      width={600}
      extra={
        <Space>
          <Button>Sửa</Button>
          <Button color="danger" variant='solid'>
            Xóa
          </Button>
        </Space>
      }
    >
      <Descriptions column={1} bordered>
        {fieldsConfig.map((field) => (
          <Descriptions.Item key={field.key} label={field.label}>
            {data?.[field.key] ?? '—'}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Drawer>
  );
};
