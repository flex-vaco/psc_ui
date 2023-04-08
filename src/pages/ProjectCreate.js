import React, {useState} from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
 
 
function ProjectCreate() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [primary_skills, setPrimarySkills] = useState('');
    const [secondary_skills, setSecondarySkills] = useState('');
    const [total_work_experience_months, setTotWorkExp] = useState('');
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
    const [isSaving, setIsSaving] = useState(false)
  
    const handleSave = () => {
        setIsSaving(true);
        const config = {
          headers: {
            "Content-Length": 0,
            "Content-Type": "application/json",
          },
          responseType: "text",
        };
        const data = {
          first_name: first_name,
          last_name: last_name,
          status: status,
          email: email,
          role: role,
          primary_skills: primary_skills,
          secondary_skills: secondary_skills,
          total_work_experience_months: total_work_experience_months,
          rate_per_hour: rate_per_hour,
          vaco_join_date: vaco_join_date,
          home_location_city: home_location_city,
          office_location_city: office_location_city,
          supervisor_name: supervisor_name,
          supervisor_email: supervisor_email,
          is_onsite: is_onsite,
        };
        axios.post('/employees/add', data, config)
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Employee Details saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            setFirstName('');
            setLastName('');
            setPrimarySkills('');
            setSecondarySkills('');
            setTotWorkExp('');
            setRatePerHour('');
            setVacoJoinDate('');
            setHomeLocCity('');
            setOfficeLocCity('');
            setRole('');
            setStatus('');
            setSupervisorName('');
            setSupervisorEmail('');
            setEmail('');
            setIsOnsite(false);
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
                <h2 className="text-center mt-5 mb-3">Add New Project</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/projects">View All Projects
                        </Link>
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
                                <label htmlFor="total_work_experience_months">Total Experience (in Months)</label>
                                <input 
                                    onChange={(event)=>{setTotWorkExp(event.target.value)}}
                                    value={total_work_experience_months}
                                    type="number"
                                    className="form-control"
                                    id="total_work_experience_months"
                                    name="total_work_experience_months"/>
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
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="submit"
                                className="btn btn-outline-primary mt-3">
                                Save Employee
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ProjectCreate;