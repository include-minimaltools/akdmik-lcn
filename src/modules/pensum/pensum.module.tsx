import { lazy } from "react";
import { Routes } from "components";
import { Route } from "react-router-dom";
import PensumRoutes from "./pensum.routes";

const AreaPage = lazy(async () => await import("./pages/Area.page"));
const CoursePage = lazy(async () => await import("./pages/Course.page"));
const GradePage = lazy(async () => await import("./pages/Grade.page"));
const PartialPage = lazy(async () => await import("./pages/Partial.page"));

const PensumModule = () => {
  return (
    <Routes>
      <Route
        path={PensumRoutes.area.replace("/pensum", "")}
        element={<AreaPage />}
      />
      <Route
        path={PensumRoutes.course.replace("/pensum", "")}
        element={<CoursePage />}
      />
      <Route
        path={PensumRoutes.grade.replace("/pensum", "")}
        element={<GradePage />}
      />
      <Route
        path={PensumRoutes.partial.replace("/pensum", "")}
        element={<PartialPage />}
      />
    </Routes>
  );
};

export default PensumModule;
