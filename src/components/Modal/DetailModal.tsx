// components/DetailModal.tsx
import React from 'react';
import { Modal, Button, Descriptions, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useModalStore } from '@/store/useModalStore';
import { type DataType } from '@/types/registrationAndCertificate/harbour';

interface DetailModalProps {
  onDelete: (record: DataType) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ onDelete }) => {
  const { 
    isDetailModalVisible, 
    detailRecord, 
    hideDetailModal, 
    showEditModal 
  } = useModalStore();

  const handleEdit = () => {
    if (detailRecord) {
      showEditModal(detailRecord);
      hideDetailModal();
    }
  };

  const handleDelete = () => {
    if (detailRecord) {
      Modal.confirm({
        title: 'Xác nhận xóa',
        content: `Bạn có chắc chắn muốn xóa cảng "${detailRecord.name}" không?`,
        okText: 'Xóa',
        cancelText: 'Hủy',
        okType: 'danger',
        onOk: () => {
          onDelete(detailRecord);
          hideDetailModal();
          message.success('Xóa thông tin cảng thành công!');
        }
      });
    }
  };

  return (
    <Modal
      title="Thông tin chi tiết cảng"
      open={isDetailModalVisible}
      onCancel={hideDetailModal}
      width={800}
      footer={[
        <Button key="cancel" onClick={hideDetailModal}>
          Đóng
        </Button>,
        <Button
          key="edit"
          type="primary"
          icon={<EditOutlined />}
          onClick={handleEdit}
        >
          Chỉnh sửa
        </Button>,
        <Button
          key="delete"
          danger
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        >
          Xóa
        </Button>
      ]}
    >
      {detailRecord && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Số">{detailRecord.key}</Descriptions.Item>
          <Descriptions.Item label="Tên cảng">{detailRecord.name}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{detailRecord.address}</Descriptions.Item>
          <Descriptions.Item label="Tọa độ GPS">{detailRecord.gpsCoordinate}</Descriptions.Item>
          <Descriptions.Item label="Loại hình">{detailRecord.businessModel}</Descriptions.Item>
          <Descriptions.Item label="CCCD/Mã số DN">{detailRecord.nationalID}</Descriptions.Item>
          <Descriptions.Item label="Công suất khai thác">{detailRecord.power}</Descriptions.Item>
          <Descriptions.Item label="Mã chỉ định">{detailRecord.referenceCode}</Descriptions.Item>
          <Descriptions.Item label="Họ tên chủ/giám đốc cảng">{detailRecord.ownerName}</Descriptions.Item>
          <Descriptions.Item label="Điện thoại chủ/giám đốc cảng">{detailRecord.ownerPhone}</Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};