import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Row } from "antd";
import { useService } from "hooks";
import { Fragment, useCallback, useState } from "react";
import { ParentModal, ParentTable } from "../components";
import { useParent } from "../hooks";
import { Parent } from "../models";
import { getParents } from "../services";

const ParentPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [parents, loading, reload] = useService(getParents);
  const { remove, loading: eventLoading } = useParent({ showInfo: "modal" });
  const [parent, setParent] = useState<Parent>();

  const onCloseModal = useCallback((refresh: boolean) => {
    setIsOpenModal(false);
    refresh && reload();
  }, []);

  const onEdit = useCallback((parent: Parent) => {
    setParent(parent);
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
    setParent(undefined);
    setIsOpenModal(true);
  }, []);

  return (
    <Fragment>
      <ParentModal open={isOpenModal} onClose={onCloseModal} parent={parent} />
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
      <ParentTable
        loading={loading || eventLoading}
        parents={parents}
        onPressDelete={onDelete}
        onPressEdit={onEdit}
      />
    </Fragment>
  );
};
export default ParentPage;
