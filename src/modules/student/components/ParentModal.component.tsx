import { Parent } from "../models";
import { useParent } from "../hooks";
import { FC, memo, useCallback } from "react";
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Switch,
} from "antd";
import { useService } from "hooks";
import { getRelationships } from "../services";

export interface ParentModalProps {
  parent?: Parent;
  onClose: (refresh: boolean) => any;
  open: boolean;
}

const { Item } = Form;

const ParentModal: FC<ParentModalProps> = ({ parent, onClose, open }) => {
  const { create, update, loading } = useParent({ showInfo: "modal" });
  const [relationships, serviceLoading] = useService(getRelationships);

  const onFinish = useCallback(
    async (values: any) => {
      const { error } = parent ? await update(values) : await create(values);
      if (!error) onClose && onClose(true);
    },
    [parent]
  );

  return (
    <Modal
      title={parent ? "Editar Familiar" : "Nuevo Familiar"}
      closable={!loading}
      maskClosable={!loading}
      keyboard={!loading}
      onCancel={() => onClose(false)}
      footer={false}
      destroyOnClose
      open={open}
    >
      <Spin spinning={serviceLoading}>
        <Form
          layout="vertical"
          scrollToFirstError
          onFinish={onFinish}
          initialValues={parent}
        >
          <Row gutter={[20, 20]}>
            <Col span={20}>
              <Item label="Descripción" name="idParent" hidden>
                <Input />
              </Item>
              <Item
                label="Nombre de Familiar"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Por favor, introduce un nombre",
                  },
                ]}
              >
                <Input />
              </Item>
            </Col>
            <Col span={4}>
              <Item
                label="Activo"
                name="active"
                initialValue={parent?.active || true}
              >
                <Switch defaultChecked={parent?.active || true} />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="Documento de identidad" name="identityDocument">
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Correo electrónico"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Debe ingresar un correo electrónico válido",
                  },
                ]}
              >
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="Número Celular" name="phoneNumber">
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Parentesco"
                name="idRelationship"
                rules={[
                  {
                    required: true,
                    message:
                      "Debe seleccionar el tipo de parentesco que tiene este familiar",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="label"
                  autoClearSearchValue
                  placeholder="Seleccionar un rol"
                  options={relationships?.map(
                    ({ description, idRelationship, active }) => ({
                      value: idRelationship,
                      disabled: !active,
                      label: description,
                    })
                  )}
                />
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
              {parent ? "Guardar cambios" : "Crear usuario"}
            </Button>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default memo(ParentModal);
