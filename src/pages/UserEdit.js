import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
 
function UserEdit() {
    const [user_id, setId] = useState(useParams().id)
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [roles, setRoles] = useState([]);

    const handleRoleChange = (e) => {
        if(e.target.value === "-select-"){
            Swal.fire({
                icon: 'warning',
                title: 'Role Name is required!',
                showConfirmButton: true
            })
        }
        setRole(e.target.value)
    };

    const fetchRoles = () => {
        axios.post('/users/roles')
        .then(function (response) {
            console.log(response.data)
          setRoles(response.data.user_roles);
        })
        .catch(function (error) {
          console.log(error);
        })
    };

    useEffect(() => {
        fetchRoles();
    }, []);


    useEffect(() => {
        axios.get(`/users/${user_id}`)
        .then(function (response) {
            let userDetatils = response.data.user;
            setFirstName(userDetatils.first_name);
            setLastName(userDetatils.last_name);
            setPassword(userDetatils.password)
            setRole(userDetatils.role);
            setEmail(userDetatils.email);
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

    const handleSave = () => {
        setIsSaving(true);
        axios.post(`/users/update/${user_id}`, {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            role: role
        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'User updated successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
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
                        <h4 className="text-center">Edit User Details</h4>
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
                                <select name="role" id="role" className="form-control" onChange={handleRoleChange} > 
                                    {roles.map((rl, key) => {
                                        const sel = (rl.role == role) ? true : false;
                                        return <option key={key} value={rl.role} selected={sel}>{rl.role.toUpperCase()}</option>;
                                    })}
                                </select>
                            </div>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="submit"
                                className="btn btn-outline-primary mt-3">
                                Update User
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default UserEdit;