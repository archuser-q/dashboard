interface License {
  licenseNumber: string;
  fishType: string[];
  fishingGrounds: string;
  seasons: string;
  output: string;
}

export interface DataType {
  key: string;
  boatSymbol: string;
  boatType: string;
  regisDate: string;
  regisNumber: string;
  regisOffice: string;
  occupation: string;
  harbourCode: string;
  inspectDate: string;
  inspectPlace: string;
  ownerInfo: string;
  ownerNID: string;
  ownerPhone: string;
  license: License;
}