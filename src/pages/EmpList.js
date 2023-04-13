import React,{ useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import * as Utils from "../lib/Utils"

function EmpList() {
    const  [empList, setEmpList] = useState([])
  
    useEffect(() => {
        fetchEmpList()
    }, [])
  
    const fetchEmpList = () => {
        axios.get('/employees')
        .then(function (response) {
          setEmpList(response.data.employees);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  
    const handleDelete = (emp_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`/employees/delete/${emp_id}`)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Employee deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchEmpList()
                })
                .catch(function (error) {
                    Swal.fire({
                         icon: 'error',
                        title: 'An Error Occured!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
            }
          })
    }
  
    return (
      <Layout>
        <div className="container-fluid">
          <div className="card w-auto">
            <div className="card-header">
              <h4 className="text-center">Employee List</h4>
            </div>
            <div className="card-body table-responsive">
              <table className="table table-hover">
                <thead className="bg-light">
                  <tr>
                    <th>Action</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Primary Skills</th>
                    <th>Secondary Skills</th>
                    <th>Status</th>
                    <th>Exp.(yrs.)</th>
                    <th>Rate/hr</th>
                    <th>Vaco Join Date</th>
                    <th>Home Location</th>
                    <th>Office Location</th>
                    <th>Supervisor</th>
                    <th>Supervisor Email</th>
                    <th>On Site</th>
                  </tr>
                </thead>
                <tbody>
                  {empList.map((empDetails, key) => {
                    return (
                      <tr key={key}>
                        <td>
                          <button
                            onClick={() => handleDelete(empDetails.emp_id)}
                            className="btn btn-outline-danger" 
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                          <Link
                            className="btn btn-outline-success"
                            to={`/empEdit/${empDetails.emp_id}`}
                          >
                            <i className="bi bi-pencil" font-size="2rem;"></i>
                          </Link>
                        </td>
                        <td>
                          <Link to={`/empShow/${empDetails.emp_id}`}>
                            {empDetails.first_name}, {empDetails.last_name}
                          </Link>
                        </td>
                        <td>{empDetails.email}</td>
                        <td>{empDetails.role}</td>
                        <td>{empDetails.primary_skills}</td>
                        <td>{empDetails.secondary_skills}</td>
                        <td>{empDetails.status}</td>
                        <td>{empDetails.total_work_experience_years}</td>
                        <td>{empDetails.rate_per_hour}</td>
                        <td>{Utils.formatDateYYYYMMDD(empDetails.vaco_join_date)}</td>
                        <td>{empDetails.home_location_city}</td>
                        <td>{empDetails.office_location_city}</td>
                        <td>{empDetails.supervisor_name}</td>
                        <td>{empDetails.supervisor_email}</td>
                        <td>{(empDetails.is_onsite) ? "YES" : "NO"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    );
}
  
export default EmpList;