import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Layout from "../../components/Layout";
import APP_CONSTANTS from "../../appConstants";
import * as APP_FUNCTIONS from "../../lib/AppFunctions";

function ApproveTimesheetList() {
    const [supervisorEmail, setSupervisorEmail] = useState(JSON.parse(localStorage.getItem("user"))?.email);
    const [userIsApprover, setUserIsApptover] = useState(APP_FUNCTIONS.activeUserRole === APP_CONSTANTS.USER_ROLES.SUPERVISOR); 
    const [userIsProducer, setUserIsProducer] = useState(APP_FUNCTIONS.activeUserRole === APP_CONSTANTS.USER_ROLES.PRODUCER); 
    const [empList, setEmpList] = useState([]);
    const [pageTitle, setPageTitle] = useState();
    const navigate = useNavigate();

    const fetchSupervisorEmployees = (supervisorEmail) => {
        axios
          .get(`timesheets/approvependingemployees`, {
            params: { supervisor_email: supervisorEmail }, //"rpanyala@vaco.com" }//
          })
          .then(function (response) {
            setEmpList(response.data?.employees);
            console.log(response.data?.employees);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    
      useEffect(() => {
        if(userIsApprover || userIsProducer) {
          fetchSupervisorEmployees(supervisorEmail);
        } else {
          return;
        }
        if(userIsApprover) {
          setPageTitle('Pending for Approval');
        } 
        else if(userIsProducer) {
          setPageTitle('Pending for Acceptence');
        }
        
      }, [supervisorEmail]);
    
      return (
        <Layout>
          <div className="container-fluid">
          <h4 className='text-center'>{pageTitle}</h4>
            <div className="card w-auto">
              <div className="card-body table-responsive">
                <table className="table table-hover">
                  <thead className="bg-light">
                    <tr>
                      <th>Action</th>
                      <th>Employee Name</th>
                      <th>Project Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {empList.map((empDetail, key) => {
                      return (
                        <tr key={key}>
                          <td>
                            <Link
                              className="btn btn-outline-success mx-1 edit_icon"
                              to={`/approveEmpTimesheet/${empDetail.project_id}/${empDetail.emp_id}`}
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={`/clientShow/${empDetail.emp_id}`}
                            >
                              {empDetail.first_name} {empDetail.last_name}
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={`/projectShow/${empDetail.project_id}`}
                            >
                              {empDetail.project_name}
                            </Link>
                          </td>
  
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

export default ApproveTimesheetList;