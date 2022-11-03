import { Pie } from "@ant-design/charts";
import { Column, Line } from "@ant-design/plots";
import { Card, Statistic } from "antd";
import { useEffect, useState } from "react";
import { DashboardStyle } from "../style/Dashboard.style";

const data = [
  {
    type: "Aprobados",
    value: 27,
  },
  {
    type: "Reprobados",
    value: 25,
  },
];

const config = {
  appendPadding: 10,
  data,
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

const barData = [
  {
    type: "Gabriel Ortiz",
    sales: 38,
  },
  {
    type: "Esteban Nano",
    sales: 52,
  },
  {
    type: "Alfredo ",
    sales: 61,
  },
  {
    type: "Camilo",
    sales: 99,
  },
  {
    type: "Linda",
    sales: 48,
  },
  {
    type: "Carlos",
    sales: 38,
  },
  {
    type: "Pedro",
    sales: 38,
  },
  {
    type: "Jerry",
    sales: 38,
  },
];
const barConfig = {
  data: barData,
  xField: "type",
  yField: "sales",
  label: {
    // 可手动配置 label 数据标签位置
    position: "middle",
    // 'top', 'bottom', 'middle',
    // 配置样式
    style: {
      fill: "#FFFFFF",
      opacity: 0.6,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: true,
    },
  },
  meta: {
    type: {
      alias: "Alumno",
    },
    sales: {
      alias: "Promedio",
    },
  },
};

const DashboardPage = () => {
  const [lineData, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const lineConfig = {
    data: lineData,
    xField: "year",
    yField: "gdp",
    seriesField: "name",
    yAxis: {
      label: {
        formatter: (v: any) => `${(v / 10e8).toFixed(1)} B`,
      },
    },

    legend: {
      position: "top",
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  return (
    <DashboardStyle>
      <div className="statistics-section">
        <Card hoverable>
          <Statistic
            title="Estudiantes Activos"
            value={11.28}
            precision={2}
            // valueStyle={{ color: "#3f8600" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
        <Card hoverable>
          <Statistic
            title="Asignaturas"
            value={11.28}
            precision={2}
            // valueStyle={{ color: "#3f8600" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
        <Card hoverable>
          <Statistic
            title="Familiares"
            value={11.28}
            precision={2}
            // valueStyle={{ color: "#3f8600" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
        <Card hoverable>
          <Statistic
            title="Años Lectivos"
            value={11.28}
            precision={2}
            // valueStyle={{ color: "#3f8600" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
        <Card hoverable>
          <Statistic
            title="Usuarios Activos"
            value={11.28}
            precision={2}
            // valueStyle={{ color: "#3f8600" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
      </div>
      <div className="graphics-section">
        <Card className="first-graph" hoverable>
          {/* @ts-ignore */}
          <Line {...lineConfig} />
        </Card>
        <Card hoverable>
          {/* @ts-ignore */}
          <Column {...barConfig} />;
        </Card>
        <Card hoverable>
          {/* @ts-ignore */}
          <Pie {...config} />
        </Card>
      </div>
    </DashboardStyle>
  );
};

export default DashboardPage;
