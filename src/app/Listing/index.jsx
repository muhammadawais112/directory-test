import React from "react";
import { Route, Routes } from "react-router-dom";
import getRoutesConfig from "./routes"; // Corrected import

const Index = () => {
  const routes = getRoutesConfig(); // Use the correct function

  const getRoutes = (allRoutes) => {
    return allRoutes.map((route) => {
      if (route.path) {
        return (
          <Route key={route.path} path={route.path} element={route.element} />
        );
      }
      return null;
    });
  };

  return (
    <Routes>{getRoutes(routes)}</Routes>
  );
};

export default Index;
