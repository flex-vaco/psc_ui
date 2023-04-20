import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

const Menubar = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(()=>{
    fetchCategories();
  },[])

  const fetchCategories = () => {
    axios.get(`/application/getCategories`)
    .then(function (response) {
      setCategoryList(response.data.categories);
    })
    .catch(function (error) {
        console.log(error);
    })
  }

  const handleTechClick = (event, technology) => {
    event.preventDefault();    
    navigate(`/filter/`+technology);
  }

  return (
    <div className="container w-auto">
   
    <nav className="navbar menubar navbar-expand-lg navbar-light" id="test">
      <div className="container-fluid">
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        
          <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
             {categoryList.map((category,key) => { 
                return (
                <li className="nav-item menu-item dropdown " key={key} id="test1">
                  <a className="nav-link" href="#" id="navbarDropdownemp" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {category.category_name}
                  </a>
                  <ul className="dropdown-menu">
                    {category.technologies.split(',').map((technology,key) => { return (
                    <li><a className="dropdown-item" key={key} onClick={(event)=>handleTechClick(event,technology)} href='#'>{technology}</a></li>
                    )})}
                  </ul>
                </li>)
              })
            }
          
           
          </ul>
        </div>
      </div>
    </nav>
  </div>
  
  );
};

export default Menubar;
