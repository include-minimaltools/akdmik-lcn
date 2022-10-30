import { Area } from "../models";
import { useArea } from "../hooks";
import { FC, memo, useCallback } from "react";
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Switch } from "antd";

export interface AreaModalProps {
  area?: Area;
  onClose: (refresh: boolean) => any;
  open: boolean;
}

const { Item } = Form;

const AreaModal: FC<AreaModalProps> = ({ area, onClose, open }) => {
  const { create, update, loading } = useArea({ showInfo: "modal" });

  const onFinish = useCallback(
    async (values: any) => {
      const { error } = area ? await update(values) : await create(values);
      if (!error) onClose && onClose(true);
    },
    [area]
  );

  return (
    <Modal
      title={area ? "Editar Área" : "Nuevo Área"}
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
        initialValues={area}
      >
        <Row gutter={[20, 20]}>
          <Col span={20}>
            <Item label="Descripción" name="idArea" hidden>
              <Input />
            </Item>
            <Item
              label="Descripción"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Por favor, introduce una descripción",
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
              initialValue={area?.active || true}
            >
              <Switch defaultChecked={area?.active || true} />
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
            {area ? "Guardar cambios" : "Crear usuario"}
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default memo(AreaModal);
