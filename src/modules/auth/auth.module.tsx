import { Navigate, Route } from "react-router-dom";
import { Routes } from "components";
import AuthRoutes from "./auth.routes";
import { PrivateRoutes } from "routes";
import { LoginPage, LogoutPage } from "./pages";

const AuthModule = () => {
  return (
    <Routes>
      <Route path={AuthRoutes.login} element={<LoginPage />} />
      <Route path={AuthRoutes.logout} element={<LogoutPage />} />
      <Route
        path={PrivateRoutes.home}
        element={<Navigate to={AuthRoutes.login} />}
      />
    </Routes>
  );
};

export default AuthModule;
