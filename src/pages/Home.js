import React, { useEffect, useState } from "react";

import {useNavigate} from 'react-router-dom';
import axios from 'axios'

import Layout from "../components/Layout"
 
function Home() {
    const  [searchSkill, setSearchSkill] = useState('')
  
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([]);


    const navigateToEmployeeFilter = () => {
      // 👇️ navigate to /contacts
      navigate(`/filter`,{
        state: {
            categoryTech: [],
            technologies: searchSkill
        },
    });
    };
    
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

      const handleClickCategory = (e, category) => {
            console.log(category);
            let arrTech = category.technologies.split(',').map((skill) => {
                                    return skill.trim().replace(/(^\w|\s\w)/g, m => m.toUpperCase()); 
                                    });
            navigate(`/filter`,{
                state: {
                    categoryTech: arrTech,
                    technologies: null
                },
            });
      }
    
  
    return (
        <Layout>
           <div className="container">
        
                <div className="card mb-3">
                   
                    <div className="card-body">
                       <p>Hello,</p>
                       <p>What skills are you looking to hire?</p>
                       <input placeholder='Python, NetSuite, etc..'
                            onChange={(event)=>{setSearchSkill(event.target.value)}}
                            type="text"
                            className="form-control"
                            id="skill"
                            name="skill"/>
    
                            <div className='justify-content-center'>
                            <button   disabled={searchSkill.length < 3} onClick={navigateToEmployeeFilter} className="btn btn-outline-primary mt-3">Search</button>

                            </div>
                    </div>
                </div>
            </div>

            <div className="container">
            <div class="card-deck">
                <div class="row">
                {categoryList.map((category) => {
                    return (
                        <div class="col-lg-3 mb-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <button type="button" class="btn btn-light  mx-0 h-100 w-100" value={category.id} onClick={(e) => {handleClickCategory(e,category)}}>
                                        <img className='h-80' src={`/images/` + category.image_name}/><br></br>
                                        <span>{category.category_name}</span>
                                    </button>
                               </div>
                            </div>
                        </div>
                    )
                })}
                

               

              

               
            
        </div>
 
</div>
     
            </div>
        </Layout>
    );
}
  
export default Home;