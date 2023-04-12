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
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid g-3">
          <Link className="navbar-brand mx-3" href="#">Fractional</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Employees</Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/home">Search</Link></li>
                  <li><Link className="dropdown-item" to="/employees">List</Link></li>
                  <li><Link className="dropdown-item" to="/empCreate">Add Employee</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Projects</Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/projects">List</Link></li>
                  <li><Link className="dropdown-item" to="/projectCreate">Add Project</Link></li>
                </ul>
              </li>
            </ul>
          </div>
          <button
            onClick={handleLogout}
            type="submit"
            className="btn btn-outline-dark mx-2 float-right"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
