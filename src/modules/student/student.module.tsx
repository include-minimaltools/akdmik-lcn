import { lazy } from "react";
import { Routes } from "components";
import { Route } from "react-router-dom";
import StudentRoutes from "./student.routes";

const ParentPage = lazy(async () => await import("./pages/Parent.page"));
const RelationshipPage = lazy(
  async () => await import("./pages/Relationship.page")
);
const StudentPage = lazy(async () => await import("./pages/Student.page"));

const PensumModule = () => {
  return (
    <Routes>
      <Route
        path={StudentRoutes.parent.replace("/student", "")}
        element={<ParentPage />}
      />
      <Route
        path={StudentRoutes.information.replace("/student", "")}
        element={<StudentPage />}
      />
      <Route
        path={StudentRoutes.relationship.replace("/student", "")}
        element={<RelationshipPage />}
      />
    </Routes>
  );
};

export default PensumModule;
