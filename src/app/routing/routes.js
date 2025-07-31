import React from "react";
import { Routes, Route } from "react-router-dom";
import AppRoutes from "./app-routes";

const RoutesComponent = () => {
  const routes = AppRoutes();

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children &&
            route.children.map((child, idx) => (
              <Route key={idx} path={child.path} element={child.element} />
            ))}
        </Route>
      ))}
    </Routes>
  );
};

export default RoutesComponent;
