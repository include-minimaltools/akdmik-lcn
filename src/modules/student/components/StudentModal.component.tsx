import { Student } from "../models";
import { useStudent } from "../hooks";
import { FC, memo, useCallback } from "react";
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Switch } from "antd";

export interface StudentModalProps {
  student?: Student;
  onClose: (refresh: boolean) => any;
  open: boolean;
}

const { Item } = Form;

const StudentModal: FC<StudentModalProps> = ({ student, onClose, open }) => {
  const { create, update, loading } = useStudent({ showInfo: "modal" });

  const onFinish = useCallback(
    async (values: any) => {
      const { error } = student ? await update(values) : await create(values);
      if (!error) onClose && onClose(true);
    },
    [student]
  );

  return (
    <Modal
      title={student ? "Editar Área" : "Nuevo Área"}
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
        initialValues={student}
      >
        <Row gutter={[20, 20]}>
          <Col span={20}>
            <Item label="Descripción" name="idStudent" hidden>
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
          <Col span={4}></Col>
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
            {student ? "Guardar cambios" : "Crear usuario"}
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default memo(StudentModal);
