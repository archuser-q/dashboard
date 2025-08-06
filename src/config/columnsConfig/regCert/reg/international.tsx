import type { DataType } from "@/types/regCert/reg/international";

export const columns = [
  { title: 'Ký hiệu tàu', dataIndex: 'boatSymbol', key: 'boatSymbol' },
  { title: 'Loại tàu', dataIndex: 'boatType', key: 'boatType' },
  { title: 'Ngày đăng ký', dataIndex: 'regisDate', key: 'regisDate' },
  { title: 'Cơ quan cấp đăng ký', dataIndex: 'regisOffice', key: 'regisOffice' },
  {
    title: 'Ngành nghề khai thác',
    dataIndex: 'occupation',
    key: 'occupation',
    render: (occupations: string[]) => occupations.join(', '),
  },
  { title: 'Mã cảng', dataIndex: 'harbourCode', key: 'harbourCode' },
  { title: 'Ngày đăng kiểm', dataIndex: 'inspectDate', key: 'inspectDate' },
  { title: 'Nơi đăng kiểm', dataIndex: 'inspectPlace', key: 'inspectPlace' },
  { title: 'Thông tin chủ tàu', dataIndex: 'ownerInfo', key: 'ownerInfo' },
  { title: 'CCCD chủ tàu', dataIndex: 'ownerNID', key: 'ownerNID' },
  { title: 'SĐT chủ tàu', dataIndex: 'ownerPhone', key: 'ownerPhone' },
  { title: 'Trưởng tàu', dataIndex: 'captain', key: 'captain' },
  { title: 'Số hộ chiếu trưởng tàu', dataIndex: 'captainPassport', key:'captainPassport'},
  { title: 'SĐT trưởng tàu', dataIndex: 'captainPhone', key: 'captainPhone' },
  {
    title: 'Danh sách thuyền viên',
    dataIndex: 'crewList',
    key: 'crewList',
    render: (crew: string[]) => crew.join(', '),
  },
  {title: 'Giấy phép khai thác',key: 'license',
    render: (_: any, record: DataType) => (
        <div>
            <div>Số giấy phép: {record.licenseNumber}</div>
            <div>
                Loài cá:{' '}
                {Array.isArray(record.fishType)
                ? record.fishType.join(', ')
                : '—'}
            </div>
            <div>Ngư trường: {record.fishingGrounds}</div>
            <div>Mùa vụ: {record.seasons}</div>
            <div>Sản lượng: {record.output}</div>
        </div>
    ),
  },
];