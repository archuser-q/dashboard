export const fieldsConfig = [
  { name: 'boatSymbol', label: 'Ký hiệu tàu', rules: [{ required: true, message: 'Bắt buộc' }] },
  { 
    name: 'boatType', 
    label: 'Loại tàu',
    type: 'select',
    options: [
      {value: '<6 m', label:'<6m'},
      {value: '6-12 m', label: '6-12 m'},
      {value: '12-15 m', label: '12-15 m'},
      {value: '15-24 m', label: '15-24 m'},
      {value: '>24m', label: '>24m'},
    ] 
  },
  { name: 'regisDate', label: 'Ngày đăng ký', type: 'date', rules: [{ required: true, message: 'Bắt buộc' }] },
  { name: 'regisNumber', label: 'Số giấy đăng ký', rules: [{ required: true, message: 'Bắt buộc' }] },
  { name: 'regisOffice', label: 'Cơ quan cấp đăng ký', rules: [{ required: true, message: 'PBắt buộc' }] },
  { name: 'inspectDate', label: 'Ngày đăng kiểm', type: 'date', rules: [{ required: true, message: 'Bắt buộc' }] },
  { name: 'inspectPlace', label: 'Nơi đăng kiểm', rules: [{ required: true, message: 'Bắt buộc' }] },
  {
    name: 'occupation',
    label: 'Ngành nghề khai thác',
    type: 'select',
    mode: 'multiple', 
    options: [
      {value:'bien',label:'Khai thác thủy sản biển'},
      {value:'noiDia',label:'Khai thác thủy sản nội địa'}
    ],
  },
  { name:'harbourCode', label: 'Mã cảng', rules: [{ required: true, message: 'Bắt buộc' }]},
  { name: 'ownerInfo', label: 'Thông tin chủ tàu', rules: [{ required: true, message: 'Bắt buộc' }] },
  { name: 'ownerNID', label: 'CCCD/Mã số DN chủ tàu', rules: [{ required: true, message: 'Bắt buộc' }] },
  { name: 'ownerPhone', label: 'Số điện thoại chủ tàu', rules: [{ required: true, message: 'Bắt buộc' }] },
  { name: 'licenseNumber', label: 'Số giấy phép', rules: [{required: true, message:'Bắt buộc'}]},
  {
    name: 'fishType',
    label: 'Loài cá',
    type: 'select',
    mode: 'multiple', 
    options: [
      { value: 'Cá ngừ', label: 'Cá ngừ' },
      { value: 'Cá thu', label: 'Cá thu' },
      { value: 'Cá mực', label: 'Cá mực' },
      { value: 'Cá nục', label: 'Cá nục' },
    ]
  },
  { name: 'fishingGrounds', label:'Ngư trường', rules: [{required: true, message:'Bắt buộc'}]},
  { name: 'seasons', label: 'Mùa vụ', rules: [{required: true, message: 'Bắt buộc'}]},
  { name: 'output', label:'Sản lượng', rules: [{required: true, message: 'Bắt buộc'}]}
];