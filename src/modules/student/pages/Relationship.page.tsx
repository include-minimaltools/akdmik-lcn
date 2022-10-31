import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Row } from "antd";
import { useService } from "hooks";
import { Fragment, useCallback, useState } from "react";
import { RelationshipModal, RelationshipTable } from "../components";
import { useRelationship } from "../hooks";
import { Relationship } from "../models";
import { getRelationships } from "../services";

const RelationshipPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [relationships, loading, reload] = useService(getRelationships);
  const { remove, loading: eventLoading } = useRelationship({ showInfo: "modal" });
  const [relationship, setRelationship] = useState<Relationship>();

  const onCloseModal = useCallback((refresh: boolean) => {
    setIsOpenModal(false);
    refresh && reload();
  }, []);

  const onEdit = useCallback((relationship: Relationship) => {
    setRelationship(relationship);
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
    setRelationship(undefined);
    setIsOpenModal(true);
  }, []);

  return (
    <Fragment>
      <RelationshipModal open={isOpenModal} onClose={onCloseModal} relationship={relationship} />
      <Row justify="end">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          shape="round"
          onClick={onNew}
          style={{ margin: "1rem" }}
        >
          Crear Parentesco
        </Button>
      </Row>
      <RelationshipTable
        loading={loading || eventLoading}
        relationships={relationships}
        onPressDelete={onDelete}
        onPressEdit={onEdit}
      />
    </Fragment>
  );
};
export default RelationshipPage;
