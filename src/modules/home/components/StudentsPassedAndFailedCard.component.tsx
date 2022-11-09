import { Pie } from "@ant-design/plots";
import { Card, Select, Spin } from "antd";
import { useService, useServiceWithParams } from "hooks";
import { useEffect, useState } from "react";
import { getAcademicYears, getStudentsPassedAndFailed } from "../services";

const StudentsPassedAndFailed = () => {
  const [years, yearsLoading] = useService(getAcademicYears);
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [studentStats, studentLoading] = useServiceWithParams(
    getStudentsPassedAndFailed,
    { idAcademicYear: +selectedYear },
    [selectedYear]
  );

  useEffect(() => {
    setSelectedYear(years?.map((x) => x.idAcademicYear)[0] || 1);
  }, [years]);

  const config = {
    appendPadding: 10,
    data:
      studentStats?.map(({ isApproved, value }) => ({
        type: isApproved ? "Aprobados" : "Reprobados",
        value,
      })) || [],
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

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
          <Pie {...config} />
        </Spin>
      </Card>
    </Spin>
  );
};
export default StudentsPassedAndFailed;
