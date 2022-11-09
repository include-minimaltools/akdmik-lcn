import { Column, ColumnConfig } from "@ant-design/plots";
import { Card, Select, Spin } from "antd";
import { useService, useServiceWithParams } from "hooks";
import { useEffect, useState } from "react";
import { getAcademicYears, getTopStudentsByAcademicYear } from "../services";

const TopStudentsCard = () => {
  const [years, yearsLoading] = useService(getAcademicYears);
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [studentStats, studentLoading] = useServiceWithParams(
    getTopStudentsByAcademicYear,
    { idAcademicYear: +selectedYear },
    [selectedYear]
  );

  const barConfig: ColumnConfig = {
    data: studentStats || [],
    xField: "name",
    yField: "average",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.5,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
    meta: {
      name: {
        alias: "Alumno",
      },
      average: {
        alias: "Promedio",
      },
    },
  };

  useEffect(() => {
    setSelectedYear(years?.map((x) => x.idAcademicYear)[0] || 1);
  }, [years]);

  return (
    <Spin spinning={yearsLoading}>
      <Card
        hoverable
        extra={
          <Select
            showSearch
            optionFilterProp="label"
            autoClearSearchValue
            value={selectedYear}
            onChange={setSelectedYear}
            placeholder="Seleccionar un año lectivo"
            options={years?.map(({ year, idAcademicYear, status }) => ({
              value: idAcademicYear,
              disabled: status === "C",
              label: year,
            }))}
          />
        }
      >
        <Spin spinning={studentLoading}>
          <Column {...barConfig} />
        </Spin>
      </Card>
    </Spin>
  );
};
export default TopStudentsCard;
