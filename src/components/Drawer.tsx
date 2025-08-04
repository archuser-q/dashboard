import { Drawer } from 'antd';
import { useDrawerStore } from '@/store/useDrawerStore';

export const ReusableDrawer = () => {
  const { visible, closeDrawer } = useDrawerStore();
  
  return (
    <Drawer
      title='Generic drawer'
      open={visible}
      onClose={closeDrawer}
      width={600}
    >
        Test
    </Drawer>
  );
};