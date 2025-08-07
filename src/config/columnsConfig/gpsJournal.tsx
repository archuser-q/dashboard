export const columns = [
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