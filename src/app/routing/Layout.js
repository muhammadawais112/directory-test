import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopNavbar from "../components/TopNavbar";
// import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* <TopNavbar /> */}
      <Header />
      <div className="min-h-screen bg-gray-50">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
