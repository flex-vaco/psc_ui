import React,{ useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../../components/Layout"
import * as Utils from "../../lib/Utils"

function EmpProjUtiliList() {
    const  [empProjUtiliList, setEmpProjUtiliList] = useState([])
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchEmpProjUtiliList()
    }, [])
    const url = "empPrjUtili";
    const fetchEmpProjUtiliList = () => {
        axios.get(`/${url}`)
        .then(function (response) {
          setEmpProjUtiliList(response.data.empProjUtili);
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    const handleDelete = (emp_proj_utili_id) => {
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
                axios.get(`/${url}/delete/${emp_proj_utili_id}`)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Utilization deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchEmpProjUtiliList();
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
          navigate("/empUtiliList");
    }

    return (
      <Layout>
        <div className="container-fluid">
          <div className="card w-auto">
            <div className="card-header">
              <h4 className="text-center">Project Utilization List</h4>
            </div>
            <div className="card-body table-responsive">
              <table className="table table-hover">
                <thead className="bg-light">
                  <tr>
                    <th>Action</th>
                    <th>Project Name</th>
                    <th>Employee Name</th>
                    <th>Week Start Date</th>
                    <th>Project Hours per Week</th>
                    <th>Allocation Hours per Week</th>
                    <th>Forecast Hours per Week</th>
                    <th>PTO Hours per Week</th>
                  </tr>
                </thead>
                <tbody>
                  {empProjUtiliList.map((empProjUtili, key) => {
                    return (
                      <tr key={key}>
                        <td>
                          <button
                            onClick={() => handleDelete(empProjUtili.emp_proj_utili_id)}
                            className="btn btn-outline-danger mx-1"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                          <Link
                            className="btn btn-outline-success mx-1"
                            to={`/empProjUtiliEdit/${empProjUtili.emp_proj_utili_id}`}
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/projectShow/${empProjUtili.projectDetails.project_id}`}
                          >
                            {empProjUtili.projectDetails.client_name}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/empShow/${empProjUtili.empDetails.emp_id}`}
                          >
                            {empProjUtili.empDetails.first_name}, 
                            {empProjUtili.empDetails.last_name}
                          </Link>
                        </td>
                        <td>{Utils.formatDateYYYYMMDD(empProjUtili.week_starting)}</td>
                        <td>{empProjUtili.proj_hours_per_week}</td>
                        <td>{empProjUtili.allc_work_hours_per_week}</td>
                        <td>{empProjUtili.forecast_hours_per_week}</td>
                        <td>{empProjUtili.pto_hours_per_week}</td>
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
  
export default EmpProjUtiliList;