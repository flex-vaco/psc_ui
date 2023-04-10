import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../components/Layout"
 
function EmpShow() {
    const [id, setId] = useState(useParams().id)
    const [empDetails, setEmpDetails] = useState({
        first_name: '',
        last_name: '',
        status: '',
        email: '',
        role: '',
        primary_skills: '',
        secondary_skills: '',
        total_work_experience_months: '',
        rate_per_hour: '',
        vaco_join_date: '',
        home_location_city: '',
        office_location_city: '',
        supervisor_name: '',
        supervisor_email: '',
        is_onsite: '',
    })
 
    useEffect(() => {
        axios.get(`/employees/${id}`)
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
            <h2 className="text-center mt-5 mb-3">Employee Details</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/"> View All Employees
                        </Link>
                    </div>
                    <div className="card-body">
                        <p><b className="text-muted">Name: </b>{empDetails.first_name}, {empDetails.last_name}</p>
                        <p><b className="text-muted">Role: </b>{empDetails.role}</p>
                        <p><b className="text-muted">Email: </b>{empDetails.email}</p>
                        <p><b className="text-muted">Primary Skills: </b>{empDetails.primary_skills}</p>
                        <p><b className="text-muted">Secondary Skills: </b>{empDetails.secondary_skills}</p>
                        <p><b className="text-muted">Statuss: </b>{empDetails.status}</p>
                        <p><b className="text-muted">Experience: </b>{empDetails.total_work_experience_months} months</p>
                        <p><b className="text-muted">Hourly Rate: </b>{empDetails.rate_per_hour} USD</p>
                        <p><b className="text-muted">Home Location City: </b>{empDetails.home_location_city}</p>
                        <p><b className="text-muted">Office Location City: </b>{empDetails.office_location_city}</p>
                        <p><b className="text-muted">Supervisor Name: </b>{empDetails.supervisor_name}</p>
                        <p><b className="text-muted">Supervisor Email: </b>{empDetails.supervisor_email}</p>
                        <p><b className="text-muted">Is working On-site? </b>{(empDetails.is_onsite) ? "YES" : "NO"}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default EmpShow;