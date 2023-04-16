import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import axios from 'axios'
import Layout from "../components/Layout"
import EmployeeProfileCard from '../components/employee/EmploeeProfileCard'


function EmpFilteredList() {
    const [empList, setEmpList] = useState([])
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedExp, setSelectedExp] = useState('');
    const [selectedSkill, setSelectedSkill] = useState([]);
    const [techSkills, setTechSkills] = useState([]);

    useEffect(() => {
        console.log(selectedExp);
        console.log('test');
        fetchEmpList();
    }, [selectedLocation, selectedExp, selectedRole, selectedSkill, selectedSkill])

    useEffect(() => {
        fetchTechSkills();
    }, [])

    const handleTechSkillChange = (event, selectedSkill) => {
        setSelectedSkill((prev) => {
            if (event.target.checked) {
                return [selectedSkill, ...prev];
            }
            else {
                return prev.filter((skill) => {
                    return skill !== selectedSkill
                });
            }
        });
        console.log(selectedSkill);
    }


    const fetchTechSkills = () => {
        //axios.get(`employees/filter/${skill}/${selectedLocation}/${selectedExp}`
        axios.get(`/application/getTechnologies`)
            .then(function (response) {
                setTechSkills(response.data.technologies);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const fetchEmpList = () => {
        //axios.get(`employees/filter/${skill}/${selectedLocation}/${selectedExp}`
        axios.get(`employees/filter`, {
            params: {
                skill: selectedSkill,
                exp: selectedExp >= 0 ? selectedExp : null,
                skill: selectedSkill,
                exp: selectedExp >= 0 ? selectedExp : null,
                location: selectedLocation,
                role: selectedRole
            }
        }
        )
            .then(function (response) {
                setEmpList(response.data.employees);
            })
            .catch(function (error) {
                console.log(error);
            })
    }



    return (
        <Layout>
            <div className="container-fluid">

                <form className="row g-3 h-100">

                    <div className="col-1 h-100"></div>

                    <form className="row g-3 h-100">
                        <div className="col-1 h-100"></div>
                        <div className="col-2 h-100">
                            <div className="">
                                Skills
                            </div>
                          
                    {techSkills.map((techSkill, key) => {
                        return(<div className="form-check" key={key}>
                                    <input className="form-check-input" type="checkbox"  onChange={(event)=>{handleTechSkillChange(event,techSkill)}} value="" id="flexCheckDefault"/>
                                    <label className="form-check-label" for="flexCheckDefault">
                                         {techSkill}
                                    </label>
                                </div>)
                    })
                    }
                    <hr className="style12 mb-3"></hr>
                    <div classNameName="form-group">
                        <label for="location">Location</label>
                        <input placeholder='search locations'
                                        onChange={(event)=>{setSelectedLocation(event.target.value)}}
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        name="location"/>
                    </div>
                    <hr className="style12 mb-3"></hr>
                        <div className="form-group"> 
                            <label for="exp">Experience</label>
                        

                            <div className="form-check">
                                <input className="form-check-input" type="radio" onChange={(event)=>{setSelectedExp(0)}} name="flexRadioDefault" id="flexRadioDefault1"/>
                                <label className="form-check-label">
                                    Fresher
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="radio" onChange={(event)=>{setSelectedExp(2)}} name="flexRadioDefault" />
                                <label className="form-check-label">
                                    2 years
                                </label>
                                </div>
                            <div>
                            
                            <div className="form-check">
                                <input className="form-check-input" type="radio" onChange={(event)=>{setSelectedExp(4)}} name="flexRadioDefault" />
                                <label className="form-check-label">
                                    4 years
                                </label>
                                </div>
                            <div></div>

                            
                        <input type="range" 
                                className='multi-range'
                                step="*" 
                                min="-1" 
                                min="-1" 
                                max="20" 
                                onChange={(event)=>{setSelectedExp(event.target.value)}}
                                id="exp"
                             />
                        <div className='text-center'>
                            {selectedExp > 0 &&  (<label>{selectedExp} years</label>)}
                            
                        </div>
                        </div>
                    </div>
                    <hr className="style12 mb-3"></hr>
                </div>
            
                <div className="col-8">
                    <div className="card">
                        
                        <div className="card-body row my-3">
                
                         
                                    {empList && empList.map((empDetails, key)=>{
                                        return (
                                    
                                           <EmployeeProfileCard employee={empDetails} key={empDetails.emp_id}></EmployeeProfileCard>
                                        )
                                    
                                        })
                                    }
                              
                        </div>
                    </div>
                </div>
                <div className="col-1 h-100"></div> 
            </form>
</form>
            </div>



                  
                    </Layout>
                    );
}

export default EmpFilteredList;