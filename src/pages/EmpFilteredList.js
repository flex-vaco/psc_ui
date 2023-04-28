import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from "react-router-dom"
import axios from 'axios'
import Layout from "../components/Layout"
import EmployeeProfileCard from '../components/employee/EmploeeProfileCard'
import EmployeeProfileModal from '../components/employee/EmployeeProfileModal'
import $ from 'jquery';


function EmpFilteredList() {
   
    const {technologies} = useLocation().state;
    const [selectedSecondarySkill, setSelectedSecondarySkill] = useState([]);
    const [empList, setEmpList] = useState([])
    const [empFilteredList, setEmpFilteredList] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedExp, setSelectedExp] = useState('');
    const [selectedAvailability, setSelectedAvailability] = useState('');
    const [techSkills, setTechSkills] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [empModalDetails, setEmpModalDetails] = useState({
        first_name: '',
        last_name: '',
        status: '',
        email: '',
        role: '',
        primary_skills: '',
        secondary_skills: '',
        education: '',
        profile_information: '',
        total_work_experience_years: '',
        rate_per_hour: '',
        vaco_join_date: '',
        home_location_city: '',
        office_location_city: '',
        supervisor_name: '',
        supervisor_email: '',
        is_onsite: '',
        resume: '',
        profile_picture: '',
    })

    function openModal(empId) {
        axios.get(`/employees/${empId}`)
            .then(function (response) {
                setEmpModalDetails(response.data.employees[0])
            })
            .catch(function (error) {
              console.log(error);
            })
        setIsOpen(true);
      }

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
        resetSecondarySkillUI();
        setSelectedSecondarySkill([]);
        fetchTechSkills();
        fetchEmpList();
    }, [technologies])

    useEffect(() => {
        fetchEmpList();
    }, [selectedLocation, selectedExp, selectedSecondarySkill])

    const resetSecondarySkillUI = () => {

        let secondarySkillCheckboxes = document.querySelectorAll('input[type=checkbox]');
        for(var i = 0; i < secondarySkillCheckboxes.length; i++) {
            secondarySkillCheckboxes[i].checked = false;   
        }
    }

    const filterBySecondarySkill = (empList) => {
        let empFilteredList = empList;
            if (selectedSecondarySkill.length > 0) {
                empFilteredList = empList.filter((emp) => {
                    let found = false;

                    selectedSecondarySkill.forEach((secondarySkill) => {
                        if (emp.secondary_skills.trim().toLowerCase().indexOf(secondarySkill.trim().toLowerCase()) >= 0) {
                            found = true;
                            return;    
                        }
                    }) 
                    return found;     
                });
            }
            setEmpFilteredList(empFilteredList);
    }

    const handleTechSkillChange = (event) => {
        setSelectedSecondarySkill((prev) => {
            if (event.target.checked) {
                return [event.target.value, ...prev];
            }
            else {
                return prev.filter((skill) => {
                    return skill !== event.target.value
                });
            }
        });
    }


    const fetchTechSkills = () => {
        axios.get(`/application/getTechnologies`, {
            params: {
                skill: technologies ? technologies?.split(',') : null,
            }
            })
            .then(function (response) {
                setTechSkills(response.data.technologies);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const fetchEmpList = () => {

        axios.get(`employees/filter`, {
            params: {
                skill: technologies ? technologies?.split(',') : null,
                exp: selectedExp >= 0 ? selectedExp : null,
                location: selectedLocation            
            }
        }
        )
            .then(function (response) {
                setEmpList(response.data.employees);
            filterBySecondarySkill(response.data.employees);
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
                            <div className="col-12 skill_height">
                    {techSkills.map((techSkill,key) => {
                        return(<div className="form-check pe-1" >
                                    <input className="form-check-input" type="checkbox" key={key}    onChange={handleTechSkillChange} value={techSkill} id="flexCheckDefault"/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                         {techSkill}
                                    </label>
                                </div>)
                    })
                    }
                    </div>
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
    <div className="col-xs-12 col-sm-12 col-md-10 float-left col-12">
        <p className="pull-right visible-xs banner_background">
            <button type="button" className="btn btn-primary btn-xs" data-toggle="offcanvas"><i className="bi bi-sliders"></i></button>
            <h3 className="banner_header">Find Your Required Talent</h3>
        </p>
        <div className="col-xs-12 col-lg-12 mx-1">
            {empFilteredList && empFilteredList.map((empDetails, key)=>{
                return (
                    <EmployeeProfileCard availability={selectedAvailability} handleProfileClick={openModal} employee={empDetails} key={key}></EmployeeProfileCard>
                )
            
                })
            }                                            
        </div>
        <EmployeeProfileModal modelstatus={modalIsOpen} close={() => setIsOpen(false)} employee={empModalDetails}/>                            
    </div>
</div>
</Layout>
);
}

export default EmpFilteredList;