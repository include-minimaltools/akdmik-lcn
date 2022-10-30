import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Row } from "antd";
import { useService } from "hooks";
import { Fragment, useCallback, useState } from "react";
import { PartialModal, PartialTable } from "../components";
import { usePartial } from "../hooks";
import { Partial } from "../models";
import { getPartials } from "../services";

const PartialPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [partials, loading, reload] = useService(getPartials);
  const { remove, loading: eventLoading } = usePartial({ showInfo: "modal" });
  const [partial, setPartial] = useState<Partial>();

  const onCloseModal = useCallback((refresh: boolean) => {
    setIsOpenModal(false);
    refresh && reload();
  }, []);

  const onEdit = useCallback((partial: Partial) => {
    setPartial(partial);
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
    setPartial(undefined);
    setIsOpenModal(true);
  }, []);

  return (
    <Fragment>
      <PartialModal open={isOpenModal} onClose={onCloseModal} partial={partial} />
      <Row justify="end">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          shape="round"
          onClick={onNew}
          style={{ margin: "1rem" }}
        >
          Crear Parcial
        </Button>
      </Row>
      <PartialTable
        loading={loading || eventLoading}
        partials={partials}
        onPressDelete={onDelete}
        onPressEdit={onEdit}
      />
    </Fragment>
  );
};
export default PartialPage;
