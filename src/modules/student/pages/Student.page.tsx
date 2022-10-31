import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Row } from "antd";
import { useService } from "hooks";
import { Fragment, useCallback, useState } from "react";
import { StudentModal, StudentTable } from "../components";
import { useStudent } from "../hooks";
import { Student } from "../models";
import { getStudents } from "../services";

const StudentPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [students, loading, reload] = useService(getStudents);
  const { remove, loading: eventLoading } = useStudent({ showInfo: "modal" });
  const [student, setStudent] = useState<Student>();

  const onCloseModal = useCallback((refresh: boolean) => {
    setIsOpenModal(false);
    refresh && reload();
  }, []);

  const onEdit = useCallback((student: Student) => {
    setStudent(student);
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
    setStudent(undefined);
    setIsOpenModal(true);
  }, []);

  return (
    <Fragment>
      <StudentModal open={isOpenModal} onClose={onCloseModal} student={student} />
      <Row justify="end">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          shape="round"
          onClick={onNew}
          style={{ margin: "1rem" }}
        >
          Añadir Familiar
        </Button>
      </Row>
      <StudentTable
        loading={loading || eventLoading}
        students={students}
        onPressDelete={onDelete}
        onPressEdit={onEdit}
      />
    </Fragment>
  );
};
export default StudentPage;
