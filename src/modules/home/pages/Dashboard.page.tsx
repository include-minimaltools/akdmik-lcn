import { Pie } from "@ant-design/charts";
import { Column, Line } from "@ant-design/plots";
import { Card, Select, Statistic } from "antd";
import { useEffect, useState } from "react";
import {
  AcademicYearAverageCard,
  StudentsPassedAndFailed,
} from "../components";
import TopStudentsCard from "../components/TopStudentsCard.component";
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



const DashboardPage = () => {
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
        <AcademicYearAverageCard />
        <TopStudentsCard />
        <StudentsPassedAndFailed />
      </div>
    </DashboardStyle>
  );
};

export default DashboardPage;
