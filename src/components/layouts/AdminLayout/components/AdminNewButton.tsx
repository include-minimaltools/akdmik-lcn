import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const AdminNewButton = () => {
  return (
    <Button type="primary" icon={<PlusOutlined />} shape="round">
      Crear nuevo
    </Button>
  );
};

export default AdminNewButton;
