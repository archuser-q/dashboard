import { create } from 'zustand';

interface DrawerState {
  visible: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  visible: false,
  openDrawer: () => set({ visible: true}),
  closeDrawer: () => set({ visible: false}),
}));