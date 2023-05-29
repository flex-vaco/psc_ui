import React,  { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import * as AppFunc from "../lib/AppFunctions";
import Menu from "./Menu";

const Navbar = () => {
  const navigate = useNavigate();
  const activeUserRole = localStorage.getItem("user_role");
  const [searchSkill, setSearchSkill] = useState('');
  const dummyState = {categoryTech:[], technologies:''};

  const handleLogout = () => {
    navigate("/")
    localStorage.removeItem("jwt-access-token");
  }

  const handleHomeButtonClick = () => {
    navigate("/home");
  }

  const handleSearchClick = (event) => {
    event.preventDefault();    
    console.log('search');
    navigate(`/filter`,{
      state: {
          categoryTech: [],
          technologies: searchSkill,
      },
  });
  }
  if (AppFunc.userIsEmployee()) {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <span className="logo">
              <img className="img-fluid" src="/images/Logo.png" />
            </span>
            <div className="float-end me-5"><Menu /></div>
          </div>
        </nav>
      </div>
    );
  }


  return (
    <div>
   
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
      
        
        <Link to={"/home"} state={dummyState} className="logo"><img className="img-fluid" src="/images/Logo.png"/></Link>
        <button 
              type="button"
              onClick={handleHomeButtonClick}
              className="btn btn-outline-secondary ms-3 me-1 d-block d-md-none home_button">
              <i className="bi bi-house"></i> 
            </button>
        <button className="navbar-toggler btn btn-outline-secondary ms-1 me-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent, #navbarSupportedContent2" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="bi bi-grid-3x3-gap-fill"></i>
        </button>
       
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex nav_search ms-3 me-3 d-none d-md-block">
            <input className="form-control" type="search" onChange={(event)=>{setSearchSkill(event.target.value)}} placeholder="What skills are you looking to hire?" aria-label="Search" />
            <button className="btn btn-outline-success"  onClick={(event) => handleSearchClick(event)}><i className="bi bi-search text-gray"></i></button>
          </form>
          <button 
              type="button"
              onClick={handleHomeButtonClick}
              className="btn btn-outline-secondary ms-3 me-3 float-end d-none d-md-block">
              <i className="bi bi-house"></i> 
            </button>
          <Menu />
        </div>
      </div>
      <form className="d-flex nav_search ms-3 me-1 d-block d-md-none">
          <input className="form-control" type="search" onChange={(event)=>{setSearchSkill(event.target.value)}} placeholder="What skills are you looking to hire?" aria-label="Search" />
          <button className="btn btn-outline-success"  onClick={(event) => handleSearchClick(event)}><i className="bi bi-search text-gray"></i></button>
        </form>
    </nav>
  </div>
  
  );
};

export default Navbar;