import React,  { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import * as AppFunc from "../lib/AppFunctions";

const Navbar = () => {
  const navigate = useNavigate();
  const activeUserRole = localStorage.getItem("user_role");
  const [searchSkill, setSearchSkill] = useState('');

  const handleLogout = () => {
    navigate("/")
    localStorage.removeItem("jwt-access-token");
  }

  const handleHomeButtonClick = () => {
    navigate("/filter");
  }

  const handleSearchClick = (event) => {
    event.preventDefault();    
    console.log('search');
    navigate(`/filter/`+searchSkill);
  }

  return (
    <div>
   
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
      <form className="d-flex nav_search ms-3 me-3 d-block d-md-none">
          <input className="form-control" type="search" onChange={(event)=>{setSearchSkill(event.target.value)}} placeholder="What skills are you looking to hire?" aria-label="Search" />
          <button className="btn btn-outline-success"  onClick={(event) => handleSearchClick(event)}><i className="bi bi-search text-gray"></i></button>
        </form>
        <Link to={"/filter"} className="d-none d-md-block"><img src="/images/Logo.png"/></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent, #navbarSupportedContent2" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex nav_search ms-3 me-3 d-none d-md-block">
            <input className="form-control" type="search" onChange={(event)=>{setSearchSkill(event.target.value)}} placeholder="What skills are you looking to hire?" aria-label="Search" />
            <button className="btn btn-outline-success"  onClick={(event) => handleSearchClick(event)}><i className="bi bi-search text-gray"></i></button>
          </form>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {AppFunc.hasAdminAccess(activeUserRole) ?
            <li className="nav-item dropdown ms-3 me-3">
              <a className="nav-link dropdown-toggle main_li" href="#" id="navbarDropdownemp" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Admin.
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownemp">
                {AppFunc.hasEmployeeAccess(activeUserRole) ? <li><a className="dropdown-item" href="/employees">Employees</a></li>: ""}
                {AppFunc.hasProjectAccess(activeUserRole) ? <li><a className="dropdown-item" href="/projects">Projects</a></li>: ""}
                {AppFunc.hasAllocationAccess(activeUserRole) ? <li><a className="dropdown-item" href="/empProjList">Allocations</a></li>: ""}
                {AppFunc.hasUtilizationAccess(activeUserRole) ? <li><a className="dropdown-item" href="/empUtiliList">Utilization</a></li> : ""}
                {AppFunc.hasUserAccess(activeUserRole) ? <li><a className="dropdown-item" href="/userList">Users</a></li> : ""}
              </ul>
            </li> : ""}
            <li className="nav-item dropdown ms-3 me-3">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownuser" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="/images/img_avatar1.png" alt="Avatar Logo" className="rounded-pill nav_profileimg"/>
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownuser">
                <li><a className="dropdown-item" href="#">Role: {activeUserRole}</a></li>
                <li> 
                  <a className="dropdown-item"
                    onClick={handleLogout}
                    type="submit"
                  >
                    <i className="bi bi-box-arrow-right"> Logout</i>
                  </a>
                </li>
              </ul>
            </li>
            <li 
              type="button"
              onClick={handleHomeButtonClick}
              className="btn btn-outline-secondary ms-3 me-3 float-end">
              <i className="bi bi-house"></i> 
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  
  );
};

export default Navbar;