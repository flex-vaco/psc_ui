import React, {useState, useEffect} from 'react'
import {useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
 
 
function UserCreate() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [chkPassword, setChkPassword] = useState('');
    const [role, setRole] = useState('');
    const [roles, setRoles] = useState([]);

    const [email, setEmail] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [formErr, setFormErr] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoles();
    }, []);

    const verifyPassword = (pswd) => {
        setChkPassword(pswd)
        if (pswd !== password) {
            setIsSaving(true);
            setFormErr("Passwords Do Not Match");
        } else {
            setIsSaving(false);
            setFormErr("");
        }

    };
    const fetchRoles = () => {
        axios.get('/users/roles')
        .then(function (response) {
            console.log(response.data)
          setRoles(response.data.user_roles);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    const handleRoleChange = (e) => {
        if(e.target.value === "-select-"){
            Swal.fire({
                icon: 'warning',
                title: 'Role Name is required!',
                showConfirmButton: true
            })
        }
        setRole(e.target.value)
    }
    const handleSave = () => {
        setIsSaving(true);
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };

        const data = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            role: role,
            password: password
        }
console.log(data)
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
                                <label htmlFor="role">Role</label>
                                <input 
                                    onChange={(event)=>{setRole(event.target.value)}}
                                    value={role}
                                    type="text"
                                    className="form-control"
                                    id="role"
                                    name="role"/>
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="role">Employee Name</label>
                                <select name="role" id="role" className="form-control" onChange={handleRoleChange} > 
                                    {roles.map((rl, key) => {
                                        const sel = (rl.role == role) ? true : false;
                                        return <option key={key} value={rl.role} selected={sel}>{rl.role.toUpperCase()}</option>;
                                    })}
                                </select>
                            </div> */}
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
  
export default UserCreate;