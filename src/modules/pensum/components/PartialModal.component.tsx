import { Partial } from "../models";
import { usePartial } from "../hooks";
import { FC, memo, useCallback } from "react";
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Switch } from "antd";

export interface PartialModalProps {
  partial?: Partial;
  onClose: (refresh: boolean) => any;
  open: boolean;
}

const { Item } = Form;

const PartialModal: FC<PartialModalProps> = ({ partial, onClose, open }) => {
  const { create, update, loading } = usePartial({ showInfo: "modal" });

  const onFinish = useCallback(
    async (values: any) => {
      const { error } = partial ? await update(values) : await create(values);
      if (!error) onClose && onClose(true);
    },
    [partial]
  );

  return (
    <Modal
      title={partial ? "Editar Parcial" : "Nuevo Parcial"}
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
        initialValues={partial}
      >
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Item label="Descripción" name="idPartial" hidden>
              <Input />
            </Item>
            <Item
              label="Nombre del Parcial"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Por favor, introduce un nombre del parcial",
                },
              ]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Activo"
              name="active"
              initialValue={partial?.active || true}
            >
              <Switch defaultChecked={partial?.active || true} />
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
            {partial ? "Guardar cambios" : "Crear usuario"}
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default memo(PartialModal);
