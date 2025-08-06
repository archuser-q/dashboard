import type { DataType } from "@/types/registrationAndCertificate/harbour";

export const initialData: DataType[] = [
  {
    key: 1,
    name: 'Cảng Hải An',
    address: 'Số 12, Đường Nguyễn Văn Linh, Hải Phòng',
    gpsCoordinate: '20.8449, 106.6881',
    businessModel: 'Tư nhân',
    nationalID: '0102030405',
    power: '5000 tấn/năm',
    referenceCode: 'HA001',
    ownerName: 'Nguyễn Văn A',
    ownerPhone: '0901234567'
  },
  {
    key: 2,
    name: 'Cảng Sài Gòn',
    address: 'Bến Nhà Rồng, Quận 4, TP. Hồ Chí Minh',
    gpsCoordinate: '10.7631, 106.7042',
    businessModel: 'Cổ phần',
    nationalID: '0203040506',
    power: '12000 tấn/năm',
    referenceCode: 'SG002',
    ownerName: 'Trần Thị B',
    ownerPhone: '0912345678'
  },
  {
    key: 3,
    name: 'Cảng Đà Nẵng',
    address: 'Số 1, Đường Bạch Đằng, Đà Nẵng',
    gpsCoordinate: '16.0678, 108.2208',
    businessModel: 'Nhà nước',
    nationalID: '0304050607',
    power: '8000 tấn/năm',
    referenceCode: 'DN003',
    ownerName: 'Lê Văn C',
    ownerPhone: '0923456789'
  }
];