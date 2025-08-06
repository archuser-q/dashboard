import type { DataType } from "@/types/regCert/local";

export const sampleData: DataType[] = [
  {
    key: '1',
    boatSymbol: 'VN-001',
    boatType: '6-12 m',
    regisDate: '12/05/2023',
    regisNumber: 'RC-12345',
    regisOffice: 'Cục hải dương Việt nam',
    inspectDate: '12/7/2024',
    inspectPlace: 'ABC',
    occupation: 'Khai thác thủy sản',
    harbourCode: 'OVB123',
    ownerInfo: 'Nguyen Van A',
    ownerNID: '0123456789',
    ownerPhone: '0901234567',
    license: {
      licenseNumber: 'LIC-001',
      fishType: ['Cá ngừ', 'Cá thu'],
      fishingGrounds: 'Biển Đông',
      seasons: 'Mùa hè',
      output: '500kg',
    },
  },
];