import { createFileRoute } from '@tanstack/react-router'
import { Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { columns } from '@/config/columnsConfig/gpsJournal';
import type { DataType } from '@/types/gpsJournal';
import { fetchGPSData } from '@/mockupdata/gpsJournal';

export const Route = createFileRoute('/gpsJournal')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading, error } = useQuery<DataType[]>({
    queryKey: ['gpsJournal'], 
    queryFn: fetchGPSData, 
    staleTime: 5 * 60 * 1000, // 5p = refresh
  });

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Lỗi khi tải dữ liệu: {error.message}</div>;
  }

  return (
    <Table<DataType>
      columns={columns} 
      dataSource={data} 
      rowKey="key"
      locale={{ emptyText: 'Không có dữ liệu' }}
    />
  );
}