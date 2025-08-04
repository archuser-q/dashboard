import { create } from 'zustand';

interface DrawerState {
  visible: boolean;
  selectedData: Record<string, any> | null;
  openDrawer: (data?: Record<string, any>) => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  visible: false,
  selectedData: null,
  openDrawer: (data) => set({ visible: true, selectedData: data ?? null }),
  closeDrawer: () => set({ visible: false, selectedData: null }),
}));