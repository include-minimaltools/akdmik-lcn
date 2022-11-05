import { Student } from "models";
import { useStudent } from "hooks";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Switch,
  Tabs,
  Transfer,
} from "antd";
import moment from "moment";
import { useService } from "hooks";
import { getParents } from "../services";

export interface StudentModalProps {
  student?: Student;
  onClose: (refresh: boolean) => any;
  open: boolean;
}

const { Item } = Form;

const StudentModal: FC<StudentModalProps> = ({ student, onClose, open }) => {
  const { createWithParents, updateWithParents, loading } = useStudent({
    showInfo: "modal",
  });
  const [parents, serviceLoading] = useService(getParents);
  const [targetKeys, setTargetKeys] = useState<number[]>([]);

  useEffect(() => {
    setTargetKeys(student?.idParents || []);
  }, [student]);

  const onFinish = useCallback(
    async (values: any) => {
      const { error } = student
        ? await updateWithParents({ ...values, idParents: targetKeys })
        : await createWithParents({ ...values, idParents: targetKeys });
      if (!error) onClose && onClose(true);
    },
    [student, targetKeys]
  );

  const birthDate = student?.birthDate ? moment(student.birthDate) : undefined;

  return (
    <Modal
      title={student ? "Editar Estudiante" : "Nuevo Estudiante"}
      closable={!loading}
      maskClosable={!loading}
      keyboard={!loading}
      onCancel={() => onClose(false)}
      destroyOnClose
      width={720}
      footer={false}
      open={open}
    >
      <Form
        layout="vertical"
        scrollToFirstError
        onFinish={onFinish}
        initialValues={{ ...student, birthDate }}
      >
        <Tabs defaultActiveKey="1" tabPosition="left">
          <Tabs.TabPane tab="Información" key="1">
            <Row gutter={[20, 0]}>
              <Col span={12}>
                <Item
                  name="idStudent"
                  label="Código de Estudiante"
                  rules={[
                    {
                      required: true,
                      message: "Ingrese un código de estudiante",
                    },
                  ]}
                >
                  <Input />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Nombre"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "El estudiante debe tener un nombre",
                    },
                  ]}
                >
                  <Input />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Apellido"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "El estudiante debe tener un apellido",
                    },
                  ]}
                >
                  <Input />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Género"
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "Se debe especificar el género",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    optionFilterProp="label"
                    autoClearSearchValue
                    defaultActiveFirstOption={true}
                    placeholder="Seleccionar un género"
                    options={[
                      {
                        value: "M",
                        label: "Masculino",
                      },
                      {
                        value: "F",
                        label: "Femenino",
                      },
                    ]}
                  />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Fecha de Nacimiento"
                  name="birthDate"
                  rules={[
                    {
                      required: true,
                      message:
                        "Debe ingresar la fecha de nacimiento del estudiante",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Cédula o Partida de Nacimiento"
                  name="identityDocument"
                >
                  <Input />
                </Item>
              </Col>
              <Col span={12}>
                <Item label="Dirección" name="address">
                  <Input />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Estado"
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: "Debe seleccionar el estado del estudiante",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    optionFilterProp="label"
                    autoClearSearchValue
                    defaultActiveFirstOption={true}
                    placeholder="Seleccionar un estado"
                    options={[
                      {
                        value: "I",
                        label: "Inactivo",
                      },
                      {
                        value: "A",
                        label: "Activo",
                      },
                      {
                        value: "G",
                        label: "Graduado",
                      },
                    ]}
                  />
                </Item>
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Familiares" key="2">
            <Spin spinning={serviceLoading}>
              <Row justify="center">
                <Transfer
                  dataSource={parents?.map(({ name, active, idParent }) => ({
                    disabled: !active,
                    key: idParent,
                    title: name,
                  }))}
                  titles={["Disponibles", "Asignadas"]}
                  listStyle={{ width: "13.5rem" }}
                  //@ts-ignore
                  targetKeys={targetKeys}
                  //@ts-ignore
                  onChange={(e) => setTargetKeys(e)}
                  render={(item) => `${item.key}. ${item.title}`}
                />
              </Row>
            </Spin>
          </Tabs.TabPane>
        </Tabs>
        <Row justify="space-around" style={{ marginTop: "1rem" }}>
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
