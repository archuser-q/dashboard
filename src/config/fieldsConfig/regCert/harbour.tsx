export const fieldsConfig = [
    { name: 'name', label: 'Tên', rules: [{ required: true, message: 'Bắt buộc' }] },
    { name: 'address', label: 'Địa chỉ', rules: [{ required: true, message: 'Bắt buộc' }] },
    { name: 'GPS', label: 'Tọa độ GPS', rules: [{ required: true, message: 'Bắt buộc' }] },
    { name: 'businessModel', label: 'Loại hình',
        type: 'select',
        options: [
            {value:'Nhà nước', label:'Nhà nước'},
            {value:'Tư nhân', label:'Tư nhân'}
        ],
        rules: [{ required: true, message: 'Bắt buộc' }] },
    { name: 'nid', label: 'CCCD/Mã số DN', rules: [{ required: true, message: 'Bắt buộc' }] },
    { name: 'power', label: 'Công suất khai thác', rules: [{ required: true, message: 'Bắt buộc' }] },
    { name: 'identCode', label: 'Mã chỉ định', rules: [{ required: true, message: 'Bắt buộc' }] },
    { name: 'ownerName', label: 'Tên chủ/giám đốc cảng', rules: [{ required: true, message: 'Bắt buộc' }] },
    { name: 'ownerPhone', label: 'Số điện thoại chủ/giám đốc cảng', rules: [{ required: true, message: 'Bắt buộc' }] },
];
