import React,{ useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
 
function ProjectList() {
    const  [projectList, setProjectList] = useState([])
  
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
  
    const handleDelete = (id) => {
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
                axios.get(`/projects/delete/${id}`)
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
           <div className="container">
            <h2 className="text-center mt-5 mb-3">Projects List</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-primary"
                            to="/projectCreate">Create New Project
                        </Link>
                    </div>
                    <div className="card-body">
              
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Client Name</th>
                                    <th>Point of Contact</th>
                                    <th>Project Status</th>
                                    <th>Technologies Involved</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectList.map((projectDetails, key)=>{
                                    return (
                                        <tr key={key}>
                                            <td>{projectDetails.client_name}</td>
                                            <td>{projectDetails.contact_person}</td>
                                            <td>{projectDetails.status}</td>
                                            <td>{projectDetails.technologies_required}</td>
                                            <td>
                                                <Link
                                                    to={`/show/${projectDetails.id}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Show
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/edit/${projectDetails.id}`}>
                                                    Edit
                                                </Link>
                                                <button 
                                                    onClick={()=>handleDelete(projectDetails.id)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
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