import { PlusOutlined, WarningOutlined } from "@ant-design/icons";
import { Button, Modal, Row } from "antd";
import { TableProvider } from "context";
import { useService } from "hooks";
import { useCallback, useState } from "react";
import { AcademicYearModal, AcademicYearTable } from "../components";
import { useAcademicYear } from "../hooks";
import { AcademicYear } from "../models";
import { getAcademicYears } from "../services";

const AcademicYearPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [academicYears, loading, reload] = useService(getAcademicYears);
  const {
    disable,
    finish,
    finishWithPartials,
    loading: eventLoading,
  } = useAcademicYear({
    showInfo: "modal",
  });
  const [academicYear, setAcademicYear] = useState<AcademicYear>();

  const onCloseModal = useCallback((refresh: boolean) => {
    setIsOpenModal(false);
    refresh && reload();
  }, []);

  const onFinish = useCallback((id: number) => {
    Modal.confirm({
      icon: <WarningOutlined />,
      title: "Finalizar Año Lectivo",
      content:
        "¿Está seguro que desea finalizar el año lectivo?. Esta acción es irreversible",
      onOk: async () => {
        const { message, error } = await finish(id, "none");

        if (error && message.includes("Existen parciales en curso"))
          return Modal.confirm({
            icon: <WarningOutlined />,
            title: "¡Tiene parciales en curso!",
            content:
              "Existen parciales en curso en este año lectivo.\n\n¿Desea finalizar todos los parciales de este curso?",
            okText: "Si, finalizar todos",
            onOk: async () => {
              const { error } = await finishWithPartials(id);

              error || reload();
            },
            cancelText: "No",
          });

        Modal.error({
          title: "Error",
          content: message,
        });
      },
    });
  }, []);

  const onDisable = useCallback((id: number) => {
    Modal.confirm({
      icon: <WarningOutlined style={{ color: "red" }} />,
      title: "Anular Año Lectivo",
      content:
        "¿Está seguro que desea anular el año lectivo?. Esta acción es irreversible",
      onOk: async () => {
        const { error } = await disable(id);
        error || reload();
      },
    });
  }, []);

  const onNew = useCallback(() => {
    setAcademicYear(undefined);
    setIsOpenModal(true);
  }, []);

  return (
    <TableProvider reload={reload}>
      <AcademicYearModal
        open={isOpenModal}
        onClose={onCloseModal}
        academicYear={academicYear}
      />
      <Row justify="end">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          shape="round"
          onClick={onNew}
          style={{ margin: "1rem" }}
        >
          Generar Nuevo Año Lectivo
        </Button>
      </Row>
      <AcademicYearTable
        loading={loading || eventLoading}
        academicYears={academicYears}
        onPressCancel={onDisable}
        onPressFinish={onFinish}
      />
    </TableProvider>
  );
};
export default AcademicYearPage;
