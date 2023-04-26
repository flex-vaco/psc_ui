import React from "react";
import Navbar from "./Navbar";

const HomePageLayout = ({ children }) => {
  return (
    <div className="container-fluid homepage">
      <Navbar/>
      <div className="main_container pt-3 homepage_main">
        {children}
      </div>
    </div>
  );
};

export default HomePageLayout;
