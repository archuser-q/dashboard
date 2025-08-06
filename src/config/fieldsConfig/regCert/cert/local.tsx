import { sampleData as registeredBoats } from '@/mockupdata/regCert/reg/local';

export const fieldsConfig = [
    {
        name: 'boatCode',
        label: 'Mã tàu',
        type: 'select',
        options: registeredBoats.map(boat => ({
            label: `${boat.boatSymbol}`,
            value: boat.boatSymbol,
        })),
        rules: [{ required: true, message: 'Bắt buộc' }]
    },
    { name: 'alonID', label: 'ID Alon', rules:[{required: true, message: 'Bắt buộc'}]},
    { name: 'activeDate', label: 'Ngày kích hoạt', type: 'date', rules:[{required: true, message: 'Bắt buộc'}]},
    { name: 'accessCode', label: 'Mã truy cập', rules:[{required: true, mesage: 'Bắt buộc'}]},
    { name: 'passCode', label: 'Mật khẩu truy cập', rules: [{required: true, message: 'Bắt buộc'}]}
]