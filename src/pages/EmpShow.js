import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../components/Layout"
 
function EmpShow() {
    const [emp_id, setId] = useState(useParams().id)
    const [empDetails, setEmpDetails] = useState({
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
 
    useEffect(() => {
        axios.get(`/employees/${emp_id}`)
        .then(function (response) {
            setEmpDetails(response.data.employees[0])
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [])
  
    return (
        <Layout>
           <div className="container">
                <div className="card">
                <div className="card-header">
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col text-center">
                        <h4>Employee Details</h4>
                    </div>
                    <div className="col">
                    <Link 
                        to="/employees"
                        type="button"
                        className="btn btn-outline-secondary float-end">
                        Back to List
                    </Link>
                </div>
                </div>
              </div>
                    <div className="card-body">
                    <div className="row">
                    <div className="col fw-bold">
                        <p><b className="text-muted">Name: </b>{empDetails.first_name}, {empDetails.last_name}</p>
                        <p><b className="text-muted">Role: </b>{empDetails.role}</p>
                        <p><b className="text-muted">Email: </b>{empDetails.email}</p>
                        <p><b className="text-muted">Primary Skills: </b>{empDetails.primary_skills}</p>
                        <p><b className="text-muted">Secondary Skills: </b>{empDetails.secondary_skills}</p>
                        <p><b className="text-muted">Education: </b>{empDetails.education}</p>
                        <p><b className="text-muted">Profile Information: </b>{empDetails.profile_information}</p>
                        <p><b className="text-muted">Status: </b>{empDetails.status}</p>
                        <p><b className="text-muted">Experience: </b>{empDetails.total_work_experience_years} years</p>
                        <p><b className="text-muted">Hourly Rate: </b>{empDetails.rate_per_hour} USD</p>
                        <p><b className="text-muted">Home Location City: </b>{empDetails.home_location_city}</p>
                        <p><b className="text-muted">Office Location City: </b>{empDetails.office_location_city}</p>
                        <p><b className="text-muted">Supervisor Name: </b>{empDetails.supervisor_name}</p>
                        <p><b className="text-muted">Supervisor Email: </b>{empDetails.supervisor_email}</p>
                        <p><b className="text-muted">Is working On-site? </b>{(empDetails.is_onsite) ? "YES" : "NO"}</p>
                        <p><b className="text-muted">Resume: </b>
                            <a href={(empDetails.resume) ? 
                              `${process.env.REACT_APP_API_BASE_URL}/uploads/resume/${empDetails.resume}` : null} 
                              target="_blank">
                              <i className="bi bi-person-lines-fill"></i>
                            </a>
                        </p>
                        </div>
                        <div className="col">
                        <p> <img className="rounded-pill profile_pictureempdetails" 
                            src = {(empDetails.profile_picture) ?
                                `${process.env.REACT_APP_API_BASE_URL}/uploads/profile_picture/${empDetails.profile_picture}` : 
                                `${process.env.REACT_APP_API_BASE_URL}/uploads/profile_picture/profile_picture-default.png`} 
                            />
                        </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default EmpShow;