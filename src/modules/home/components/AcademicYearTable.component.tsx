import { FC } from "react";
import { AcademicYear } from "../models";
import { useSearch } from "hooks";
import { ColumnsType } from "models";
import { Badge, Button, Row, Table, TableProps, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import AcademicYearPartialTable from "./AcademicYearPartialTable.component";

export type academicYearTableProps = {
  onPressFinish: (idAcademicYear: number) => any;
  onPressCancel: (idAcademicYear: number) => any;
  academicYears?: AcademicYear[];
  loading: boolean;
};

const AcademicYearTable: FC<academicYearTableProps> = ({
  academicYears,
  loading,
  onPressFinish,
  onPressCancel,
}) => {
  const { searchValue } = useSearch(
    [
      {
        label: "AcademicYears",
        options:
          academicYears?.map((academicYear) => academicYear.year.toString()) ||
          [],
      },
    ],
    [academicYears]
  );

  const columns: ColumnsType<AcademicYear> = [
    {
      title: "Id",
      dataIndex: "idAcademicYear",
    },
    {
      title: "Año Lectivo",
      dataIndex: "year",
    },
    {
      title: "Ultima modificación",
      dataIndex: "updatedBy",
    },
    {
      title: "Estado",
      dataIndex: "status",
      render: (_, { status }) => {
        const badgeProps = {
          P: { status: "processing", text: "En Proceso" },
          C: { status: "error", text: "Cancelado" },
          F: { status: "success", text: "Completado" },
        };

        //@ts-ignore
        return <Badge {...badgeProps[status]} />;
      },
    },
    {
      fixed: "right",
      dataIndex: "idAcademicYear",
      width: 100,
      render: (idAcademicYear, academicYear) => (
        <Row justify="space-around">
          <Tooltip
            color="#fff"
            overlayInnerStyle={{ color: "black" }}
            title="Finalizar el año lectivo"
          >
            <Button
              type="link"
              size="middle"
              icon={<CheckCircleOutlined />}
              onClick={() => onPressFinish(idAcademicYear)}
              disabled={academicYear.status !== "P"}
            />
          </Tooltip>
          <Tooltip
            placement="topRight"
            color="#fff"
            overlayInnerStyle={{ color: "black" }}
            title="Inactivar el año lectivo"
          >
            <Button
              type="link"
              size="middle"
              icon={<CloseCircleOutlined />}
              onClick={() => onPressCancel(idAcademicYear)}
              danger
              disabled={academicYear.status !== "P"}
            />
          </Tooltip>
        </Row>
      ),
    },
  ];

  const props: TableProps<AcademicYear> = {
    columns,
    expandable: {
      expandedRowRender: ({ academicYearPartials, status }) => (
        <AcademicYearPartialTable
          academicYearPartials={academicYearPartials}
          loading={false}
          disabled={status !== "P"}
        />
      ),
    },
    dataSource: searchValue
      ? academicYears?.filter((x) => x.year.toString().includes(searchValue))
      : academicYears,
    loading,
    rowKey: ({ idAcademicYear }) => `row-${idAcademicYear}`,
    pagination: {
      style: { margin: "10px" },
      hideOnSinglePage: true,
    },
  };

  return <Table {...props} />;
};

export default AcademicYearTable;
