import AdminRoutes from "modules/admin/admin.routes";
import HomeRoutes from "modules/home/home.routes";

const PrivateRoutes = {
  ...HomeRoutes,
  admin: "/admin",
  ...AdminRoutes,
};

export default PrivateRoutes;
