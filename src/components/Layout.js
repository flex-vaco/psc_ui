import React from "react";
import Navbar from "./Navbar"
import Menubar from "./Menubar";

const Layout = ({ children }) => {
  return (
    <div className="container-fluid">
      <Navbar/>
      <Menubar/>
  
      {children}
    </div>
  );
};

export default Layout;
