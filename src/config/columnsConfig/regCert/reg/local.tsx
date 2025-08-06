import type { DataType } from "@/types/regCert/local";
export const columns = [
  {
    title: 'Ký hiệu tàu',
    dataIndex: 'boatSymbol',
    key: 'boatSymbol',
  },
  {
    title: 'Loại tàu',
    dataIndex: 'boatType',
    key: 'boatType',
  },
  {
    title: 'Ngày đăng ký',
    dataIndex: 'regisDate',
    key: 'regisDate',
  },
  {
    title: 'Số giấy đăng ký',
    dataIndex: 'regisNumber',
    key: 'regisNumber',
  },
  {
    title: 'Cơ quan cấp đăng ký',
    dataIndex: 'regisOffice',
    key: 'regisOffice',
  },
  {
    title: 'Ngành nghề khai thác',
    dataIndex: 'occupation',
    key: 'occupation',
  },
  {
    title: 'Mã cảng',
    dataIndex: 'harbourCode',
    key: 'harbourCode'
  },
  {
    title: 'Thông tin chủ tàu',
    dataIndex: 'ownerInfo',
    key: 'ownerInfo',
  },
  {
    title: 'CCCD/Mã số DN chủ tàu',
    dataIndex: 'ownerNID',
    key: 'ownerNID',
  },
  {
    title: 'Ngày đăng kiểm',
    dataIndex: 'inspectDate',
    key: 'inspectDate',
  },
  {
    title: 'Nơi đăng kiểm',
    dataIndex: 'inspectPlace',
    key: 'inspectPlace',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'ownerPhone',
    key: 'ownerPhone',
  },
  {
    title: 'Giấy phép khai thác',
    key: 'license',
    render: (_: any, record: DataType) => (
      <div>
        <div>Số giấy phép: {record.license.licenseNumber}</div>
        <div>
            Loài cá:{' '}
            {Array.isArray(record.license?.fishType)
                ? record.license.fishType.join(', ')
                : '—'}
        </div>
        <div>Ngư trường: {record.license.fishingGrounds}</div>
        <div>Mùa vụ: {record.license.seasons}</div>
        <div>Sản lượng: {record.license.output}</div>
      </div>
    ),
  },
];