import React,{ useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../../components/Layout"

function ClientList() {
    const [clientList, setClientList] = useState([])
    const navigate = useNavigate();

    const handleAddButtonClick = () => {
      navigate("/clientCreate");
    }

    useEffect(() => {
        fetchClientList()
    }, [])
  
    const fetchClientList = () => {
        axios.get('/clients')
        .then(function (response) {
          setClientList(response.data.clients);
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    const handleDelete = (client_id) => {
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
                axios.get(`/clients/delete/${client_id}`)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Client deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchClientList()
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
    };

    return (
      <Layout>
        <div className="container-fluid">
          <div className="card w-auto">
            <div className="card-header">
              <div className="row">
                <div className="col">
                </div>
                <div className="col text-center">
                  <h4>Client List</h4>
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
                    <th>Client Status</th>
                  </tr>
                </thead>
                <tbody>
                  {clientList.map((clientDetails, key) => {
                    return (
                      <tr key={key}>
                        <td>
                          <button
                            onClick={() => handleDelete(clientDetails.client_id)}
                            className="btn btn-outline-danger mx-1"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                          <Link
                            className="btn btn-outline-success mx-1 edit_icon"
                            to={`/clientEdit/${clientDetails.client_id}`}
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/projectShow/${clientDetails.client_id}`}
                          >
                            {clientDetails.name}
                          </Link>
                        </td>
                        <td>{clientDetails.location}</td>

                        <td>{clientDetails.client_contact_person}</td>
                        <td>{clientDetails.client_contact_email}</td>
                        <td>{clientDetails.client_contact_phone}</td>
                        <td>{clientDetails.status}</td>
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
  
export default ClientList;