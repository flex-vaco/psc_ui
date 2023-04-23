import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from "react-router-dom"
import axios from 'axios'
import Layout from "../components/Layout"
import EmployeeProfileCard from '../components/employee/EmploeeProfileCard'
import $ from 'jquery';


function EmpFilteredList(props) {
   

    const [empList, setEmpList] = useState([])
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedExp, setSelectedExp] = useState('');
    const [selectedAvailability, setSelectedAvailability] = useState('');
    const [selectedSkill, setSelectedSkill] =  useState([]);
    const [techSkills, setTechSkills] = useState([]);
    const params = useParams();
    $(document).ready(function () {
        $('[data-toggle="offcanvas"]').click(function () {
            console.log('canavas');
          $('.row-offcanvas').addClass('active')
        });
        $('[data-toggle="offcanvasclose"]').click(function () {
            console.log('canavas');
          $('.row-offcanvas').removeClass('active')
        });
    });
    useEffect(() => {
        fetchEmpList();
    }, [selectedLocation, selectedExp, selectedRole, selectedSkill])

    useEffect(() => {
        if (params.searchSkill) {
             const arrSkill =  params.searchSkill.split(',').map((skill) => {return skill.trim()});
             setSelectedSkill(arrSkill);
        }
    },[params])

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
            <div className="row-offcanvas row-offcanvas-right container-fluid float-left">
            <div className="col-xs-6 col-sm-2 sidebar-offcanvas sidebar_background float-left pt-1 px-2" id="sidebar">
            <button type="button" className="btn btn-primary btn-xs btn-close-white p-0 visible-xs" data-toggle="offcanvasclose"><i className="bi bi-chevron-left"></i></button>
            <p className="text-center"><i className="bi bi-funnel-fill"></i> Filter</p>
            <div className="col-12 h-100">
                            <div className="small">
                                Skills
                            </div>
                          
                    {techSkills.map((techSkill, key) => {
                        return(<div className="form-check pe-1" key={key}>
                                    <input className="form-check-input" type="checkbox"  onChange={(event)=>{handleTechSkillChange(event,techSkill)}} value="" id="flexCheckDefault"/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                         {techSkill}
                                    </label>
                                </div>)
                    })
                    }
                    <hr className="style12 mb-3"></hr>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input placeholder='search locations'
                                        onChange={(event)=>{setSelectedLocation(event.target.value)}}
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        name="location"/>
                    </div>
                    <hr className="style12 mb-3"></hr>
                        <div className="form-group"> 
                            <label htmlFor="exp">Experience</label>
                        

                            <div className="form-check">
                                <input className="form-check-input" type="radio" checked={selectedExp === 0} onChange={(event)=>{setSelectedExp(0)}} name="flexRadioDefault" id="flexRadioDefault1"/>
                                <label className="form-check-label">
                                    Fresher
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="radio" checked={selectedExp === 2} onChange={(event)=>{setSelectedExp(2)}} name="flexRadioDefault" />
                                <label className="form-check-label">
                                    2 years
                                </label>
                                </div>
                            <div>
                            
                            <div className="form-check">
                                <input className="form-check-input" type="radio" checked={selectedExp === 4} onChange={(event)=>{setSelectedExp(4)}} name="flexRadioDefault" />
                                <label className="form-check-label">
                                    4 years
                                </label>
                                </div>
                            <div></div>

                            
                        <input type="range" 
                                className='multi-range'
                                value={selectedExp ? selectedExp : -1}
                                min="-1" 
                                max="20" 
                                onChange={(event)=>{setSelectedExp(event.target.value)}}
                                id="exp"
                             />
                        <div className='text-left'>
                            {selectedExp > 0 &&  (<label>{selectedExp} years</label>)}
                            
                        </div>
                        </div>
                    </div>
                    <hr className="style12 mb-3"></hr>
                    <div className="form-group"> 
                            <label htmlFor="exp">Availability</label>
                        

                            <div className="form-check">
                                <input className="form-check-input" type="radio" checked={selectedAvailability === 1} onChange={(event)=>{setSelectedAvailability(1)}} name="radioAvailability" />
                                <label className="form-check-label">
                                    1 Hour
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="radio" checked={selectedAvailability === 2} onChange={(event)=>{setSelectedAvailability(2)}} name="radioAvailability" />
                                <label className="form-check-label">
                                    2 Hour
                                </label>
                                </div>
                            <div>
                            
                            <div className="form-check">
                                <input className="form-check-input" type="radio" checked={selectedAvailability === 8} onChange={(event)=>{setSelectedAvailability(8)}} name="radioAvailability" />
                                <label className="form-check-label">
                                    8 Hour
                                </label>
                                </div>
                            <div></div>

                            
                        <input type="range" 
                                className='multi-range'
                                value={selectedAvailability ? selectedAvailability : 0}
                                min="0" 
                                max="8" 
                                onChange={(event)=>{setSelectedAvailability(event.target.value)}}
                                id="exp"
                             />
                        <div className='text-left'>
                            {selectedAvailability > 0 &&  (<label>{selectedAvailability} Hour</label>)}
                        </div>
                        </div>
                    </div>
                </div>
</div>
<div className="col-xs-12 col-sm-12 col-md-10 float-left">
  <p className="pull-right visible-xs banner_background">
    <button type="button" className="btn btn-primary btn-xs" data-toggle="offcanvas"><i className="bi bi-sliders"></i></button>
    <h3 className="banner_header">Find Your Required Talent</h3>
  </p>
    <div className="col-xs-12 col-lg-12 mx-1">
                
                         
                                    {empList && empList.map((empDetails, key)=>{
                                        return (
                                            <div className="col-6 col-lg-3 float-left my-1 ps-1 pe-1"> 
                                           <EmployeeProfileCard availability={selectedAvailability} employee={empDetails} key={key}></EmployeeProfileCard>
                                            </div>
                                        )
                                    
                                        })
                                    }
                </div>
    </div>
</div>
                        
            
                



                  
                    </Layout>
                    );
}

export default EmpFilteredList;