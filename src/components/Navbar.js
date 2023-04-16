import React from "react";
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/")
    localStorage.removeItem("jwt-access-token");
  }

  return (
    <div className="container-fluid">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand mx-3" to="/home">Fractional</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="employeesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Employees</Link>
              <ul className="dropdown-menu" aria-labelledby="employeesDropdown">
                <li><Link className="dropdown-item" to="/home">Search</Link></li>
                <li><Link className="dropdown-item" to="/employees">List</Link></li>
                <li><Link className="dropdown-item" to="/empCreate">Add Employee</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="projectsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Projects</Link>
              <ul className="dropdown-menu" aria-labelledby="projectsDropdown">
                <li><Link className="dropdown-item" to="/projects">List</Link></li>
                <li><Link className="dropdown-item" to="/projectCreate">Add Project</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="allocationsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Allocations</Link>
              <ul className="dropdown-menu" aria-labelledby="allocationsDropdown">
                <li><Link className="dropdown-item" to="/empProjList">List</Link></li>
                <li><Link className="dropdown-item" to="/empProjCreate">Add Allocation</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <button
                onClick={handleLogout}
                type="submit"
                className="btn btn-outline-dark mx-2 float-end"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  
  );
};

export default Navbar;
