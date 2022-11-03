import { Navigate, Route } from "react-router-dom";
import { Routes } from "components";
import { PublicRoutes } from "routes";
import { lazy } from "react";

import HomeRoutes from "./home.routes";

const DashboardPage = lazy(() => import("./pages/Dashboard.page"));
const AcademicYear = lazy(() => import("./pages/AcademicYear.page"));

const AuthModule = () => {
  return (
    <Routes>
      <Route path={HomeRoutes.home} element={<DashboardPage />} />
      <Route path={HomeRoutes.academicYear} element={<AcademicYear />} />
      <Route path={PublicRoutes.login} element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AuthModule;
