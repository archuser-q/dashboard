import { useQuery } from '@tanstack/react-query';
import { fetchGPSData } from '@/mockupdata/gpsJournal';
import type { DataType } from '@/types/gpsJournal';
import { Table, Tag, Typography, Spin } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/activity/activeBoat')({
  component: RouteComponent,
})

const { Text } = Typography;

// Hàm lọc tàu đang đánh bắt (ON/MOVE) hoặc có thể đang thả lưới (OFF gần đây)
const getFishingVessels = (data: DataType[] = []) => {
  const HOUR = 3600; // 1 giờ = 3600 giây
  const now = Math.floor(Date.now() / 1000); // Timestamp hiện tại
  
  return data.filter(item => {
    // Tàu đang hoạt động tích cực
    if (['ON', 'MOVE'].includes(item.type)) return true;
    
    // Tàu tắt máy (OFF) nhưng có hoạt động trong 2 giờ gần đây
    if (item.type === 'OFF' && (now - item.positiontime) <= 2 * HOUR) return true;
    
    return false;
  });
};

function RouteComponent() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['fishingActivity'],
    queryFn: fetchGPSData,
    select: getFishingVessels
  });

  const columns = [
    {
      title: 'Mã tàu',
      dataIndex: 'unitid',
      render: (id: string) => (
        <Text>{id}</Text>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'type',
      render: (type: string) => {
        const statusMap: Record<string, { color: string; text: string }> = {
          ON: { color: 'green', text: 'Đang bắt' },
          MOVE: { color: 'blue', text: 'Di chuyển' },
          OFF: { color: 'orange', text: 'Thả lưới' }
        };
        return <Tag color={statusMap[type]?.color || 'gray'}>{statusMap[type]?.text || type}</Tag>;
      }
    },
    {
      title: 'Vị trí',
      render: (record: DataType) => (
        <Text>
          <EnvironmentOutlined /> {record.latitude.toFixed(4)}, {record.longitude.toFixed(4)}
        </Text>
      )
    },
    {
      title: 'Cập nhật',
      dataIndex: 'positiontime',
      render: (time: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <ClockCircleOutlined />
          {new Date(time * 1000).toLocaleTimeString()}
        </div>
      )
    },
    {
      title: 'Thời gian hoạt động',
      render: (record: DataType) => {
        const hours = Math.floor((Date.now() / 1000 - record.positiontime) / 3600);
        return `${hours} giờ trước`;
      }
    }
  ];

  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <Spin size="large" />
        </div>
      ) : isError ? (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <Text type="danger">Lỗi khi tải dữ liệu</Text>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="key"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: 'Không có tàu nào đang hoạt động' }}
        />
      )}
    </>
  );
}
