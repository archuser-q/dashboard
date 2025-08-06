export const fieldsConfig = [
  { name: 'boatSymbol', label: 'Ký hiệu tàu', rules: [{ required: true, message: 'Bắt buộc' }] },
  { name: 'boatType', label: 'Loại tàu', rules: [{ required: true, message: 'Bắt buộc' }] },
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
        { value: 'Khai thác cá nổi', label: 'Khai thác cá nổi' },
        { value: 'Khai thác cá đáy', label: 'Khai thác cá đáy' },
        { value: 'Khai thác cá rạn san hô', label: 'Khai thác cá rạn san hô' },
        { value: 'Khai thác tôm biển', label: 'Khai thác tôm biển' },
        { value: 'Khai thác mực', label: 'Khai thác mực' },
        { value: 'Khai thác thủ công ven bờ', label: 'Khai thác thủ công ven bờ' },
        { value: 'Khai thác lưới kéo đáy', label: 'Khai thác lưới kéo đáy' },
        { value: 'Khai thác lưới rê nổi', label: 'Khai thác lưới rê nổi' },
        { value: 'Khai thác câu tay', label: 'Khai thác câu tay' },
        { value: 'Khai thác lồng bẫy', label: 'Khai thác lồng bẫy' },
        { value: 'Khai thác lưới vây', label: 'Khai thác lưới vây' },
        { value: 'Khai thác đa nghề', label: 'Khai thác đa nghề' }
    ]
  },
  { name:'harbourCode', label: 'Mã cảng', rules: [{ required: true, message: 'Bắt buộc' }]},
  { name: 'ownerInfo', label: 'Thông tin chủ tàu', rules: [{ required: true, message: 'Bắt buộc' }] },
  { name: 'ownerNID', label: 'CCCD/Mã số DN chủ tàu', rules: [{ required: true, message: 'Bắt buộc' }] },
  { name: 'ownerPhone', label: 'Số điện thoại chủ tàu', rules: [{ required: true, message: 'Bắt buộc' }] },
  { name: 'licenseNumber', label: 'Số giấy phép', rules: [{required: true, message:'Bắt buộc'}]},
  { name: 'fishType', label: 'Loài cá', rules: [{required: true, message:'Bắt buộc'}]},
  { name: 'fishingGrounds', label:'Ngư trường', rules: [{required: true, message:'Bắt buộc'}]},
  { name: 'seasons', label: 'Mùa vụ', rules: [{required: true, message: 'Bắt buộc'}]},
  { name: 'output', label:'Sản lượng', rules: [{required: true, message: 'Bắt buộc'}]}
];