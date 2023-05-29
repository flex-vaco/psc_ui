import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import * as Utils from "../../lib/Utils";
import Layout from "../../components/Layout"
import TimeEntryWidget from "../../components/TimeEntryWidget";
import APP_CONSTANTS from "../../appConstants";
import * as APP_FUNCTIONS from "../../lib/AppFunctions";

const Timesheet = () => {
    const [empId, setEmpId] = useState(APP_FUNCTIONS.userIsEmployee() ? JSON.parse(localStorage.getItem("user"))?.user_id : null);
    const [empAllocatations, setEmpAllocations] = useState([]);
    const [userIsApprover, setUserIsApptover] = useState(APP_FUNCTIONS.activeUserRole === APP_CONSTANTS.USER_ROLES.SUPERVISOR);
    const [isSaving, setIsSaving] = useState(false);
    const [supervisorEmail, setSupervisorEmail] = useState(JSON.parse(localStorage.getItem("user"))?.email);
    const [empList, setEmpList] = useState([]);

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const weekEnd = ["Sat", "Sun"];
    const { monthStartDate, monthEndDate } = Utils.getStartEndDatesCurrentMonth();
    const [displayDates, setDisplayDates] = useState(Utils.getDatesBetween(monthStartDate, monthEndDate));

    const [startDate, setStartDate] = useState();

  const fetchSupervisorEmployees = (supervisorEmail) => {
    axios
      .get(`/employees`, {
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
    if(userIsApprover) {
      fetchSupervisorEmployees(supervisorEmail);
    } else {
      return;
    }
  }, [supervisorEmail]);

  const fetchEmpProjects = (empId) => {
    axios
      .get(`/empPrjAloc/empallocation`, { params: { emp_id: empId } })
      .then(function (response) {
        setEmpAllocations(response.data?.employee_allocation);
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
    setEmpId(e.target.value);
  };

    const handleSave = async () => {
      if (Object.keys(timesheetData).length === 0) {
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

    const handleSubmit = (e) => {
      e.preventDefault();
      const status = e.target.name;
      const submitData = {
        status: status,
        emp_id: empAllocatations[0].emp_id,
        supervisor_email: empAllocatations[0].supervisor_email,
        month_start_date: monthStartDate,
        month_end_date: monthEndDate,
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
          console.log(err);
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
          <div hidden={!userIsApprover} className="form-group mb-3 col-md-3 align-items-center">
            <label htmlFor="emp_id">Employee</label>
            <select name="emp_id" id="emp_id" className="form-control" onChange={(e)=> {handleEmpChange(e)}}> 
                <option value="-select-" > -- Select an Employee -- </option>
                {empList.map((emp) => <option value={emp.emp_id}>{emp.first_name}, {emp.last_name}</option>)}
            </select>
          </div>

        <table hidden={!empId} className="table table-bordered">
        <thead>
          <tr>
            <th className="w-25">Date</th>
            <th className="w-75">Project <span className='text-muted'>(Enter/Edit Task Details)</span></th>
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
                    return (
                        <TimeEntryWidget
                        tsDate={Utils.formatDateYYYYMMDD(dt)}
                        empAlloc={ea}
                        tsData={appendTimesheetData}
                        />
                    );
                    })}
                </td>
                </tr>
            );
            })}
        </tbody>
        </table>
        <div hidden={!empId}  className="form-group col-md-6 align-items-center float-end">
        <button 
            disabled={isSaving}
            onClick={handleSave} 
            type="submit"
            className="btn btn-outline-info me-3 float-end">
            SAVE
        </button>
        <button 
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


// setDisplayDates(getDatesBetween(monthStartDate, monthEndDate));

//   const handlePreviousWeek = () => {
//     // setStartDate(new Date(startDate.setDate(startDate.getDate() - 7)));

//     const prevWeek = new Date(startDate);
//     prevWeek.setDate(startDate.getDate() - 7);
//     setStartDate(prevWeek);
//   };

//   const handleNextWeek = () => {
//     // setStartDate(new Date(startDate.setDate(startDate.getDate() + 7)));
//     const nextWeek = new Date(startDate);
//     nextWeek.setDate(startDate.getDate() + 7);
//     setStartDate(nextWeek);
//   };

//   const handleAddRow = () => {
//     setData([
//       ...data,
//       { project: `Project ${data.length + 1}`, hours: [0, 0, 0, 0, 0, 0, 0], total: 0 },
//     ]);
//   };

//   const handleDeleteRow = (index) => {
//     const updatedData = [...data];
//     updatedData.splice(index, 1);
//     setData(updatedData);
//   };

//   const handleSaveHours = () => {
//     console.log('Hours saved:', data);
//   };

//   // const calculateTotal = (hours) => {
//   //   let total = 0;
//   //   for (let i = 0; i < hours.length; i++) {
//   //     total += parseInt(hours[i]) || 0;
//   //   }
//   //   return total;
//   // };

//   const handleHoursChange = (projectIndex, dayIndex, value) => {
//     const updatedData = [...data];
//     updatedData[projectIndex].hours[dayIndex] = value;
//     updatedData[projectIndex].total = updatedData[projectIndex].hours.reduce(
//       (acc, cur) => acc + cur,
//       0
//     );
//     setData(updatedData);
//   };