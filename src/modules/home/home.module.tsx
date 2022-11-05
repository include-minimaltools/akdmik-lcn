import { Navigate, Route } from "react-router-dom";
import { Routes } from "components";
import { PublicRoutes } from "routes";
import { lazy } from "react";

import HomeRoutes from "./home.routes";

const DashboardPage = lazy(() => import("./pages/Dashboard.page"));
const AcademicYearPage = lazy(() => import("./pages/AcademicYear.page"));
const AcademicYearStudentPage = lazy(
  () => import("./pages/AcademicYearStudent.page")
);
const RegistryScorePage = lazy(() => import("./pages/RegistryScore.page"));

const AuthModule = () => {
  return (
    <Routes>
      <Route path={HomeRoutes.home} element={<DashboardPage />} />
      <Route path={HomeRoutes.academicYear} element={<AcademicYearPage />} />
      <Route
        path={HomeRoutes.academicYearStudent + "/:idAcademicYear"}
        element={<AcademicYearStudentPage />}
      />
      <Route
        path={HomeRoutes.registryScore + "/:idAcademicYearPartial"}
        element={<RegistryScorePage />}
      />
      <Route path={PublicRoutes.login} element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AuthModule;
