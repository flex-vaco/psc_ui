import React,{ useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import * as Utils from "../lib/Utils"

function EmpProjAlocList() {
    const  [empProjAlocList, setEmpProjAlocList] = useState([])
  
    const navigate = useNavigate();

    const handleAddButtonClick = () => {
      navigate("/empProjCreate");
    }

    useEffect(() => {
        fetchEmpProjAlocList()
    }, [])
    const url = "empPrjAloc";
    const fetchEmpProjAlocList = () => {
        axios.get(`/${url}`)
        .then(function (response) {
          setEmpProjAlocList(response.data.empProjAlloc);
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    const handleDelete = (emp_proj_aloc_id) => {
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
                axios.get(`/${url}/delete/${emp_proj_aloc_id}`)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Allocation deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchEmpProjAlocList();
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
              <div className="row">
                <div className="col">
                </div>
                <div className="col text-center">
                  <h4>Allocation List</h4>
                </div>
                <div className="col">
                  <button 
                    type="button"
                    onClick={handleAddButtonClick}
                    className="btn btn-outline-primary float-end">
                    ADD <i className="bi bi-plus-square"></i> 
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body table-responsive">
              <table className="table table-hover">
                <thead className="bg-light">
                  <tr>
                    <th>Action</th>
                    <th>Project Name</th>
                    <th>Employee Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Work Location</th>
                    <th>Hours per Day</th>
                    <th>Shift Start Time</th>
                    <th>Shift End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {empProjAlocList.map((empProjAlloc, key) => {
                    return (
                      <tr key={key}>
                        <td>
                          <button
                            onClick={() => handleDelete(empProjAlloc.emp_proj_aloc_id)}
                            className="btn btn-outline-danger mx-1"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                          <Link
                            className="btn btn-outline-success mx-1"
                            to={`/empProjEdit/${empProjAlloc.emp_proj_aloc_id}`}
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/projectShow/${empProjAlloc.projectDetails.project_id}`}
                          >
                            {empProjAlloc.projectDetails.client_name}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/empShow/${empProjAlloc.empDetails.emp_id}`}
                          >
                            {empProjAlloc.empDetails.first_name}, 
                            {empProjAlloc.empDetails.last_name}
                          </Link>
                        </td>
                        <td>{Utils.formatDateYYYYMMDD(empProjAlloc.start_date)}</td>
                        <td>{Utils.formatDateYYYYMMDD(empProjAlloc.end_date)}</td>
                        <td>{empProjAlloc.work_location}</td>
                        <td>{empProjAlloc.hours_per_day}</td>
                        <td>{empProjAlloc.shift_start_time}</td>
                        <td>{empProjAlloc.shift_end_time}</td>
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
  
export default EmpProjAlocList;