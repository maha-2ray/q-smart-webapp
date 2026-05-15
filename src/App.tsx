import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./constants/routes";
import { lazyWithReload } from "./libs/lazy-with-reloads";
import ErrorBoundary from "./hooks/error-boundary";

const NotFoundPage = lazyWithReload(() => import("./pages/_not-found"));
const PrivateRoute = lazyWithReload(
  () => import("./components/layouts/private-routes"),
);

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* <Route path="/" element={<PrivateRoute />} /> */}
        <Route path="/" element={<Navigate to="/queue-operations" />} />
        {routes.map(({ path, component, protected: isProtected }) => {
          const RouteComponent = component ? (
            <Suspense>{React.createElement(component)}</Suspense>
          ) : null;

          return isProtected ? (
            <Route key={path} element={<PrivateRoute />}>
              <Route path={path} element={RouteComponent} />
            </Route>
          ) : (
            <Route key={path} path={path} element={RouteComponent} />
          );
        })}
        <Route
          path="*"
          element={
            <Suspense fallback={<div> Loading...</div>}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
