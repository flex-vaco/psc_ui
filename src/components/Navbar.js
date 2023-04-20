import React from "react";
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate();
  const activeUserRole = localStorage.getItem("user_role");
  const handleLogout = () => {
    navigate("/")
    localStorage.removeItem("jwt-access-token");
  }
  
  const utilizationValidRoles = ["supervisor", "administrator"];
  const allocationValidRoles = ["supervisor", "administrator"];
  const employeeValidRoles = ["supervisor", "administrator"];
  const projectValidRoles = ["supervisor", "administrator"];
  const userValidRoles = ["administrator"];

  return (
    <div className="container w-auto">
   
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/filter"><img src="/images/Logo.png"/></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex nav_search">
            <input className="form-control" type="search" placeholder="What skills are you looking to hire?" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit"><i className="bi bi-search text-gray"></i></button>
          </form>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {
              (employeeValidRoles.includes(activeUserRole)) ? 
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownemp" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Employees
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownemp">
                <li><a className="dropdown-item" href="/home">Search</a></li>
                <li><a className="dropdown-item" href="/employees">List</a></li>
                <li><a className="dropdown-item" href="/empCreate">Add Employee</a></li>
              </ul>
            </li> :""
            }
            {
              (projectValidRoles.includes(activeUserRole)) ? 
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownproject" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Projects
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownproject">
                <li><a className="dropdown-item" href="/projects">List</a></li>
                <li><a className="dropdown-item" href="projectCreate">Add Project</a></li>
              </ul>
            </li> : ""
          }
            {
              (allocationValidRoles.includes(activeUserRole)) ? 
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownallocation" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Allocations
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownallocation">
                  <li><a className="dropdown-item" href="/empProjList">List</a></li>
                  <li><a className="dropdown-item" href="/empProjCreate">Add Allocation</a></li>
                </ul>
              </li>
               : ""
            }
            {
              (utilizationValidRoles.includes(activeUserRole)) ? 
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownallocation" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Utilization
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownallocation">
                  <li><a className="dropdown-item" href="/empUtiliList">List</a></li>
                  <li><a className="dropdown-item" href="/empProjUtiliCreate">Add Allocation</a></li>
                </ul>
                </li>
                  :""
            }
            {   
              (userValidRoles.includes(activeUserRole)) ? 
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownallocation" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Users
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownallocation">
                  <li><a className="dropdown-item" href="/userList">List</a></li>
                  <li><a className="dropdown-item" href="/userCreate">Add User</a></li>
                </ul>
              </li>
               : ""
            }
            <li className="nav-item dropdown">
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
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  
  );
};

export default Navbar;