import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import * as Utils from "../lib/Utils"
import * as AppFunc from "../lib/AppFunctions";

function EmpEdit() {
    const [emp_id, setId] = useState(useParams().id)
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [primary_skills, setPrimarySkills] = useState('');
    const [secondary_skills, setSecondarySkills] = useState('');
    const [education, setEducation] = useState('');
    const [profile_information, setProfileInformation] = useState('');
    const [total_work_experience_years, setTotWorkExp] = useState('');
    const [rate_per_hour, setRatePerHour] = useState('');
    const [home_location_city, setHomeLocCity] = useState('');
    const [office_location_city, setOfficeLocCity] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [supervisor_name, setSupervisorName] = useState('');
    const [supervisor_email, setSupervisorEmail] = useState('');
    const [vaco_join_date, setVacoJoinDate] = useState('');
    const [email, setEmail] = useState('');
    const [is_onsite, setIsOnsite] = useState(false);
    const [employment_type, setSelectedEmpType] = useState('Full-time');
    const [resumeFileName, setResumeFileName] = useState('');
    const [profilePicFileName, setProfilePicFileName] = useState('');
    const [selected_resume, setSelectedResume] = useState(null);
    const [profile_picture, setSelectedProfilePicture] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();
    const httpConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
    useEffect(() => {
        axios.get(`/employees/${emp_id}`)
        .then(function (response) {
            let empDetails = response.data.employees[0];
            setFirstName(empDetails.first_name);
            setLastName(empDetails.last_name);
            setPrimarySkills(empDetails.primary_skills);
            setSecondarySkills(empDetails.secondary_skills);
            setEducation(empDetails.education);
            setProfileInformation(empDetails.profile_information);
            setTotWorkExp(empDetails.total_work_experience_years);
            setRatePerHour(empDetails.rate_per_hour);
            setVacoJoinDate(Utils.formatDateYYYYMMDD(empDetails.vaco_join_date));
            setHomeLocCity(empDetails.home_location_city);
            setOfficeLocCity(empDetails.office_location_city);
            setRole(empDetails.role);
            setStatus(empDetails.status);
            setSupervisorName(empDetails.supervisor_name);
            setSupervisorEmail(empDetails.supervisor_email);
            setEmail(empDetails.email);
            setIsOnsite(empDetails.is_onsite);
            setSelectedEmpType(empDetails.employment_type);
            setResumeFileName(empDetails.resume);
            setProfilePicFileName(empDetails.profile_picture)
        })
        .catch(function (error) {
            Swal.fire({
                 icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
        })
          
    }, [])
  
    const handleEmpTypeChange = (event) => {
        setSelectedEmpType(event.target.value);
    }
    
    let statusOptions = '';
    const getStatusOptions = () => {
        const validStatuses = ['Active', 'Inactive'];
        validStatuses.forEach(s => {
            statusOptions = statusOptions+`<option value=${s}>${s}</option> `
        });
    }

    const handleResumeChange = (e) => {
        if (AppFunc.validateUploadFile(e.target.files[0], "resume")) {
            setSelectedResume(e.target.files[0]);
        } else {
            document.getElementById("resume").value = null;
        }
    };
    
    const handleProfileChange = (e) => {
        if (AppFunc.validateUploadFile(e.target.files[0], "image")) {
            setSelectedProfilePicture(e.target.files[0]);
        } else {
            document.getElementById("profile_picture").value = null;
        }    
    };

    getStatusOptions();
    const handleSave = () => {
        setIsSaving(true);
        var onSite = Number(is_onsite);
        const data = new FormData();
        data.append('first_name', first_name);
        data.append('last_name', last_name);
        data.append('status', status);
        data.append('email', email);
        data.append('role', role);
        data.append('primary_skills', primary_skills);
        data.append('secondary_skills', secondary_skills);
        data.append('education', education);
        data.append('profile_information', profile_information);
        data.append('total_work_experience_years', total_work_experience_years);
        data.append('rate_per_hour', rate_per_hour);
        data.append('vaco_join_date', vaco_join_date);
        data.append('home_location_city', home_location_city);
        data.append('office_location_city', office_location_city);
        data.append('supervisor_name', supervisor_name);
        data.append('supervisor_email', supervisor_email);
        data.append('is_onsite', onSite);
        data.append('employment_type', employment_type);
        data.append('profile_pic_file_name', profilePicFileName);
        data.append('resume_file_name', resumeFileName);
        if(selected_resume) data.append('resume', selected_resume);
        if(profile_picture) data.append('profile_picture', profile_picture);


        axios.post(`/employees/update/${emp_id}`, data, {config:httpConfig})
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Employeee updated successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            navigate("/employees");
            window.location.reload(true);
        })
        .catch(function (error) {
            Swal.fire({
                 icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
        });
    }
  
    return (
        <Layout>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h4 className="text-center">Edit Employee Details</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input 
                                    onChange={(event)=>{setFirstName(event.target.value)}}
                                    value={first_name}
                                    type="text"
                                    className="form-control"
                                    id="first_name"
                                    name="first_name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input 
                                    onChange={(event)=>{setLastName(event.target.value)}}
                                    value={last_name}
                                    type="text"
                                    className="form-control"
                                    id="last_name"
                                    name="last_name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email ID</label>
                                <input 
                                    onChange={(event)=>{setEmail(event.target.value)}}
                                    value={email}
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="total_work_experience_years">Total Experience in years</label>
                                <input 
                                    onChange={(event)=>{setTotWorkExp(event.target.value)}}
                                    value={total_work_experience_years}
                                    type="number"
                                    className="form-control"
                                    id="total_work_experience_years"
                                    name="total_work_experience_years"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="rate_per_hour">Rate Per Hour (USD)</label>
                                <input 
                                    onChange={(event)=>{setRatePerHour(event.target.value)}}
                                    value={rate_per_hour}
                                    type="number"
                                    className="form-control"
                                    id="rate_per_hour"
                                    name="rate_per_hour"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="primary_skills">Primary Skills (use comma to seperate skills)</label>
                                <textarea 
                                    value={primary_skills}
                                    onChange={(event)=>{setPrimarySkills(event.target.value)}}
                                    className="form-control"
                                    id="primary_skills"
                                    rows="3"
                                    name="primary_skills"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="secondary_skills">Secondary Skills (use comma to seperate skills)</label>
                                <textarea 
                                    value={secondary_skills}
                                    onChange={(event)=>{setSecondarySkills(event.target.value)}}
                                    className="form-control"
                                    id="secondary_skills"
                                    rows="3"
                                    name="secondary_skills"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="education">Education</label>
                                <textarea 
                                    value={education}
                                    onChange={(event)=>{setEducation(event.target.value)}}
                                    className="form-control"
                                    id="education"
                                    rows="3"
                                    name="education"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="profile_information">Profile Information</label>
                                <textarea 
                                    value={profile_information}
                                    onChange={(event)=>{setProfileInformation(event.target.value)}}
                                    className="form-control"
                                    id="profile_information"
                                    rows="3"
                                    name="profile_information"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <input 
                                    onChange={(event)=>{setRole(event.target.value)}}
                                    value={role}
                                    type="text"
                                    className="form-control"
                                    id="role"
                                    name="role"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="resume">Employment Type</label><br/>
                                
                                <input
                                    type="radio"
                                    value="Full-time"
                                    className="form-check-input"
                                    checked={employment_type === 'Full-time'}
                                    name="employment_type"
                                    onChange={handleEmpTypeChange}
                                />
                                <label className="radio_emptype">
                                    Full Time
                                </label>
                                <input
                                    type="radio"
                                    value="Part-time"
                                    className="form-check-input"
                                    checked={employment_type === 'Part-time'}
                                    name="employment_type"
                                    onChange={handleEmpTypeChange}
                                />
                                <label className="radio_emptype">
                                    Part Time
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="vaco_join_date">Joining Date at Vaco</label>
                                <input 
                                    onChange={(event)=>{setVacoJoinDate(event.target.value)}}
                                    value={vaco_join_date}
                                    type="date"
                                    className="form-control"
                                    id="vaco_join_date"
                                    name="vaco_join_date"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select name="status" id="status" className="form-control" onChange={(event)=>{setStatus(event.target.value)}}>
                                    <option value={status} selected={true}>{status}</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="home_location_city">Home Location City</label>
                                <input 
                                    onChange={(event)=>{setHomeLocCity(event.target.value)}}
                                    value={home_location_city}
                                    type="text"
                                    className="form-control"
                                    id="home_location_city"
                                    name="home_location_city"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="office_location_city">Office Location City</label>
                                <input 
                                    onChange={(event)=>{setOfficeLocCity(event.target.value)}}
                                    value={office_location_city}
                                    type="text"
                                    className="form-control"
                                    id="office_location_city"
                                    name="office_location_city"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="supervisor_name">Supervisor Name</label>
                                <input 
                                    onChange={(event)=>{setSupervisorName(event.target.value)}}
                                    value={supervisor_name}
                                    type="text"
                                    className="form-control"
                                    id="supervisor_name"
                                    name="supervisor_name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="supervisor_email">Supervisor Email</label>
                                <input 
                                    onChange={(event)=>{setSupervisorEmail(event.target.value)}}
                                    value={supervisor_email}
                                    type="email"
                                    className="form-control"
                                    id="supervisor_email"
                                    name="supervisor_email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="resume">Resume</label>
                                <div className="input-group">
                                <span style={{width:"35%"}} className="input-group-text fw-bold">{resumeFileName}</span>

                                    <input
                                    id="resume"
                                    type="file"
                                    name="resume"
                                    className="form-control"
                                    onChange={handleResumeChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="profile_picture">Profile Picture</label>
                                <div className="input-group">
                                <span style={{width:"35%"}} className="input-group-text fw-bold">{profilePicFileName}</span>
                                    <input
                                    id="profile_picture"
                                    type="file"
                                    name="profile_picture"
                                    className="form-control"
                                    onChange={handleProfileChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="is_onsite">Is working On site?</label>
                                <input 
                                    type="checkbox"
                                    checked={is_onsite}
                                    className="form-check-input form-control"
                                    id="is_onsite"
                                    name="is_onsite"
                                    onChange={()=>{setIsOnsite(!is_onsite)}}
                                    />
                            </div>
                            <Link 
                                to="/employees"
                                disabled={isSaving}
                                className="btn btn-outline-light mt-3 me-3">
                                Cancel
                            </Link>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="button"
                                className="btn btn-outline-info mt-3">
                                Update Employee
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default EmpEdit;