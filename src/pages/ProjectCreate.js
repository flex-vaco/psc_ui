import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
 
 
function ProjectCreate() {
    const [client_name, setClientName] = useState('');
    const [client_location, setClientLocation] = useState('');
    const [contact_person, setContactPerson] = useState('');
    const [contact_email, setContactEmail] = useState('');
    const [contact_phone, setContactPhone] = useState('');
    const [start_date, setStartDate] = useState('');
    const [expected_end_date, setExpectedEndDate] = useState('');
    const [actual_end_date, setActualEndDate] = useState('');
    const [technologies_required, setTechRequired] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [head_count, setHeadCount] = useState('');
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/projects");
    }

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
          client_name: client_name,
          client_location: client_location,
          contact_person: contact_person,
          contact_email: contact_email,
          contact_phone: contact_phone,
          start_date: start_date,
          expected_end_date: expected_end_date,
          actual_end_date: actual_end_date,
          technologies_required: technologies_required,
          description: description,
          status: status,
          head_count: head_count,
        };
        axios.post('/projects/add', data, config)
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Project Details saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            navigate("/projects");
            setIsSaving(false);
            setClientName('');
            setClientLocation('');
            setContactPerson('');
            setContactEmail('');
            setContactPhone('');
            setStartDate('');
            setExpectedEndDate('');
            setActualEndDate('');
            setTechRequired('');
            setDescription('');
            setStatus('');
            setHeadCount(''); 
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
                        <h4 className="text-center">Add New Project</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="client_name">Client Name</label>
                                <input 
                                    onChange={(event)=>{setClientName(event.target.value)}}
                                    value={client_name}
                                    type="text"
                                    className="form-control"
                                    id="client_name"
                                    name="client_name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="client_location">Client Location</label>
                                <input 
                                    onChange={(event)=>{setClientLocation(event.target.value)}}
                                    value={client_location}
                                    type="text"
                                    className="form-control"
                                    id="client_location"
                                    name="client_location"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact_person">Contact Person Name</label>
                                <input 
                                    onChange={(event)=>{setContactPerson(event.target.value)}}
                                    value={contact_person}
                                    type="text"
                                    className="form-control"
                                    id="contact_person"
                                    name="contact_person"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact_email">Contact Email</label>
                                <input 
                                    onChange={(event)=>{setContactEmail(event.target.value)}}
                                    value={contact_email}
                                    type="email"
                                    className="form-control"
                                    id="contact_email"
                                    name="contact_email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact_phone">Contact Phone</label>
                                <input 
                                    onChange={(event)=>{setContactPhone(event.target.value)}}
                                    value={contact_phone}
                                    type="number"
                                    className="form-control"
                                    id="contact_phone"
                                    name="contact_phone"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="start_date">Project Start Date</label>
                                <input 
                                    onChange={(event)=>{setStartDate(event.target.value)}}
                                    value={start_date}
                                    type="date"
                                    className="form-control"
                                    id="start_date"
                                    name="start_date"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="expected_end_date">Expected End Date</label>
                                <input 
                                    onChange={(event)=>{setExpectedEndDate(event.target.value)}}
                                    value={expected_end_date}
                                    type="date"
                                    className="form-control"
                                    id="expected_end_date"
                                    name="expected_end_date"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="actual_end_date">Project Actual Date</label>
                                <input 
                                    onChange={(event)=>{setActualEndDate(event.target.value)}}
                                    value={actual_end_date}
                                    type="date"
                                    className="form-control"
                                    id="actual_end_date"
                                    name="actual_end_date"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Project Description</label>
                                <textarea 
                                    value={description}
                                    onChange={(event)=>{setDescription(event.target.value)}}
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    name="description"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="technologies_required">Technologies Required</label>
                                <textarea 
                                    value={technologies_required}
                                    onChange={(event)=>{setTechRequired(event.target.value)}}
                                    className="form-control"
                                    id="technologies_required"
                                    rows="3"
                                    name="technologies_required"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Project Status</label>
                                <input 
                                    value={status}
                                    onChange={(event)=>{setStatus(event.target.value)}}
                                    type="text"
                                    className="form-control"
                                    id="status"
                                    name="status"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="head_count">Head Count</label>
                                <input 
                                    onChange={(event)=>{setHeadCount(event.target.value)}}
                                    value={head_count}
                                    type="number"
                                    className="form-control"
                                    id="head_count"
                                    name="head_count"/>
                            </div>
                            <button 
                                disabled={isSaving}
                                onClick={handleCancel} 
                                type="submit"
                                className="btn btn-outline-secondary mt-3 me-3">
                                Cancel
                            </button>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="submit"
                                className="btn btn-outline-primary mt-3 me-3">
                                Save Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ProjectCreate;