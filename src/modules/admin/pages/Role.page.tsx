import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Row } from "antd";
import { useService } from "hooks";
import { Role } from "models";
import { RoleModal, RoleTable } from "../components";
import { useRole } from "../hooks";
import { getRoles } from "../services";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
export interface RolePageInterface {}

const RolePage: React.FC<RolePageInterface> = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [role, setRole] = useState<Role>();
  const { remove, loading: eventLoading } = useRole({ showInfo: "modal" });
  const [roles, loading, reload] = useService(getRoles);

  const onCloseModal = useCallback((refresh: boolean) => {
    setIsOpenModal(false);
    refresh && reload();
  }, []);

  const onEdit = useCallback((role: Role) => {
    setRole(role);
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
    setRole(undefined);
    setIsOpenModal(true);
  }, []);

  return (
    <RolePageStyle>
      <RoleModal role={role} onClose={onCloseModal} open={isOpenModal} />
      <Row justify="end">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          shape="round"
          onClick={onNew}
          style={{ margin: "1rem" }}
        >
          Crear nuevo
        </Button>
      </Row>
      <RoleTable
        onPressEdit={onEdit}
        onPressDelete={onDelete}
        roles={roles}
        loading={loading || eventLoading}
      />
    </RolePageStyle>
  );
};

export const RolePageStyle = styled.div``;

export default RolePage;
