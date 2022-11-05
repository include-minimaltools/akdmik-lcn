import AdminRoutes from "modules/admin/admin.routes";
import HomeRoutes from "modules/home/home.routes";
import PensumRoutes from "modules/pensum/pensum.routes";

const PrivateRoutes = {
  ...HomeRoutes,
  admin: "/admin",
  ...AdminRoutes,
  ...PensumRoutes
};

export default PrivateRoutes;
