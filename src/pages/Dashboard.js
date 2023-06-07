import React, { useEffect, useState } from "react";

import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2'
import APP_CONSTANTS from "../appConstants";
import * as Utils from "../lib/Utils"
import * as APP_FUNCTIONS from "../lib/AppFunctions";
import Layout from "../components/Layout";

import EmployeeProfileModal from '../components/employee/EmployeeProfileModal';
 
function Dashboard() {
    const [userIsProducer, setUserIsProducer] = useState(APP_FUNCTIONS.activeUserRole === APP_CONSTANTS.USER_ROLES.PRODUCER);
    
    const [hasReadOnlyAccess, setHasReadOnlyAccess] = useState(APP_FUNCTIONS.activeUserRole === APP_CONSTANTS.USER_ROLES.PRODUCER);
    const navigate = useNavigate();
    const [projectList, setProjectList] = useState([]);
    const [filteredList, setFilteredList] = useState(projectList);
    const [searchKey, setSearchKey] = useState("");
    const  [inputType, setInputType] = useState("text");
    const  [searchKeys, setSearchKeys] = useState([]);
    const  [searchAlocKeys, setSearchAlocKeys] = useState([]);
    const  [empProjAlocList, setEmpProjAlocList] = useState([])
    const [filteredAlocList, setFilteredAlocList] = useState(empProjAlocList);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [empModalDetails, setEmpModalDetails] = useState({});
    const  [empProjUtiliList, setEmpProjUtiliList] = useState([]);
    const [managerEmail, setManagerEmail] = useState(JSON.parse(localStorage.getItem("user"))?.email);
    const [empList, setEmpList] = useState([]);
    const [pageTitle, setPageTitle] = useState();
    
    const [searchAlocKey, setSearchAlocKey] = useState("");

    useEffect(()=>{
      fetchProjects();
      fetchEmpProjAlocList();
      fetchEmpProjUtiliList();
      fetchManagerEmployees(managerEmail);
    },[managerEmail])
  
    const fetchManagerEmployees = (managerEmail) => {
      axios
        .get(`timesheets/approvependingemployees`, {
          params: { manager_email: managerEmail }, //"rpanyala@vaco.com" }//
        })
        .then(function (response) {
          setEmpList(response.data?.employees);
          console.log(response.data?.employees);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const fetchProjects = () => {
      axios.get('/projects')
      .then(function (response) {
        setProjectList(response.data.projects);
        
        setFilteredList(response.data.projects);
        setSearchKeys(Object.keys(response?.data?.projects[0]))  
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    const url = "empPrjAloc";
    const fetchEmpProjAlocList = () => {
        axios.get(`/${url}`)
        .then(function (response) {
          setEmpProjAlocList(response.data.empProjAlloc);
          setFilteredAlocList(response.data.empProjAlloc);
          setSearchAlocKeys(Object.keys(response?.data?.empProjAlloc[0]))
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    const utiliurl = "empPrjUtili";
    const fetchEmpProjUtiliList = () => {
        axios.get(`/${utiliurl}`)
        .then(function (response) {
          setEmpProjUtiliList(response.data.empProjUtili);
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    const handleSearch = (event) => {
        event.stopPropagation();
        
        const searchValue = event.target.value.toString().toLowerCase();
        let dbVal = "";
        const fList = projectList.filter((item) => {
          if (searchKey.includes("date")) {
            dbVal = Utils.formatDateYYYYMMDD(item[`${searchKey}`]).toString();
          } else {
            dbVal = item[`${searchKey}`].toString().toLowerCase();
          }
          
          return dbVal.includes(searchValue);
        });
        console.log(fList);
        setFilteredList(fList);
      };
    
      const handleSearchKeyChange = (event) => {
        event.stopPropagation();
        if (event.target.value == "-select-"){
          document.getElementById("search-value").value = "";
        } else {
          setSearchKey(event.target.value);
        }
        (event.target.value.includes("date")) ? setInputType("date") : setInputType("text");
      };
    
    
      const handleSearchRefreshClick = () => {
        window.location.reload(true);
      };
    
      const searchKeysToIgnore = ["project_id", "client_id","clientDetails"];
    
      const openEmpDetailsModal = (empId) => {
        axios.get(`/employees/${empId}`)
          .then((response) => {
            setEmpModalDetails(response.data.employees[0])
          })
          .catch((error) => {
            console.log(error);
          })
        setIsOpen(true);
      }
    

    const handleAlocSearch = (event) => {
      event.stopPropagation();
     if (!searchAlocKey || searchAlocKey == "-select-") {
        Swal.fire({
          title: 'Select Search Key ',
          text: "Please select a key to search!",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      } else {
        const searchValue = event.target.value?.toString().toLowerCase();
        let dbVal = "";
        const fList = empProjAlocList.filter((item) => {
          if (searchAlocKey.includes("date")) {
            dbVal = Utils.formatDateYYYYMMDD(item[`${searchAlocKey}`]).toString();
          } else {
            dbVal = item[`${searchAlocKey}`]?.toString().toLowerCase();
          }
          return dbVal?.includes(searchValue);
        });
        setFilteredAlocList(fList);
      }
    };

    const handleSearchAlocKeyChange = (event) => {
      event.stopPropagation();
      if (event.target.value == "-select-"){
        document.getElementById("search-value").value = "";
      } else {
        setSearchAlocKey(event.target.value);
      }
      
      (event.target.value.includes("date")) ? setInputType("date") : setInputType("text");
    };

    
    const searchKeysAlocToIgnore = ["emp_id","project_id","emp_proj_aloc_id","empDetails", "projectDetails"];
    return (
        <Layout>
            <div className="col-md-12 float-left">
            <div className="col-xs-12 col-sm-6 float-left ps-3 pe-3" >
	            <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Project Details</h3>
                    </div>
                    <div className="panel-body">
                    <div className="col input-group">
                  <span className="input-group-text"><i className="bi bi-search text-gray"></i></span>
                    <select style={{width:"35%"}} name="searchKey" id="search-key"  onChange={handleSearchKeyChange}> 
                      <option value="-select-"> -- Search Key -- </option>
                      {searchKeys.map((k) => (!searchKeysToIgnore.includes(k)) ? <option value={k}>{k.toLocaleUpperCase()}</option> : "")}
                    </select>
                    <input style={{width:"35%"}} className="ms-1" id="search-value" type={inputType} placeholder=" Type a value" onChange={handleSearch} />
                      <span 
                      onClick={handleSearchRefreshClick}
                      className="btn btn-outline-primary btn-small">
                      <i className="bi bi-arrow-counterclockwise"></i>
                    </span>
                </div>
                    <table className="table table-hover dashboard_table" >
                        <thead className="bg-light">
                        <tr>
                        
                            <th>Client Name</th>
                            <th>Project Name</th>
                            <th>Project Location</th>
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
                        {filteredList.map((projectDetails, key) => {
                            return (
                            <tr key={key}>
                                
                                <td>
                                <Link
                                    to={`/clientShow/${projectDetails.clientDetails.client_id}`}
                                >
                                    {projectDetails.clientDetails.name}
                                </Link>
                                </td>
                                <td>
                                <Link
                                    to={`/projectShow/${projectDetails.project_id}`}
                                >
                                    {projectDetails.project_name}
                                </Link>
                                </td>
                                
                                <td>{projectDetails.project_location}</td>

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

            <div className="col-xs-12 col-sm-6  float-left ps-3 pe-3">
	            <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Project Allocations</h3>
                    </div>
                    <div className="panel-body">
                    <div className="col input-group">
                  <span className="input-group-text"><i className="bi bi-search text-gray"></i></span>
                    <select style={{width:"35%"}} name="searchAlocKey" id="searchAlocKey" onChange={handleSearchAlocKeyChange}> 
                      <option value="-select-"> -- Select Key -- </option>
                      {searchAlocKeys.map((k) => (!searchKeysAlocToIgnore.includes(k)) ? <option value={k}>{k.toLocaleUpperCase()}</option> : "")}
                    </select>
                    <input style={{width:"35%"}} className="ms-2" id="search-value" type={inputType} placeholder=" Type a value" onChange={handleAlocSearch} />
                    <span 
                    onClick={handleSearchRefreshClick}
                    hidden={modalIsOpen}
                    className="btn btn-outline-primary btn-small">
                    <i className="bi bi-arrow-counterclockwise"></i>
                  </span>
                </div>
                    <table className="table table-hover dashboard_table">
                <thead className="bg-light">
                  <tr>
                    <th>Project Name</th>
                    <th>Resource Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Work Location</th>
                    <th>Hours per Day</th>
                    <th>Shift Start Time</th>
                    <th>Shift End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAlocList.map((empProjAlloc, key) => {
                    return (
                      <tr key={key}>
                        
                        <td>
                          <Link
                            to={`/projectShow/${empProjAlloc.projectDetails.project_id}`}
                          >
                            {empProjAlloc.projectDetails.project_name}
                          </Link>
                        </td>
                        <td>
                          <a href='#' id={key} key={key}  onClick={(e) => openEmpDetailsModal(empProjAlloc.empDetails.emp_id)}>
                            {empProjAlloc.empDetails.first_name}, 
                            {empProjAlloc.empDetails.last_name}
                          </a>
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
              <EmployeeProfileModal
                modelstatus={modalIsOpen}
                close={() => setIsOpen(false)}
                employee={empModalDetails}
                hideAddInListBtn={true}
                hideHireBtn={true}
              />
                    </div>
                </div>
            </div> 
            </div>  
            <div className="col-md-12 float-left">        
            <div className="col-xs-12 col-sm-6  float-left ps-3 pe-3">
	            <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Project Utilizations</h3>
                    </div>
                    <div className="panel-body">
                    <table className="table table-hover dashboard_table">
                <thead className="bg-light">
                  <tr>
                    <th>Project Name</th>
                    <th>Resource Name</th>
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
                          <Link
                            to={`/projectShow/${empProjUtili.projectDetails.project_id}`}
                          >
                            {empProjUtili.projectDetails.project_name}
                          </Link>
                        </td>
                        <td>
                            <a href='#' id={key} key={key}  onClick={(e) => openEmpDetailsModal(empProjUtili.empDetails.emp_id)}>
                              {empProjUtili.empDetails.first_name}, 
                              {empProjUtili.empDetails.last_name}
                            </a>
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

            <div className="col-xs-12 col-sm-6  float-left ps-3 pe-3">
	            <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Approve Timesheets</h3>
                    </div>
                    <div className="panel-body">
                    <table className="table table-hover display_table">
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
                          <a href='#' id={key} key={key}  onClick={(e) => openEmpDetailsModal(empDetail.emp_id)}>
                              {empDetail.first_name} {empDetail.last_name}
                            </a>
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
            </div>  
        </Layout>
    );
}
  
export default Dashboard;