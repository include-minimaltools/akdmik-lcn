import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  ModalProps,
  Row,
  Select,
  Spin,
} from "antd";
import { useService } from "hooks";
import { User } from "models";
import { FC, memo, useCallback } from "react";
import { useUser } from "../hooks";
import { getRoles } from "../services";

export interface UserModalProps {
  user?: User;
  onClose: (refresh: boolean) => any;
  open: boolean;
}

const { Item } = Form;

const UserModal: FC<UserModalProps> = ({ user, onClose, open }) => {
  const [roles, loadingRoles] = useService(getRoles);
  const { create, update, loading } = useUser({ showInfo: "modal" });

  const onFinish = useCallback(
    async (values: any) => {
      const { error } = user ? await update(values) : await create(values);
      if (!error) onClose && onClose(true);
    },
    [user]
  );

  return (
    <Modal
      title={user ? "Editar Usuario" : "Nuevo Usuario"}
      closable={!loading}
      maskClosable={!loading}
      keyboard={!loading}
      onCancel={() => onClose(false)}
      footer={false}
      destroyOnClose
      open={open}
    >
      <Spin spinning={loadingRoles}>
        <Form
          layout="vertical"
          scrollToFirstError
          onFinish={onFinish}
          initialValues={user}
        >
          <Row gutter={[20, 20]}>
            <Col flex={1}>
              <Item
                label="Usuario"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Por favor, introduce un usuario",
                  },
                ]}
              >
                <Input readOnly={!!user} />
              </Item>
              <Item
                label="Rol"
                name="idRole"
                rules={[
                  {
                    required: true,
                    message: "Por favor, escoge un rol para el usuario",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="label"
                  autoClearSearchValue
                  placeholder="Seleccionar un rol"
                  options={roles?.map(({ description, idRole, active }) => ({
                    value: idRole,
                    disabled: !active,
                    label: description,
                  }))}
                />
              </Item>
              {!!user || (
                <>
                  <Item
                    label="Contraseña"
                    name="password"
                    rules={[
                      {
                        required: !user,
                        message: "Por favor, introduce una contraseña",
                      },
                    ]}
                  >
                    <Input.Password value="" />
                  </Item>
                  <Item
                    label="Confirmar Contraseña"
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, confirma la contraseña",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value)
                            return Promise.resolve();

                          return Promise.reject(
                            new Error("Las contraseñas no coinciden")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Item>
                </>
              )}
            </Col>
            <Col flex={1}>
              <Item
                label="Estado"
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Seleccione un estado",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="label"
                  autoClearSearchValue
                  placeholder="Seleccione un estado"
                  options={[
                    { label: "Activo", value: "A" },
                    { label: "Inactivo", value: "I" },
                  ]}
                />
              </Item>
              <Item label="Nombre del usuario" name="firstName">
                <Input />
              </Item>
              <Item label="Apellido del usuario" name="lastName">
                <Input />
              </Item>
              <Item label="Correo" name="email">
                <Input />
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
              {user ? "Guardar cambios" : "Crear usuario"}
            </Button>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default memo(UserModal);
