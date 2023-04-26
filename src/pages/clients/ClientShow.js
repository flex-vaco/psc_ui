import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../../components/Layout"
 
function ClientShow() {
    const [client_id, setId] = useState(useParams().id)
    const [clientDetails, setClientDetails] = useState({
        name: '',
        location: '',
        client_contact_person: '',
        client_contact_email: '',
        client_contact_phone: '',
        status: '',
    })
 
    useEffect(() => {
        axios.get(`/clients/${client_id}`)
        .then(function (response) {
            setClientDetails(response.data.clients[0])
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [])
  
    return (
        <Layout>
           <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h4 className="text-center">Client Details</h4>
                    </div>
                    <div className="card-body">
                        <p><b className="text-muted">Client Name: </b>{clientDetails.name}</p>
                        <p><b className="text-muted">Location: </b>{clientDetails.location}</p>
                        <p><b className="text-muted">Contact Person: </b>{clientDetails.client_contact_person}</p>
                        <p><b className="text-muted">Contact Person Email: </b>{clientDetails.client_contact_email}</p>
                        <p><b className="text-muted">Contact Person Phone: </b>{clientDetails.client_contact_phone}</p>
                        <p><b className="text-muted">Status: </b>{clientDetails.status}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ClientShow;