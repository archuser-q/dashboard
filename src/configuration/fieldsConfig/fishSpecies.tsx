interface FieldConfig {
  key: string;
  label: string;
}

export const fieldsConfig: FieldConfig[] = [
  { key: 'key', label: 'Số' },
  { key: 'vietnameseName', label: 'Tên tiếng việt' },
  { key: 'englishName', label: 'Tên tiếng anh' },
  { key:'fishingGrounds', label:'Ngư trường' }
];
