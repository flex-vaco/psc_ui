import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import * as Utils from "../../lib/Utils";
import Layout from "../../components/Layout";
import APP_CONSTANTS from "../../appConstants";
import * as APP_FUNCTIONS from "../../lib/AppFunctions";
import "./FancyTimesheet.css";
import { TimesheetEntries } from "../../types/TimesheetEntries";
import { TimesheetEntry } from "../../types/TimesheetEntry";
import { Nullable } from "../../types/Nullable";
import { User } from "../../types/User";
import { EmployeeProject } from "../../types/EmployeeProject";

const FancyTimesheet = () => {
  const userAsString: string = localStorage.getItem("user")?.toString() || "";
  const user: User = JSON.parse(userAsString) || null;
  const [employeeId, setEmployeeId] = useState<Nullable<number>>(
    APP_FUNCTIONS.userIsEmployee() ? user?.emp_id : null
  );
  const [employeeProjects, setEmployeeProjects] = useState<
    Array<EmployeeProject>
  >([]);
  const [timesheetEntries, setTimesheetEntries] = useState<
    Array<TimesheetEntries>
  >([]);

  const [entry, setTaskName] = useState("");

  useEffect(() => {
    fetchEmployeeProjects(employeeId);
  }, [employeeId]);

  useEffect(() => {
    fetchTimesheets();
  }, [employeeId, employeeProjects]); //TODO: trigger when employee projects or selected date changets

  //To fetch the employee-projects relationship data
  const fetchEmployeeProjects = (empId: Nullable<number>) => {
    axios
      .get(`/empPrjAloc/empallocation`, { params: { emp_id: empId } })
      .then(function (response) {
        let employeeProjects: Array<EmployeeProject> = [];
        if (response.data?.employee_allocation.length > 0) {
          response.data?.employee_allocation.map((element: any) => {
            employeeProjects = [
              ...employeeProjects,
              {
                projectDetails: {
                  projectId: element.project_id,
                  projectName: element.project_name,
                  location: element.project_location,
                },
                employeeId: element.emp_id,
                employeeProjectAllocationId: element.emp_proj_aloc_id,
                allocationHoursPerDay: element.hours_per_day,
              },
            ];
          });
          setEmployeeProjects(employeeProjects);
        }
        setEmployeeProjects(employeeProjects);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // To fetch the timesheet data for the 1.employee, 2.project, 3.given date
  const fetchTimesheets = () => {
    setTimesheetEntries([]);
    const givenDate: Date = new Date("2023-05-15");
    employeeProjects.map((empProjects) => {
      axios
        .post(`/timesheets/by_allocation`, {
          givenDate: Utils.formatDateYYYYMMDD(givenDate),
          projectId: empProjects.projectDetails?.projectId,
          empId: empProjects.employeeId,
        })
        .then(function (response) {
          const timesheetEntryArray: Array<TimesheetEntry> = [
            {
              timesheetId:
                response.data?.timesheetsByAllocation[0]?.timesheet_id,
              timesheetDate:
                response.data?.timesheetsByAllocation[0]?.timesheet_date,
              managerEmail:
                response.data?.timesheetsByAllocation[0]?.manager_email,
              benchHours: response.data?.timesheetsByAllocation[0]?.bench_hours,
              timeOffHours: response.data?.timesheetsByAllocation[0]?.time_off,
              overTimeHours: response.data?.timesheetsByAllocation[0]?.overtime,
              projectHours:
                response.data?.timesheetsByAllocation[0]?.hours_per_day,
              taskDescription: response.data?.timesheetsByAllocation[0]?.task,
              status:
                response.data?.timesheetsByAllocation[0]?.timesheet_status,
              comments: response.data?.timesheetsByAllocation[0]?.comments,
              createdBy: response.data?.timesheetsByAllocation[0]?.created_by,
              createdDate: response.data?.timesheetsByAllocation[0]?.created_at,
              updatedBy: response.data?.timesheetsByAllocation[0]?.updated_by,
              updatedDate: response.data?.timesheetsByAllocation[0]?.updated_at,
              totalHours:
                response.data?.timesheetsByAllocation[0]?.bench_hours +
                response.data?.timesheetsByAllocation[0]?.time_off +
                response.data?.timesheetsByAllocation[0]?.overtime +
                response.data?.timesheetsByAllocation[0]?.hours_per_day,
              isWeekend: Utils.isWeekendDate(givenDate),
              employeeProject: {
                employeeProjectAllocationId:
                  response.data?.timesheetsByAllocation[0]?.emp_proj_aloc_id,
                allocationHoursPerDay:
                  response.data?.timesheetsByAllocation[0]
                    ?.allocation_hrs_per_day,
              },
              projectDetails: {
                projectId: response.data?.timesheetsByAllocation[0]?.project_id,
                projectName:
                  response.data?.timesheetsByAllocation[0]?.project_name,
                location:
                  response.data?.timesheetsByAllocation[0]?.project_location,
              },
            } as TimesheetEntry,
          ];

          appendTimesheetEntries(givenDate, timesheetEntryArray);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  const appendTimesheetEntries = (
    givenDate: Date,
    newItem: TimesheetEntry[]
  ) => {
    let dateExists = false;

    const updatedEntries: TimesheetEntries[] = timesheetEntries.map((obj) => {
      if (obj.date === givenDate) {
        dateExists = true;
        return {
          ...obj,
          entry: [...obj.entry, ...newItem],
        };
      }
      return obj;
    });

    if (!dateExists) {
      updatedEntries.push({ date: givenDate, entry: newItem });
    }

    setTimesheetEntries(updatedEntries);
  };

  return (
    <div>
      <h1>hai from fancy timesheet..</h1>
    </div>
  );
};

export default FancyTimesheet;
