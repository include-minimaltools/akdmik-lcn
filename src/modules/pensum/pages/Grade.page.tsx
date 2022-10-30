import { PlusOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import { useService } from "hooks";
import { Fragment, useCallback, useState } from "react";
import { GradeModal, GradeTable } from "../components";
import { useGrade } from "../hooks";
import { Grade } from "../models";
import { getGrades } from "../services";

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

  const onDelete = useCallback(async (idRole: number) => {
    const { error } = await remove(idRole);
    !error && reload();
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
          Crear área
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
