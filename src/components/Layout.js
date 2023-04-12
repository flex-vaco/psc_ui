import React from "react";
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <div className="container-fluid">
      <Navbar />
      <br/><br/><br/> 
      {children}
    </div>
  );
};

export default Layout;
