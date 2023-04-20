import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import * as Utils from "../lib/Utils"
 
function UserEdit() {
    const [user_id, setId] = useState(useParams().id)
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [chkPassword, setChkPassword] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [formErr, setFormErr] = useState("");

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
                                <input 
                                    onChange={(event)=>{setRole(event.target.value)}}
                                    value={role}
                                    type="text"
                                    className="form-control"
                                    id="role"
                                    name="role"/>
                            </div>
                            {/* <div className="form-group">
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
                            </div> */}
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="submit"
                                className="btn btn-outline-primary mt-3">
                                Updete User
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default UserEdit;