import { Grade } from "../models";
import { useGrade } from "../hooks";
import { FC, memo, useCallback } from "react";
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Switch } from "antd";

export interface GradeModalProps {
  grade?: Grade;
  onClose: (refresh: boolean) => any;
  open: boolean;
}

const { Item } = Form;

const GradeModal: FC<GradeModalProps> = ({ grade, onClose, open }) => {
  const { create, update, loading } = useGrade({ showInfo: "modal" });

  const onFinish = useCallback(
    async (values: any) => {
      const { error } = grade ? await update(values) : await create(values);
      if (!error) onClose && onClose(true);
    },
    [grade]
  );

  return (
    <Modal
      title={grade ? "Editar Grado" : "Nuevo Grado"}
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
        initialValues={grade}
      >
        <Row gutter={[20, 20]}>
          <Col flex={1}>
            <Item label="Descripción" name="idGrade" hidden>
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
            <Item
              label="Activo"
              name="active"
              initialValue={grade?.active || true}
            >
              <Switch defaultChecked={grade?.active || true} />
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
            {grade ? "Guardar cambios" : "Crear usuario"}
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default memo(GradeModal);
