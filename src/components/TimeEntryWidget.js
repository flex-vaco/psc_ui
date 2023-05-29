import React, { useState, useEffect } from "react";
import axios from 'axios';

function TimeEntryWidget(props) {

  const [taskName, setTaskName] = useState('');
  const [taskHours, setTaskHours] = useState('');
    const [timesheetData, setTimesheetData] = useState([]);

    const [tempTimesheetId, setTempTimesheetId] = useState(`temp_${props.empAlloc.project_id}_${props.tsDate}`)
    const fetchTimesheets = () => {
      axios
        .post(`/timesheets/by_allocation`, {
          givenDate: props.tsDate,
          projectId: props.empAlloc.project_id,
          empId: props.empAlloc.emp_id,
        })
        .then(function (response) {
          setTimesheetData(response.data?.timesheetsByAllocation[0]);
          setTaskName(response.data?.timesheetsByAllocation[0]?.task || '');
          setTaskHours(response.data?.timesheetsByAllocation[0]?.hours_per_day || 0);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  const tsReadOnlyStatuses = ['APPROVED','ACCEPTED','CANCELLED']

    useEffect(() => {
        fetchTimesheets();
    }, [props.tsDate, props.empAlloc.emp_id])


  const handleChange = (e) => {
    e.preventDefault();
    const taskNameEl = document.getElementById(`task_name_${tempTimesheetId}`);
    const taskHoursEl = document.getElementById(`task_hrs_${tempTimesheetId}`);

    if (taskNameEl.value && taskHoursEl.value) {
      if((taskNameEl.value !== timesheetData?.task) || (taskHoursEl.value !== timesheetData?.hours_per_day)){
        const data = {
          timesheet_id: timesheetData?.timesheet_id || tempTimesheetId,
          emp_id: props.empAlloc.emp_id,
          project_id: props.empAlloc.project_id,
          supervisor_email: props.empAlloc.supervisor_email,
          timesheet_date: props.tsDate,
          hours_per_day: taskHoursEl.value,
          timesheet_status: timesheetData?.timesheet_status || "ENTERED",
          task: taskNameEl.value,
          comments: {
              emp:  "test",
              supr: "ok"
          }
        };
  
        props.tsData(data);
      }
    }
  };

  return (
    <div className="time-entry-widget">
      <form id={tempTimesheetId} className="row">
        <div className="form-group col-md-10  mb-2">
          <label htmlFor="task_name">
            <span className="fw-bold"> {props.empAlloc.project_name} </span>
          </label>
          <input
            onBlur={(event) => {
              handleChange(event);
            }}
            onChange={(event)=>{setTaskName(event.target.value)}}
            value={taskName}
            placeholder="Enter Task"
            type="text"
            className="form-control"
            id={`task_name_${tempTimesheetId}`}
            name="task_name"
            readOnly={tsReadOnlyStatuses.includes(timesheetData?.timesheet_status)}
          />
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="hours" className="fw-bold">
            Work hrs.
            <span className="fw-bold text-muted">
              {" "}
              {` (${props.empAlloc.hours_per_day})`}
            </span>
          </label>
          <input
            onBlur={(event) => {
              handleChange(event);
            }}
            onChange={(event)=>{setTaskHours(event.target.value)}}
            value={taskHours}
            type="number"
            placeholder="0"
            className="form-control"
            id={`task_hrs_${tempTimesheetId}`}
            name="hours"
            readOnly={tsReadOnlyStatuses.includes(timesheetData?.timesheet_status)}
          />
        </div>
      </form>
    </div>
  );
}

export default TimeEntryWidget;
