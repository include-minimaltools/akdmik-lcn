import { FC } from "react";
import { AcademicYearPartial } from "../models";
import { ColumnsType } from "models";
import { Badge, Button, Row, Table, TableProps, Tooltip } from "antd";
import {
  AuditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useAcademicYear } from "../hooks";
import { useTable } from "context";
import { useNavigate } from "react-router-dom";
import HomeRoutes from "../home.routes";

export type academicYearPartialTableProps = {
  academicYearPartials?: AcademicYearPartial[];
  loading: boolean;
  disabled?: boolean;
};

const AcademicYearPartialTable: FC<academicYearPartialTableProps> = ({
  academicYearPartials,
  loading,
  disabled = true,
}) => {
  const { reload } = useTable();
  const navigate = useNavigate();
  const {
    finishPartial,
    disablePartial,
    reactivatePartial,
    loading: eventLoading,
  } = useAcademicYear({
    showInfo: "modal",
  });

  const columns: ColumnsType<AcademicYearPartial> = [
    {
      title: "Parcial",
      dataIndex: "name",
    },
    {
      title: "Estado",
      dataIndex: "status",
      render: (_, { status }) => {
        const badgeProps = {
          P: { status: "processing", text: "En Proceso" },
          C: { status: "error", text: "Anulado" },
          F: { status: "success", text: "Finalizado" },
        };

        //@ts-ignore
        return <Badge {...badgeProps[status]} />;
      },
    },
    {
      fixed: "right",
      dataIndex: "idAcademicYearPartial",
      width: 200,
      render: (idAcademicYearPartial, academicYearPartial) => (
        <Row justify="space-around">
          <Tooltip
            color="#fff"
            overlayInnerStyle={{ color: "black" }}
            title="Finalizar Parcial"
          >
            <Button
              type="link"
              size="middle"
              loading={eventLoading}
              icon={<CheckCircleOutlined />}
              disabled={academicYearPartial.status !== "P" || disabled}
              onClick={async () => {
                const { error } = await finishPartial(idAcademicYearPartial);
                error || reload();
              }}
            />
          </Tooltip>
          <Tooltip
            placement="topRight"
            color="#fff"
            overlayInnerStyle={{ color: "black" }}
            title="Registrar Notas"
          >
            <Button
              type="link"
              size="middle"
              loading={eventLoading}
              icon={<AuditOutlined />}
              disabled={academicYearPartial.status !== "P" || disabled}
              onClick={() => navigate([HomeRoutes.registryScore, idAcademicYearPartial].join("/"))}
            />
          </Tooltip>
          <Tooltip
            placement="topRight"
            color="#fff"
            overlayInnerStyle={{ color: "black" }}
            title="Reanudar Parcial"
          >
            <Button
              type="link"
              size="middle"
              loading={eventLoading}
              icon={<ReloadOutlined />}
              disabled={academicYearPartial.status !== "C" || disabled}
              onClick={async () => {
                const { error } = await reactivatePartial(
                  idAcademicYearPartial
                );
                error || reload();
              }}
            />
          </Tooltip>
          <Tooltip
            placement="topRight"
            color="#fff"
            overlayInnerStyle={{ color: "black" }}
            title="Anular Parcial"
          >
            <Button
              type="link"
              size="middle"
              loading={eventLoading}
              icon={<CloseCircleOutlined />}
              onClick={async () => {
                const { error } = await disablePartial(idAcademicYearPartial);
                error || reload();
              }}
              danger
              disabled={
                academicYearPartial.status === "C" ||
                academicYearPartial.status === "F" ||
                disabled
              }
            />
          </Tooltip>
        </Row>
      ),
    },
  ];

  const props: TableProps<AcademicYearPartial> = {
    columns,
    dataSource: academicYearPartials,
    loading,
    rowKey: ({ idAcademicYearPartial }) => `row-${idAcademicYearPartial}`,
    pagination: {
      style: { margin: "10px" },
      hideOnSinglePage: true,
    },
  };

  return <Table {...props} />;
};

export default AcademicYearPartialTable;
