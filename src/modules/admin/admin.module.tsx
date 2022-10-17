import { Route } from "react-router-dom";
import { Routes } from "components";

import AdminRoutes from "./admin.routes";
import { lazy } from "react";

const UserPage = lazy(async () => await import("./pages/User/User.page"));
const RolePage = lazy(async () => await import("./pages/Role/Role.page"));

const AuthModule = () => {
  return (
    <Routes>
      <Route
        path={AdminRoutes.user.replace("/admin", "")}
        element={<UserPage />}
      />
      <Route
        path={AdminRoutes.role.replace("/admin", "")}
        element={<RolePage />}
      />
    </Routes>
  );
};

export default AuthModule;
