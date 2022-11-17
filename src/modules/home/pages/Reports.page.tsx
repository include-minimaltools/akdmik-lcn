import { PrinterFilled } from "@ant-design/icons";
import { Button, Form, Row, Select } from "antd";
import { useService, useStudent } from "hooks";
import { ApiResponse } from "models";
import { getStudents } from "services";
import { api } from "utils";
import { getAcademicYears } from "../services";

const { Item } = Form;

const extOptions = [
  { ext: "xlsx", name: "Excel" },
  { ext: "docx", name: "Word" },
  { ext: "pdf", name: "Pdf" },
];

const ReportsPage = () => {
  const [academicYears, academicYearsLoading] = useService(getAcademicYears);
  const [student, studentLoading] = useService(getStudents);
  const { generateSchoolReport, loading } = useStudent({
    showInfo: "message",
  });

  const onFinish = async (values: any) => {
    const { data } = await api.get(
      `Student/SchoolReport/${values.idStudent}_${values.year}.${values.extension}`,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${values.idStudent}_${values.year}.${values.extension}`
    );
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <Form onFinish={onFinish} layout="vertical">
        <Row justify="space-around" style={{ margin: "2rem" }} align="middle">
          <Item
            name="year"
            label="Año Lectivo"
            rules={[{ required: true, message: "Seleccione el año lectivo" }]}
          >
            <Select
              style={{ minWidth: "20rem" }}
              showSearch
              allowClear
              autoClearSearchValue
              loading={academicYearsLoading}
              optionFilterProp="label"
              placeholder="Seleccionar un año lectivo"
              options={academicYears?.map(
                ({ year, idAcademicYear, status }) => ({
                  value: year,
                  disabled: status == "C",
                  label: year,
                })
              )}
            />
          </Item>
          <Item
            name="idStudent"
            label="Carnet de Estudiante"
            rules={[{ required: true, message: "Seleccione el estudiante" }]}
          >
            <Select
              style={{ minWidth: "20rem" }}
              showSearch
              allowClear
              autoClearSearchValue
              loading={studentLoading}
              optionFilterProp="label"
              placeholder="Seleccionar un año lectivo"
              options={student?.map(
                ({ status, idStudent, name, lastName }) => ({
                  value: idStudent,
                  disabled: status == "I",
                  label: `${idStudent} - ${name} ${lastName}`,
                })
              )}
            />
          </Item>
          <Item name="extension" initialValue="pdf" label="Tipo">
            <Select
              showSearch
              allowClear
              autoClearSearchValue
              optionFilterProp="label"
              placeholder="Tipo"
              options={extOptions?.map(({ ext, name }) => ({
                value: ext,
                label: name,
              }))}
            />
          </Item>
          <Button
            htmlType="submit"
            type="primary"
            icon={<PrinterFilled />}
            shape="round"
            loading={loading}
          >
            Generar Boletín de Notas
          </Button>
        </Row>
      </Form>
    </>
  );
};
export default ReportsPage;
