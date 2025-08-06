export interface DataType {
  key: number;
  name: string;
  address: string;
  gpsCoordinate: string;
  businessModel: string;
  nationalID: string;
  power: string;
  referenceCode: string;
  ownerName: string;
  ownerPhone: string;
}

export interface ColumnConfig {
  key: string;
  title: string;
  dataIndex: string;
  visible: boolean;
}