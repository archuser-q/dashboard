import { columns, type DataType } from '@/configuration/columnsConfig/fishingGround';
import { data } from '@/mockupdata/category/fishingGround';
import { useSearchStore } from '@/store/useSearchStore';
import { createFileRoute } from '@tanstack/react-router'
import { Button, Flex, Input, Table } from 'antd';
import { useEffect} from 'react';
import '@ant-design/v5-patch-for-react-19';
import { ReusableDrawer } from '@/components/Drawer';
import { fieldsConfig } from '@/configuration/fieldsConfig/fishingGround';
import { useDrawerStore } from '@/store/useDrawerStore';

export const Route = createFileRoute('/category/fishingGround')({
  component: RouteComponent,
})

function RouteComponent() {
  const { searchTerm, filteredData, setSearchTerm, setData } = useSearchStore();
  const { selectedData } = useDrawerStore();

  useEffect(() => {
    setData(data);
  }, [setData]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  return (
    <Flex vertical gap={10}>
      <Flex gap={10}>
        <Input.Search placeholder="Tìm kiêm" variant="filled" allowClear
        value={searchTerm}
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}/>
        <Button type='primary'>Thêm</Button>
      </Flex>
      <Table<DataType> 
        columns={columns} 
        dataSource={filteredData}
        pagination={{
          pageSize: 5,
          defaultCurrent: 1
        }} />
      <ReusableDrawer fieldsConfig={fieldsConfig} data={selectedData ?? {}}/>
    </Flex>
  );
}
