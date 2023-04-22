import React,{ useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import * as Utils from "../lib/Utils"

function ProjectList() {
    const [projectList, setProjectList] = useState([])
    const navigate = useNavigate();

    const handleAddButtonClick = () => {
      navigate("/projectCreate");
    }

    useEffect(() => {
        fetchProjectList()
    }, [])
  
    const fetchProjectList = () => {
        axios.get('/projects')
        .then(function (response) {
          setProjectList(response.data.projects);
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    const handleDelete = (project_id) => {
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
                axios.get(`/projects/delete/${project_id}`)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Project deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchProjectList()
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
                  <h4>Project List</h4>
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
                    <th>Client Name</th>
                    <th>Client Location</th>
                    <th>Contact Person</th>
                    <th>Contact Email</th>
                    <th>Contact Phone</th>
                    <th>Start Date</th>
                    <th>Expected End Date</th>
                    <th>Actual End Date</th>
                    <th>Project Status</th>
                    <th>Technologies Involved</th>
                    <th>Head Count</th>
                  </tr>
                </thead>
                <tbody>
                  {projectList.map((projectDetails, key) => {
                    return (
                      <tr key={key}>
                        <td>
                          <button
                            onClick={() => handleDelete(projectDetails.project_id)}
                            className="btn btn-outline-danger mx-1"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                          <Link
                            className="btn btn-outline-success mx-1"
                            to={`/projectEdit/${projectDetails.project_id}`}
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/projectShow/${projectDetails.project_id}`}
                          >
                            {projectDetails.client_name}
                          </Link>
                        </td>
                        <td>{projectDetails.client_location}</td>

                        <td>{projectDetails.contact_person}</td>
                        <td>{projectDetails.contact_email}</td>
                        <td>{projectDetails.contact_phone}</td>
                        <td>{Utils.formatDateYYYYMMDD(projectDetails.start_date)}</td>
                        <td>{Utils.formatDateYYYYMMDD(projectDetails.expected_end_date)}</td>
                        <td>{Utils.formatDateYYYYMMDD(projectDetails.actual_end_date)}</td>
                        <td>{projectDetails.status}</td>
                        <td>{projectDetails.technologies_required}</td>
                        <td>{projectDetails.head_count}</td>

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
  
export default ProjectList;