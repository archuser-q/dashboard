import { createFileRoute } from '@tanstack/react-router'
import { Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/gpsJournal')({
  component: RouteComponent,
})

interface DataType {
  key: string;
  arrivedtime: number;
  unitid: string;
  positiontime: number;
  latitude: number;
  longitude: number;
  type: string;
}

const columns = [
  { 
    title: 'Thời gian cập bến', 
    dataIndex: 'arrivedtime', 
    key: 'arrivedtime',
    render: (time: number) => new Date(time).toLocaleString()
  },
  { title: 'Mã thiết bị', dataIndex: 'unitid', key: 'unitid' },
  { 
    title: 'Thời gian định vị', 
    dataIndex: 'positiontime', 
    key: 'positiontime',
    render: (time: number) => new Date(time * 1000).toLocaleString()
  },
  { title: 'Vĩ độ', dataIndex: 'latitude', key: 'latitude' },
  { title: 'Kinh độ', dataIndex: 'longitude', key: 'longitude' },
  { title: 'Loại', dataIndex: 'type', key: 'type' }
];

function RouteComponent() {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    axios.get('', {
      headers: {
        'x-api-key': '', 
      },
      params: {
        from: 1754570224,
      }
    })
      .then((res) => {
        const responseData = res.data;
        
        const rawData = Array.isArray(responseData) 
          ? responseData 
          : responseData?.position || [];
        
        const formattedData = rawData.map((item: any, index: number) => ({
          ...item,
          key: `${item.unitid}_${index}`, // Tạo key duy nhất
        }));
        
        setData(formattedData);
        console.log('Formatted data:', formattedData);
      })
      .catch((err) => {
        console.error('Lỗi khi gọi API:', err);
      });
  }, []);

  return (
    <Table<DataType>
      columns={columns} 
      dataSource={data} 
      rowKey="key"
      locale={{ emptyText: 'Đang tải dữ liệu...' }}
    />
  );
}