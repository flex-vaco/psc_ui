import React from "react";
import Navbar from "./Navbar"
import Menubar from "./Menubar";

const Layout = ({ children }) => {
  return (
    <div className="container-fluid">
      <Navbar/>
      <Menubar/>
      <div className="main_container pt-3">
        {children}
      </div>
    </div>
  );
};

export default Layout;
