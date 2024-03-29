import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Row } from "antd";
import { useService } from "hooks";
import { Fragment, useCallback, useState } from "react";
import { CourseModal, CourseTable } from "../components";
import { useCourse } from "../hooks";
import { Course } from "../models";
import { getCourses } from "../services";

const CoursePage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [courses, loading, reload] = useService(getCourses);
  const { remove, loading: eventLoading } = useCourse({ showInfo: "modal" });
  const [course, setCourse] = useState<Course>();

  const onCloseModal = useCallback((refresh: boolean) => {
    setIsOpenModal(false);
    refresh && reload();
  }, []);

  const onEdit = useCallback((course: Course) => {
    setCourse(course);
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
    setCourse(undefined);
    setIsOpenModal(true);
  }, []);

  return (
    <Fragment>
      <CourseModal open={isOpenModal} onClose={onCloseModal} course={course} />
      <Row justify="end">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          shape="round"
          onClick={onNew}
          style={{ margin: "1rem" }}
        >
          Crear Asignatura
        </Button>
      </Row>
      <CourseTable
        loading={loading || eventLoading}
        courses={courses}
        onPressDelete={onDelete}
        onPressEdit={onEdit}
      />
    </Fragment>
  );
};
export default CoursePage;
