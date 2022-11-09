import { Line, LineConfig } from "@ant-design/plots";
import { Card, Spin } from "antd";
import { useService } from "hooks";
import { getAcademicYearAverage } from "../services";

const AcademicYearAverageCard = () => {
  const [academicYearAverage, loading] = useService(getAcademicYearAverage);

  const lineConfig: LineConfig = {
    data: academicYearAverage || [],
    xField: "year",
    yField: "average",
    seriesField: "name",
    yAxis: {
      label: {
        formatter: (v: any) => `${(v / 1).toFixed(2)}`,
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  return (
    <Card className="first-graph" hoverable>
      <Spin spinning={loading}>
        <Line {...lineConfig} />
      </Spin>
    </Card>
  );
};
export default AcademicYearAverageCard;
