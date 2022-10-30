import { Course } from "../models";
import { useCourse } from "../hooks";
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
import { getAreas } from "../services";

export interface CourseModalProps {
  course?: Course;
  onClose: (refresh: boolean) => any;
  open: boolean;
}

const { Item } = Form;

const CourseModal: FC<CourseModalProps> = ({ course, onClose, open }) => {
  const { create, update, loading } = useCourse({ showInfo: "modal" });
  const [areas, serviceLoading] = useService(getAreas);

  const onFinish = useCallback(
    async (values: any) => {
      const { error } = course ? await update(values) : await create(values);
      if (!error) onClose && onClose(true);
    },
    [course]
  );

  return (
    <Modal
      title={course ? "Editar Asignatura" : "Nuevo Asignatura"}
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
          initialValues={course}
        >
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Item label="Descripción" name="idCourse" hidden>
                <Input />
              </Item>
              <Item
                label="Asignatura"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Por favor, introduce un usuario",
                  },
                ]}
              >
                <Input />
              </Item>
              <Item
                label="Activo"
                name="active"
                initialValue={course?.active || true}
              >
                <Switch defaultChecked={course?.active || true} />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="Area" name="idArea">
                <Select
                  showSearch
                  defaultValue={course?.area}
                  optionFilterProp="label"
                  autoClearSearchValue
                  placeholder="Seleccionar un rol"
                  options={areas?.map(({ description, idArea, active }) => ({
                    value: idArea,
                    disabled: !active,
                    label: description,
                  }))}
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
              {course ? "Guardar cambios" : "Crear usuario"}
            </Button>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default memo(CourseModal);
