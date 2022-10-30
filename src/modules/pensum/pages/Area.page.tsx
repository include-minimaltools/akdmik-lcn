import { PlusOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import { useService } from "hooks";
import { Fragment, useCallback, useState } from "react";
import { AreaModal, AreaTable } from "../components";
import { useArea } from "../hooks";
import { Area } from "../models";
import { getAreas } from "../services";

const AreaPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [areas, loading, reload] = useService(getAreas);
  const { remove, loading:eventLoading } = useArea({ showInfo: "modal" });
  const [area, setArea] = useState<Area>();

  const onCloseModal = useCallback((refresh: boolean) => {
    setIsOpenModal(false);
    refresh && reload();
  }, []);

  const onEdit = useCallback((area: Area) => {
    setArea(area);
    setIsOpenModal(true);
  }, []);

  const onDelete = useCallback(async (idRole: number) => {
    const { error } = await remove(idRole);
    !error && reload();
  }, []);

  const onNew = useCallback(() => {
    setArea(undefined);
    setIsOpenModal(true);
  }, []);

  return (
    <Fragment>
      <AreaModal open={isOpenModal} onClose={onCloseModal} area={area} />
      <Row justify="end">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          shape="round"
          onClick={onNew}
          style={{ margin: "1rem" }}
        >
          Crear Área
        </Button>
      </Row>
      <AreaTable
        loading={loading || eventLoading}
        areas={areas}
        onPressDelete={onDelete}
        onPressEdit={onEdit}
      />
    </Fragment>
  );
};
export default AreaPage;
