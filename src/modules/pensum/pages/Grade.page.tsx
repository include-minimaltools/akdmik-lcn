import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Row } from "antd";
import { useService } from "hooks";
import { Fragment, useCallback, useState } from "react";
import { GradeModal, GradeTable } from "../components";
import { useGrade } from "../hooks";
import { Grade } from "models";
import { getGrades } from "services";

const GradePage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [grades, loading, reload] = useService(getGrades);
  const { remove, loading: eventLoading } = useGrade({ showInfo: "modal" });
  const [grade, setGrade] = useState<Grade>();

  const onCloseModal = useCallback((refresh: boolean) => {
    setIsOpenModal(false);
    refresh && reload();
  }, []);

  const onEdit = useCallback((grade: Grade) => {
    setGrade(grade);
    setIsOpenModal(true);
  }, []);

  const onDelete = useCallback((id: number) => {
    Modal.confirm({
      title: "Eliminar registro",
      content: "¿Esta seguro que desea eliminar el registro?",
      onOk: async () => {
        const { error } = await remove(id);
        !error && reload();
      },
    });
  }, []);

  const onNew = useCallback(() => {
    setGrade(undefined);
    setIsOpenModal(true);
  }, []);

  return (
    <Fragment>
      <GradeModal open={isOpenModal} onClose={onCloseModal} grade={grade} />
      <Row justify="end">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          shape="round"
          onClick={onNew}
          style={{ margin: "1rem" }}
        >
          Crear Grado
        </Button>
      </Row>
      <GradeTable
        loading={loading || eventLoading}
        grades={grades}
        onPressDelete={onDelete}
        onPressEdit={onEdit}
      />
    </Fragment>
  );
};
export default GradePage;
