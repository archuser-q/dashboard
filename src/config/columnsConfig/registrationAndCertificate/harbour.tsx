import type { ColumnConfig } from '@/types/registrationAndCertificate/harbour';

export const allColumns: ColumnConfig[] = [
  { key: 'key', title: 'Số', dataIndex: 'key', visible: true },
  { key: 'name', title: 'Tên cảng', dataIndex: 'name', visible: true },
  { key: 'address', title: 'Địa chỉ', dataIndex: 'address', visible: true },
  { key: 'gpsCoordinate', title: 'Tọa độ GPS', dataIndex: 'gpsCoordinate', visible: true },
  { key: 'businessModel', title: 'Loại hình', dataIndex: 'businessModel', visible: true },
  { key: 'nationalID', title: 'CCCD/Mã số DN', dataIndex: 'nationalID', visible: true },
  { key: 'power', title: 'Công suất khai thác', dataIndex: 'power', visible: true },
  { key: 'referenceCode', title: 'Mã chỉ định', dataIndex: 'referenceCode', visible: true },
  { key: 'ownerName', title: 'Họ tên chủ/giám đốc cảng', dataIndex: 'ownerName', visible: true },
  { key: 'ownerPhone', title: 'Điện thoại chủ/giám đốc cảng', dataIndex: 'ownerPhone', visible: true }
];