import { lazy } from "react";
import ComponentLoader from "./component-loader";
const AppRoutes = () => {
  const MainRoute = ComponentLoader(lazy(() => import("../pages/index")));

  const routes = [
    {
      path: "/*",
      element: <MainRoute />,
    },
    {
      path: "/app/:agency_id/*",
      element: <MainRoute />,
    },
  ]
  return routes
};

export default AppRoutes;
