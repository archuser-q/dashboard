import { Button } from "antd";
import { useDrawerStore } from "@/store/useDrawerStore";
import type { DataType } from "@/types";

interface Props {
  record: DataType;
}

export const ActionButton: React.FC<Props> = ({ record }) => {
  const { openDrawer } = useDrawerStore();

  const handleClick = () => {
    openDrawer(record); 
  };

  return <Button onClick={handleClick}>Xem chi tiết</Button>;
};
