import React,{ useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../../components/Layout"
import * as Utils from "../../lib/Utils";
import HiringModal from '../../components/HiringModal';

function EnquiredByMe() {
    const [hiringList, setHiringList] = useState([])
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [hiringModalDetails, setHiringModalDetails] = useState({});
    const [hiringModalComments, setHiringModalComments] = useState({})

    useEffect(() => {
        fetchHiringListByMe()
    }, [])
  
    const fetchHiringListByMe = () => {
        axios.get('/hirings/enquiredbyme')
        .then(function (response) {
          setHiringList(response.data.hirings);
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    const openModal = (hiringId) => {
      setHiringModalDetails([]);
      setHiringModalComments([]);

      setIsOpen(true);
        axios.get(`/hirings/${hiringId}`)
          .then((response) => {
            setHiringModalDetails(response.data.hirings[0])
          })
          .catch((error) => {
            console.log(error);
          })
          axios.get(`/hirings/hiringcomments/${hiringId}`)
          .then((response) => {
            setHiringModalComments(response.data.comments)
          })
          .catch((error) => {
            console.log(error);
          })
    }

    return (
      <Layout>
        <div className="container-fluid">
          <div className="card w-auto">
            <div className="card-header">
              <div className="row">
                <div className="col text-center">
                  <h4>Hiring Enquired By Me</h4>
                </div>
              </div>
            </div>
            <div className="card-body table-responsive">
              <table className="table table-hover">
                <thead className="bg-light">
                  <tr>
                    <th>Employee Name</th>
                    <th>Manager Name</th>
                    <th>Manager Email</th>
                    <th>Project Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Work Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {hiringList.map((hiringList, key) => {
                    return (
                      <tr 
                        key={key}
                        onClick={(e) => openModal(hiringList.hiring_id)}
                      >
                        
                        <td>
                          <Link
                            to={`/projectShow/${hiringList.emp_id}`}
                          >
                            {hiringList.employee_details.first_name} {hiringList.employee_details.last_name}
                          </Link>
                        </td>
                        <td>{hiringList.manager_details.manager_first_name}, {hiringList.manager_details.manager_last_name}</td>

                        <td>{hiringList.manager_details.manager_email}</td>
                        <td>{hiringList.project_name}</td>
                        <td>{Utils.formatDateYYYYMMDD(hiringList.start_date)}</td>
                        <td>{Utils.formatDateYYYYMMDD(hiringList.end_date)}</td>
                        <td>{hiringList.work_location}</td>
                        <td>{hiringList.hiring_status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <HiringModal
                modelStatus={modalIsOpen}
                hiringDetails={hiringModalDetails}
                hiringComments={hiringModalComments}
                hideAddInListBtn={true}
                hideHireBtn={true}
                navigateToPage="/enquiredbyme"
              />
            </div>
          </div>
        </div>
      </Layout>
    );
}
  
export default EnquiredByMe;