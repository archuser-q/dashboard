// store/modalStore.ts
import { create } from 'zustand';
import type { DataType } from '@/types/registrationAndCertificate/harbour';

interface ModalState {
  // Column modal
  isColumnModalVisible: boolean;
  setColumnModalVisible: (visible: boolean) => void;
  showColumnModal: () => void;
  hideColumnModal: () => void;

  // Add/Edit modal
  isAddEditModalVisible: boolean;
  isEditMode: boolean;
  selectedRecord: DataType | null;
  setAddEditModalVisible: (visible: boolean) => void;
  showAddModal: () => void;
  showEditModal: (record: DataType) => void;
  hideAddEditModal: () => void;

  // Detail modal
  isDetailModalVisible: boolean;
  detailRecord: DataType | null;
  setDetailModalVisible: (visible: boolean) => void;
  showDetailModal: (record: DataType) => void;
  hideDetailModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  // Column modal state
  isColumnModalVisible: false,
  setColumnModalVisible: (visible) => set({ isColumnModalVisible: visible }),
  showColumnModal: () => set({ isColumnModalVisible: true }),
  hideColumnModal: () => set({ isColumnModalVisible: false }),

  // Add/Edit modal state
  isAddEditModalVisible: false,
  isEditMode: false,
  selectedRecord: null,
  setAddEditModalVisible: (visible) => set({ isAddEditModalVisible: visible }),
  showAddModal: () => set({ 
    isAddEditModalVisible: true, 
    isEditMode: false, 
    selectedRecord: null 
  }),
  showEditModal: (record) => set({ 
    isAddEditModalVisible: true, 
    isEditMode: true, 
    selectedRecord: record 
  }),
  hideAddEditModal: () => set({ 
    isAddEditModalVisible: false, 
    isEditMode: false, 
    selectedRecord: null 
  }),

  // Detail modal state
  isDetailModalVisible: false,
  detailRecord: null,
  setDetailModalVisible: (visible) => set({ isDetailModalVisible: visible }),
  showDetailModal: (record) => set({ 
    isDetailModalVisible: true, 
    detailRecord: record 
  }),
  hideDetailModal: () => set({ 
    isDetailModalVisible: false, 
    detailRecord: null 
  }),
}));