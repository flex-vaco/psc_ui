import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import * as Utils from "../../lib/Utils";
import Layout from "../../components/Layout"
import TimeEntryWidget from "../../components/TimeEntryWidget";
import APP_CONSTANTS from "../../appConstants";
import * as APP_FUNCTIONS from "../../lib/AppFunctions";

const Timesheet = () => {
    const [empId, setEmpId] = useState(APP_FUNCTIONS.userIsEmployee() ? JSON.parse(localStorage.getItem("user"))?.emp_id : null);
    const [empAllocatations, setEmpAllocations] = useState([]);
    const [userIsApprover, setUserIsApprover] = useState(APP_FUNCTIONS.activeUserRole === APP_CONSTANTS.USER_ROLES.SUPERVISOR);
    const [userIsProducer, setUserIsProducer] = useState(APP_FUNCTIONS.activeUserRole === APP_CONSTANTS.USER_ROLES.PRODUCER);
    const [isSaving, setIsSaving] = useState(false);
    const [supervisorEmail, setSupervisorEmail] = useState(JSON.parse(localStorage.getItem("user"))?.email);
    const [empList, setEmpList] = useState([]);
    const [prjList, setPrjList] = useState([]);
    const [proprjList, setProProjectList] = useState([]);
    const [origEmpAlloc, setOrigEmpAlloc] = useState([]);
    const [proempList, setProEmpList] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    // const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const weekEnd = ["Sat", "Sun"];
    const {monthStartDate, monthEndDate } = Utils.getStartEndDatesCurrentMonth();
    const {weekStartDate, weekEndDate} = Utils.getStartEndDatesCurrentWeek();
    const [dispStartDate, setDispStartDate] = useState(weekStartDate);
    const [dispEndDate, setDispEndDate] = useState(weekEndDate);
    const [allocStartDate, setAllocStartDate] = useState(weekStartDate);
    const [allocEndDate, setAllocEndDate] = useState(weekEndDate);

    const [displayDates, setDisplayDates] = useState(Utils.getDatesBetween(weekStartDate, weekEndDate));

    const handleDateChange = (e) => {
      e.preventDefault();
      const action = e.target.name;
      if (action == "prevWeek"){
        const {prevWeekStartDate, prevWeekEndDate} = Utils.getStartEndDatesPreviousWeek(new Date(displayDates[0]));
        setDisplayDates(Utils.getDatesBetween(prevWeekStartDate, prevWeekEndDate));
        setDispStartDate(prevWeekStartDate);
        setDispEndDate(prevWeekEndDate);
      } else if (action == "nextWeek"){
        const {nextWeekStartDate, nextWeekEndDate} = Utils.getStartEndDatesNextWeek(new Date(displayDates[0]));
        setDisplayDates(Utils.getDatesBetween(nextWeekStartDate, nextWeekEndDate));
        setDispStartDate(nextWeekStartDate);
        setDispEndDate(nextWeekEndDate);
      } else{
        setDisplayDates(Utils.getDatesBetween(dispStartDate, dispEndDate));
      }
    }

  const fetchSupervisorEmployees = (supervisorEmail) => {
    axios
      .get(`/employees`, {
        params: { supervisor_email: supervisorEmail },
      })
      .then(function (response) {
        setEmpList(response.data?.employees);
        console.log(response.data?.employees);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  const fetchProducerProjects = () => {
    axios
      .get(`/projects`)
      .then(function (response) {
        setProProjectList(response.data?.projects);
        console.log(response.data?.employees);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if(userIsApprover) {
      fetchSupervisorEmployees(supervisorEmail);
    } else if (userIsProducer) {
      fetchProducerProjects();
    }else {
      return;
    }
  }, [supervisorEmail]);

  const fetchEmpProjects = (empId) => {
    axios
      .get(`/empPrjAloc/empallocation`, { params: { emp_id: empId } })
      .then(function (response) {
        let plist = [];
        setOrigEmpAlloc(response.data?.employee_allocation);
        setEmpAllocations(response.data?.employee_allocation);
        if(response.data?.employee_allocation.length > 0) {
          response.data?.employee_allocation.map((element) => {
            plist = [...plist, {project_id: element.project_id, project_name: element.project_name}]
            setPrjList(plist);
          });
        } else {
          setPrjList(plist);
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchEmpProjects(empId);
  }, [empId]);

  let timesheetData = {};
  const appendTimesheetData = (data) => {
    timesheetData[data.timesheet_id] = data;
  };

  const handleEmpChange = (e) => {
    e.preventDefault();
    setEmpId(e.target.value);
  };

  const handleProjectChange = (e) => {
    e.preventDefault();
    const selectedProject = origEmpAlloc.filter(ea=> ea.project_id == e.target.value);
    setSelectedProjectId(selectedProject[0].project_id);
    if("-select-" === e.target.value) {
      setEmpAllocations(origEmpAlloc);
    } else {
      setEmpAllocations(selectedProject);
      setAllocStartDate(selectedProject[0].start_date.split("T")[0]);
      setAllocEndDate(selectedProject[0].end_date.split("T")[0]);
    }
  };
  const handleProducerProjectChange = (e) => {
    axios.get(`/empPrjAloc/project-employees/${e.target.value}`)
        .then(function (response) {
          setProEmpList(response.data.employees);
        })
        .catch(function (error) {
          console.log(error);
        })
  }
  const handleProEmpChange = (e) => {
    e.preventDefault();
    setEmpId(e.target.value);
  }
    const handleSave = async (chkDataChanges = true) => {
      if ((Object.keys(timesheetData).length === 0) && (chkDataChanges === true)) {
        Swal.fire({
          icon: "info",
          title: "No Changes to Save!",
          showConfirmButton: true,
        });
        return;
      }
      setIsSaving(true);
      let insertArray = [];
      let updateArray = [];
      let updateResponse = "";
      let insertResponse = "";
      for (const key in timesheetData) {
        if (key.startsWith("temp_")) {
          delete timesheetData[key].timesheet_id;
          insertArray.push(timesheetData[key]);
        } else {
          updateArray.push(timesheetData[key]);
        }
      }

      if (updateArray.length > 0) {
        console.log("Updating: ", updateArray.length);
        updateResponse = await axios.post("timesheets/update", updateArray);
        console.log("Update respone", updateResponse);
        if (updateResponse.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Timesheet updated!",
            showConfirmButton: true,
          }).then(() => {
            if (APP_FUNCTIONS.userIsEmployee()) {
              window.location.reload(true);
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to update Timesheet!",
            text: "Check logs!",
            showConfirmButton: true,
          }).then(() => {
            return;
          });
        }
      }

      if (insertArray.length > 0) {
        console.log("Inserting: ", insertArray.length);
        insertResponse = await axios.post("timesheets/create", insertArray);
        console.log("Insert response", insertResponse);
        if (insertResponse.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Timesheet updated!",
            showConfirmButton: true,
          }).then(() => {
            if (APP_FUNCTIONS.userIsEmployee()) {
              window.location.reload(true);
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to update Timesheet!",
            text: "Check logs!",
            showConfirmButton: true,
          }).then(() => {
            return;
          });
        }
      }
      setIsSaving(false);
    };

    const handleSubmit = async (e) => {
      const chkDataChanges = false;
      await handleSave(chkDataChanges);
      e.preventDefault();
      const status = e.target.name;
      const submitData = {
        status: status,
        emp_id: empAllocatations[0].emp_id,
        supervisor_email: empAllocatations[0].supervisor_email,
        start_date: Utils.formatDateYYYYMMDD(dispStartDate),
        end_date: Utils.formatDateYYYYMMDD(dispEndDate),
        project_id: selectedProjectId
      };
      axios
        .post("timesheets/change_status", submitData)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: `Timesheet ${status}!`,
            showConfirmButton: true,
          }).then(() => {
            if (APP_FUNCTIONS.userIsEmployee()) {
              window.location.reload(true);
            }
          });
        })
        .catch((err) => {
          console.log("Submit Error: ",err);
          Swal.fire({
            icon: "error",
            title: "Failed to Submit Timesheet!",
            text: err.response.data.message,
            showConfirmButton: true,
          });
        });
    };

    
return (
    <Layout>
    <div className="container">
        <h4 className='text-center'>Time Sheet</h4>
          <form> 
            <div hidden={!userIsApprover} className='form-group float-start mb-2 me-2'>
              <label htmlFor="emp_id">Employee</label>
              <select name="emp_id" id="emp_id" className="form-control" onChange={(e)=> {handleEmpChange(e)}}> 
                  <option value="-select-"> -- Select an Employee -- </option>
                  {empList.map((emp) => <option value={emp.emp_id}>{emp.first_name}, {emp.last_name}</option>)}
              </select>
            </div>
            <div hidden={APP_FUNCTIONS.userIsProducer()} className='form-group float-start mb-2 me-2'>
              <label htmlFor="project_id">Project</label>
              <select name="project_id" id="project_id" className="form-control" onChange={(e)=> {handleProjectChange(e)}}> 
                  <option value="-select-"> All </option>
                  {prjList.map((prj) => <option value={prj.project_id}>{prj.project_name}</option>)}
              </select>
            </div>
            

            <div hidden={!userIsProducer}>
            <div className='form-group float-start mb-2 me-2'>
              <label htmlFor="project_id">Project</label>
              <select name="producer_project_id" id="project_id" className="form-control" onChange={(e)=> {handleProducerProjectChange(e)}}> 
                  <option value="-select-"> All </option>
                  {proprjList.map((prj) => <option value={prj.project_id}>{prj.project_name}</option>)}
              </select>
            </div>
            <div className='form-group float-start mb-2 me-2'>
              <label htmlFor="emp_id">Employee</label>
              <select name="pro_emp_id" id="pro_emp_id" className="form-control" onChange={(e)=> {handleProEmpChange(e)}}> 
                  <option value="-select-"> -- Select an Employee -- </option>
                  {proempList.map((emp) => <option value={emp.emp_id}>{emp.first_name}, {emp.last_name}</option>)}
              </select>
            </div>
            </div> 
            <div className='form-group float-start mb-2 me-2'>
              <label htmlFor="dispStartDate">Start Date</label>
              <input 
              className="form-control"
              type='date'
              name='dispStartDate'
              id='dispStartDate'
              max={allocEndDate}
              min={allocStartDate}
              onChange={e=>setDispStartDate(e.target.valueAsDate)}
              />
            </div>
            <div className='form-group float-start mb-2 me-2'>
              <label htmlFor="dispEndDate">End Date</label>
              <input 
              className="form-control"
              type='date'
              name='dispEndDate'
              id='dispEndDate'
              max={allocEndDate}
              min={allocStartDate}
              onChange={e=>setDispEndDate(e.target.valueAsDate)}
              />
            </div>
            <div className='form-group float-start mb-2 me-2'>
            <label htmlFor="get"> </label>
              <button 
                  onClick={(event)=>{handleDateChange(event)}} 
                  type="submit"
                  name="get"
                  className="form-control btn btn-outline-info me-2">
                  Go
              </button>
            </div>
            </form>
            {/* <div className='form-group float-end mb-2'>
              <button 
                  onClick={(event)=>{handleDateChange(event)}} 
                  type="submit"
                  name="prevWeek"
                  className="btn btn-outline-info me-2">
                  <i class="bi bi-caret-left-fill"> </i>
              </button>
              <button 
                  onClick={(event)=>{handleDateChange(event)}} 
                  type="submit"
                  name="curWeek"
                  className="btn btn-outline-info me-2">
                  Current
              </button>
              <button 
                  onClick={(event)=>{handleDateChange(event)}} 
                  type="submit"
                  name="nextWeek"
                  className="btn btn-outline-info me-2">
                  <i class="bi bi-caret-right-fill"> </i>
              </button>
            </div> */}

        <table hidden={!empId} className="table table-bordered">
        <thead>
          <tr>
            <th style={{width:"15%"}}> Date</th>
            <th style={{width:"85%"}}> Project <span className='text-muted'>(Enter/Edit Task Details)</span> <span className='float-end'>Time in Hours </span></th>
          </tr>
        </thead>
        <tbody>
            {displayDates.map((dt) => {
            const isWeekend = weekEnd.includes(dt.split(" ")[0]);
            return (
                <tr className={isWeekend ? "bg-light" : ""}>
                <td className={isWeekend ? "text-muted" : "fw-bold"}>
                    {dt.toLocaleString()}
                </td>
                <td>
                  {empAllocatations.map((ea) => {
                   if ((dt == Utils.getGreaterDate(dt, ea.start_date)) && (dt != Utils.getGreaterDate(dt, ea.end_date))) {
                      return (
                        <TimeEntryWidget
                          tsDate={Utils.formatDateYYYYMMDD(dt)}
                          empAlloc={ea}
                          tsData={appendTimesheetData}
                        />
                      );
                   }
                  })}
                </td>
                </tr>
            );
            })}
        </tbody>
        </table>
        <div hidden={!empId}  className="form-group col-md-6 align-items-center float-end">
        <button 
            hidden={userIsProducer}
            disabled={isSaving}
            onClick={handleSave} 
            type="submit"
            className="btn btn-outline-info me-3 float-end">
            SAVE
        </button>
        <button 
            hidden={userIsProducer}
            disabled={isSaving}
            onClick={(event)=>{handleSubmit(event)}} 
            type="submit"
            name="SUBMITTED"
            className="btn btn-outline-primary me-3 float-end">
            SUBMIT
        </button>
        <button 
            hidden={!userIsApprover}
            disabled={isSaving}
            onClick={(event)=>{handleSubmit(event)}} 
            type="submit"
            name="APPROVED"
            className="btn btn-outline-info me-3 float-end">
            APPROVE
        </button>
        </div>
    </div>
    </Layout>
);
};

export default Timesheet;
