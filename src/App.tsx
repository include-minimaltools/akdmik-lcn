import { AdminLayout, AuthLayout } from "components";
import useReduxAuth from "hooks/useAuth.redux";
import { NotFoundPage, SplashScreen } from "pages";
import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AuthModule = lazy(() => import("modules/auth"));
const HomeModule = lazy(() => import("modules/home"));
const AdminModule = lazy(() => import("modules/admin"));
const PensumModule = lazy(() => import("modules/pensum"));

const App: FC = () => {
  const { isAuthenticated } = useReduxAuth();
  return (
    <Suspense fallback={<SplashScreen />}>
      <BrowserRouter>
        <Routes>
          <Route path="/error-404" element={<NotFoundPage />} />
          {isAuthenticated ? (
            <Route element={<AdminLayout />}>
              <Route path="/admin/*" element={<AdminModule />} />
              <Route path="/pensum/*" element={<PensumModule />} />
              <Route path="*" element={<HomeModule />} />
            </Route>
          ) : (
            <Route element={<AuthLayout />}>
              <Route path="*" element={<AuthModule />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export { App };
