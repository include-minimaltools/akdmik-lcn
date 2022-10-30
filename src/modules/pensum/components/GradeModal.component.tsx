import { Grade } from "../models";
import { useGrade } from "../hooks";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Spin,
  Switch,
  Transfer,
} from "antd";
import { useService } from "hooks";
import { getCourses } from "../services";

export interface GradeModalProps {
  grade?: Grade;
  onClose: (refresh: boolean) => any;
  open: boolean;
}

const { Item } = Form;

const GradeModal: FC<GradeModalProps> = ({ grade, onClose, open }) => {
  const [targetKeys, setTargetKeys] = useState<number[]>([]);
  const { createWithCourses, updateWithCourses, loading } = useGrade({
    showInfo: "modal",
  });
  const [courses, serviceLoading] = useService(getCourses);
  console.log(grade);

  useEffect(() => {
    if (grade?.idCourses) {
      setTargetKeys(grade.idCourses);
    }
  }, [grade]);

  const onFinish = useCallback(
    async (values: any) => {
      const { error } = grade
        ? await updateWithCourses({ ...values, idCourses: targetKeys })
        : await createWithCourses({
            ...values,
            idCourses: targetKeys,
          });
      if (!error) onClose && onClose(true);
    },
    [grade, targetKeys]
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
      <Spin spinning={serviceLoading}>
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
                    message: "Por favor, introduce una descripción",
                  },
                ]}
              >
                <Input />
              </Item>
            </Col>
            <Col flex={0.1}>
              <Item
                label="Activo"
                name="active"
                initialValue={grade?.active || true}
              >
                <Switch defaultChecked={grade?.active || true} />
              </Item>
            </Col>
          </Row>
          <Row justify="center">
            <Item label="Asignaturas de este grado" name="courses">
              <Transfer
                dataSource={courses?.map(
                  ({ name, active, area, idCourse }) => ({
                    description: area,
                    disabled: !active,
                    key: idCourse,
                    title: name,
                  })
                )}
                titles={["Disponibles", "Asignadas"]}
                listStyle={{ width: "13.5rem" }}
                //@ts-ignore
                targetKeys={targetKeys}
                //@ts-ignore
                onChange={(e) => setTargetKeys(e)}
                render={(item) => `${item.key}. ${item.title}`}
              />
            </Item>
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
      </Spin>
    </Modal>
  );
};

export default memo(GradeModal);
