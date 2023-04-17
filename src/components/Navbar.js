import React from "react";
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/")
    localStorage.removeItem("jwt-access-token");
  }

  return (
    <div className="container w-auto">
   
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/home"><img src="images/Logo.png"/></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex nav_search">
            <input class="form-control" type="search" placeholder="What skills are you looking to hire?" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit"><i class="bi bi-search text-gray"></i></button>
          </form>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownemp" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Employees
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownemp">
                <li><a class="dropdown-item" href="/home">Search</a></li>
                <li><a class="dropdown-item" href="/employees">List</a></li>
                <li><a class="dropdown-item" href="/empCreate">Add Employee</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownproject" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Projects
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownproject">
                <li><a class="dropdown-item" href="/projects">List</a></li>
                <li><a class="dropdown-item" href="projectCreate">Add Project</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownallocation" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Allocations
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownallocation">
                <li><a class="dropdown-item" href="/empProjList">List</a></li>
                <li><a class="dropdown-item" href="/empProjCreate">Add Allocation</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownuser" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="images/img_avatar1.png" alt="Avatar Logo" class="rounded-pill nav_profileimg"/>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownuser">
                <li><a class="dropdown-item" href="#">My profile</a></li>
                <li> 
                  <a class="dropdown-item"
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
