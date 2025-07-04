import React, {useState, useEffect} from 'react'
import {useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import APP_CONSTANTS from "../appConstants";
import Multiselect from 'multiselect-react-dropdown';
 
function UserCreate() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [chkPassword, setChkPassword] = useState('');
    const [role, setRole] = useState('');
    const [roles, setRoles] = useState([]);
    const [clients, setClients] = useState([]);
    const [selectedClients, setSelectedClients] = useState([]);

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState(null);

    const [employees, setEmployees] = useState([]);
    const [empId, setEmpId] = useState(null);
    const [email, setEmail] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [formErr, setFormErr] = useState("");

    const [showEmpSel, setShowEmpSel] = useState(false);
    const [showClientSel, setShowClientSel] = useState(false);
    const [showProjectSel, setShowProjectSel] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchRoles();
        fetchClients();
        fetchProjects();
        fetchEmployees();
    }, []);

    const verifyPassword = (pswd) => {
        setChkPassword(pswd)
        if (pswd !== password) {
            setIsSaving(true);
            setFormErr("Passwords Do Not Match");
        } else if (pswd.length < 8 || password.length < 8) {
            setIsSaving(true);
            setFormErr("Password length should be minimum 8 charaters");
        } else {
            setIsSaving(false);
            setFormErr("");
        }
    };

    const handleCancel = () => {
        navigate("/userList");
    }
    const fetchRoles = () => {
        axios.post('/users/roles')
        .then(function (response) {
            console.log(response.data)
          setRoles(response.data.user_roles);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    const fetchClients = () => {
        axios.get('/clients')
        .then(function (response) {
            setClients(response.data.clients);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    const fetchEmployees = () => {
        axios.get('/employees')
        .then(function (response) {
           setEmployees(response.data.employees);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    const fetchProjects = () => {
        axios.get('/projects')
        .then(function (response) {
           setProjects(response.data.projects);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    const handleRoleChange = (e) => {
        const roleVal =  e.target.value;
        e.stopPropagation();

        if(roleVal !== APP_CONSTANTS.USER_ROLES.EMPLOYEE){
            setEmail('');
            setFirstName('');
            setLastName('');
        }
        
        if (roleVal === "-select-") {
            Swal.fire({
                icon: 'warning',
                title: 'Role Name is required!',
                showConfirmButton: true
            })
        } else {
            setRole(roleVal);
            switch (roleVal) {
                case APP_CONSTANTS.USER_ROLES.EMPLOYEE:
                    setShowEmpSel(true);
                    setShowClientSel(false);
                    setShowProjectSel(false)
                    break;
                case APP_CONSTANTS.USER_ROLES.PRODUCER:
                    setShowEmpSel(false);
                    setShowClientSel(true);
                    setShowProjectSel(false)
                    break;
                case APP_CONSTANTS.USER_ROLES.ADMINISTRATOR:
                case APP_CONSTANTS.USER_ROLES.MANAGER:
                    setShowEmpSel(false);
                    setShowClientSel(false);
                    setShowProjectSel(false)
                    break;
                default:
                    setShowEmpSel(false);
                    setShowClientSel(false);
                    setShowProjectSel(false)
                    break;
            }
        }
    }

    const handlEmployeeChange = (e) => {
        const selectedEmpId = parseInt(e.target.value);
        const empRequiredRoles = [APP_CONSTANTS.USER_ROLES.EMPLOYEE];
        if((empRequiredRoles.includes(role)) && (e.target.value === "-select-")){
            Swal.fire({
                icon: 'warning',
                title: 'Employee Name is required!',
                showConfirmButton: true
            })
        }
        setEmpId(selectedEmpId);
        const selectedEmployee = employees.filter(e => e.emp_id === selectedEmpId);
        setEmail(selectedEmployee[0].email);
        setFirstName(selectedEmployee[0].first_name);
        setLastName(selectedEmployee[0].last_name);
    }
    const handleProjectChange = (e) => {
        if(e.target.value === "-select-"){
            Swal.fire({
                icon: 'warning',
                title: 'Project Name is required!',
                showConfirmButton: true
            })
        }
        setProject(e.target.value)
    }
    const handleSave = () => {
        setIsSaving(true);
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };

        let data = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            role: role,
            password: password,
            emp_id: empId,
            project_id: project
        }

        const clientIds = selectedClients.map(s=>s.client_id);
        if ((role === APP_CONSTANTS.USER_ROLES.PRODUCER) && (clientIds.length === 0)) {
            Swal.fire({
                icon: 'warning',
                title: 'Please select a Client for Producer',
                showConfirmButton: true
            }).then((res) => {
                setIsSaving(false);
                return;
            })
        } else {
            data.client_ids = clientIds;
        }

        axios.post('/users/sign-up', data, config)
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'User saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            navigate("/userList");
            setIsSaving(false);
            setFirstName('');
            setLastName('');
            setRole('');
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

    const handleClientAdd = (e)=>{
        setSelectedClients(e);
    }

    const handleClientRemove = (e)=>{
        setSelectedClients(e);
    }
  
    return (
        <Layout>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h4 className="text-center">Add User</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="role">Role Name</label>
                                <select name="role" id="role" className="form-control" onChange={handleRoleChange} > 
                                    <option value="-select-" > -- Select a Role -- </option>
                                    {roles.map((rl, key) => {
                                        return <option key={key} value={rl.role}>{rl.role.toUpperCase()}</option>;
                                    })}
                                </select>
                            </div>
                            {showClientSel ? 
                            (<div className="form-group">
                                <label htmlFor="client">Client</label>
                                <Multiselect
                                    options={clients} 
                                    onSelect={handleClientAdd} 
                                    onRemove={handleClientRemove} 
                                    showCheckbox={true}
                                    displayValue="name" 
                                    closeIcon="close"
                                />
                            </div>) : ''}
                            {showProjectSel ? 
                            (<div className="form-group">
                                <label htmlFor="project">Project</label>
                                <select name="project" id="project" className="form-control" onChange={handleProjectChange} > 
                                    <option value="-select-" > -- Select a Project -- </option>
                                    {projects.map((prj) => {
                                        return <option key={prj.project_id} value={prj.project_id}>{prj.project_name}</option>;
                                    })}
                                </select>
                            </div>) : ''}
                            {showEmpSel ? 
                            (<div className="form-group">
                                <label htmlFor="emp">Employee</label>
                                <select name="emp" id="emp" className="form-control" onChange={handlEmployeeChange} > 
                                    <option value="-select-" > -- Select an Employee -- </option>
                                    {employees.map((emp) => {
                                        return <option key={emp.emp_id} value={emp.emp_id}>{emp.first_name} {emp.last_name}</option>;
                                    })}
                                </select>
                            </div>) : ''}
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
                                    name="email"
                                    readOnly={role === APP_CONSTANTS.USER_ROLES.EMPLOYEE}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                    onChange={(event)=>{setPassword(event.target.value)}}
                                    value={password}
                                    type="password"
                                    className="form-control"
                                    id="passwordy"
                                    name="password"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="re_password">Re Type Password</label>
                                {(formErr)? <p className="text-danger"> {formErr}</p> : ""}
                                <input 
                                    onChange={(event)=>{verifyPassword(event.target.value)}}
                                    value={chkPassword}
                                    type="password"
                                    className="form-control"
                                    id="re_password"
                                    name="re_password"/>
                            </div>
                            <button 
                                disabled={isSaving}
                                onClick={handleCancel} 
                                type="submit"
                                className="btn btn-outline-light mt-3 me-3">
                                Cancel
                            </button>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="submit"
                                className="btn btn-outline-info mt-3 me-3">
                                Save User
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default UserCreate;