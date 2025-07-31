import Listing from "./Listing";

export default function getRoutesConfig() {
  return [
    {
      path: "/",
      element: <Listing />,
    },
  ];
}
