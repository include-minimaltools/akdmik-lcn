import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Switch } from "antd";
import { Role } from "models";
import { FC, memo, useCallback } from "react";
import { useRole } from "../hooks";

export interface UserModalProps {
  role?: Role;
  onClose: (refresh: boolean) => any;
  open: boolean;
}

const { Item } = Form;

const RoleModal: FC<UserModalProps> = ({ role, onClose, open }) => {
  const { create, update, loading } = useRole({ showInfo: "modal" });

  const onFinish = useCallback(
    async (values: any) => {
      const { error } = role ? await update(values) : await create(values);
      if (!error) onClose && onClose(true);
    },
    [role]
  );

  return (
    <Modal
      title={role ? "Editar Usuario" : "Nuevo Usuario"}
      closable={!loading}
      maskClosable={!loading}
      keyboard={!loading}
      onCancel={() => onClose(false)}
      footer={false}
      destroyOnClose
      open={open}
    >
      <Form
        layout="vertical"
        scrollToFirstError
        onFinish={onFinish}
        initialValues={role}
      >
        <Row gutter={[20, 20]}>
          <Col flex={1}>
            <Item
              label="Descripción"
              name="idRole"
              hidden
            >
              <Input />
            </Item>
            <Item
              label="Descripción"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Por favor, introduce un usuario",
                },
              ]}
            >
              <Input />
            </Item>
          </Col>
          <Col flex={1}>
            <Item label="Activo" name="active">
              <Switch defaultChecked={role?.active} />
            </Item>
          </Col>
        </Row>
        <Row justify="space-around">
          <Button icon={<LeftOutlined />} onClick={() => onClose(false)}>
            Cancelar
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            icon={<SaveOutlined />}
            loading={loading}
          >
            {role ? "Guardar cambios" : "Crear usuario"}
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default memo(RoleModal);
