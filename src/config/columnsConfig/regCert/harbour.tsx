export const columns = [
  { title: 'Tên', dataIndex: 'name', key: 'name' },
  { title: 'Địa chỉ', dataIndex: 'address', key:'address'},
  { title: 'GPS', dataIndex: 'GPS', key: 'GPS' },
  { title: 'Mô hình kinh doanh', dataIndex: 'businessModel', key: 'businessModel' },
  { title: 'NID', dataIndex: 'nid', key: 'nid' },
  { title: 'Công suất', dataIndex: 'power', key: 'power', render: (value: number) => `${value} kW` },
  { title: 'Mã định danh', dataIndex: 'identCode', key: 'identCode' },
  { title: 'Tên chủ sở hữu', dataIndex: 'ownerName', key: 'ownerName' },
  { title: 'SĐT chủ sở hữu', dataIndex: 'ownerPhone', key: 'ownerPhone' },
];
