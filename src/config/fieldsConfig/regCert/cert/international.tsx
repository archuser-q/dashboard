import { sampleData as registeredBoats } from '@/mockupdata/regCert/reg/international';

export const fieldsConfig = [
  {
      name: 'boatCodeReference',
      label: 'Ký hiệu tàu',
      type: 'select',
      options: registeredBoats.map(boat => ({
          label: `${boat.boatSymbol}`,
          value: boat.boatSymbol,
      })),
      rules: [{ required: true, message: 'Bắt buộc' }]
  },
  {name:'alonId', label:'ID Alon', rules:[{required:true, message:'Bắt buộc'}]},
  {name:'activeDate', label:'Ngày kích hoạt', rules:[{required:true, message:'Bắt buộc'}]},
  {name:'accessCode', label:'Mã truy cập', rules:[{required:true, message:'Bắt buộc'}]}
]