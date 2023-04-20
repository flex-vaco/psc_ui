import React from "react";
import Navbar from "./Navbar"
import Menubar from "./Menubar";

const Layout = ({ children }) => {
  return (
    <div className="container-fluid">
      <Navbar/>
      <Menubar/>
      <br/><br/><br/> 
      {children}
    </div>
  );
};

export default Layout;
