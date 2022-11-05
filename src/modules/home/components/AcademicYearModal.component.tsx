import { AcademicYear } from "../models";
import { useAcademicYear } from "../hooks";
import { FC, memo, useCallback } from "react";
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
} from "antd";
import { useService } from "hooks";
import { getPartials } from "modules/pensum/services";

export interface AcademicYearModalProps {
  academicYear?: AcademicYear;
  onClose: (refresh: boolean) => any;
  open: boolean;
}

const { Item } = Form;

const AcademicYearModal: FC<AcademicYearModalProps> = ({ onClose, open }) => {
  const { create, loading } = useAcademicYear({ showInfo: "modal" });
  const [partials, serviceLoading] = useService(getPartials);

  const onFinish = useCallback(async (values: any) => {
    const { error } = await create({ ...values, year: values.year.year() });
    
    if (!error) onClose && onClose(true);
  }, []);

  return (
    <Modal
      title="Nuevo Parcial"
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
          // initialValues={academicYear}
        >
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Item label="Descripción" name="idAcademicYear" hidden>
                <Input />
              </Item>
              <Item
                label="Año Lectivo"
                name="year"
                rules={[
                  {
                    required: true,
                    message: "Por favor, introduce el año lectivo ",
                  },
                ]}
              >
                <DatePicker picker="year" style={{ width: "100%" }} />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Parciales"
                name="idPartials"
                rules={[
                  {
                    required: true,
                    message:
                      "Por favor, seleccione los parciales que tendrá el año lectivo",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  mode="multiple"
                  autoClearSearchValue
                  optionFilterProp="label"
                  placeholder="Seleccionar un rol"
                  options={partials?.map(({ name, idPartial, active }) => ({
                    value: idPartial,
                    disabled: !active,
                    label: name,
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
              Generar Año Lectivo
            </Button>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default memo(AcademicYearModal);
