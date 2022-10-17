import { FC } from "react";
import {
  Navigate,
  Route,
  Routes as DefaultRoutes,
  RouteProps,
} from "react-router-dom";

const Routes: FC<RouteProps> = ({ children, ...props }) => {
  return (
    <DefaultRoutes {...props}>
      {children}
      <Route path="*" element={<Navigate replace to={"/error-404"} />} />
    </DefaultRoutes>
  );
};

export default Routes;
