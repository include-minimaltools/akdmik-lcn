import { Card, Statistic } from "antd";
import { useService } from "hooks";
import { getUserCount } from "modules/admin/services";
import { getCourseCount } from "modules/pensum/services";
import { getParentCount } from "modules/student/services";
import { getStudentCount } from "services";
import {
  AcademicYearAverageCard,
  StudentsPassedAndFailed,
} from "../components";
import TopStudentsCard from "../components/TopStudentsCard.component";
import { getAcademicYearCount } from "../services";
import { DashboardStyle } from "../style/Dashboard.style";

const DashboardPage = () => {
  const [students, studentLoading] = useService(getStudentCount);
  const [courses, courseLoading] = useService(getCourseCount);
  const [parents, parentLoading] = useService(getParentCount);
  const [users, userLoading] = useService(getUserCount);
  const [academicYear, academicYearLoading] = useService(getAcademicYearCount);

  return (
    <DashboardStyle>
      <div className="statistics-section">
        <Card hoverable>
          <Statistic
            title="Estudiantes Activos"
            valueStyle={{ color: "#3f8600" }}
            loading={studentLoading}
            value={students}
          />
        </Card>
        <Card hoverable>
          <Statistic
            title="Asignaturas"
            value={courses}
            loading={courseLoading}
          />
        </Card>
        <Card hoverable>
          <Statistic
            title="Familiares"
            value={parents}
            loading={parentLoading}
          />
        </Card>
        <Card hoverable>
          <Statistic
            title="Años Lectivos"
            value={academicYear}
            loading={academicYearLoading}
          />
        </Card>
        <Card hoverable>
          <Statistic
            title="Usuarios Activos"
            value={users}
            loading={userLoading}
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
