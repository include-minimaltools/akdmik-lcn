import { Navigate, Route } from "react-router-dom";
import { Routes } from "components";
import HomeRoutes from "./home.routes";
import { PublicRoutes } from "routes";
import { DashboardPage } from "./pages/Dashboard";

const AuthModule = () => {
  return (
    <Routes>
      <Route path={HomeRoutes.home} element={<DashboardPage />} />
      <Route path={PublicRoutes.login} element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AuthModule;
