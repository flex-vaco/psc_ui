import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import * as Utils from "../../lib/Utils";
import APP_CONSTANTS from "../../appConstants";
import * as APP_FUNCTIONS from "../../lib/AppFunctions";
import "./FancyTimesheet.css";
import { TimesheetEntries } from "../../types/TimesheetEntries";
import { TimesheetEntry } from "../../types/TimesheetEntry";
import { Nullable } from "../../types/Nullable";
import { User } from "../../types/User";
import { EmployeeProject } from "../../types/EmployeeProject";
import TaskEffort from "../../components/TaskEffort";

const FancyTimesheet = () => {
  const userAsString: string = localStorage.getItem("user")?.toString() || "";
  const user: User = JSON.parse(userAsString) || null;
  const [employeeId, setEmployeeId] = useState<Nullable<number>>(
    APP_FUNCTIONS.userIsEmployee() ? user?.emp_id : null
  );
  const [timesheetEntries, setTimesheetEntries] = useState<
    Array<TimesheetEntries>
  >([]);
  const [showWeekend, setShowWeekend] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("2023-04-01");
  const [endDate, setEndDate] = useState<string>("2023-05-30");

  useEffect(() => {
    fetchTimesheets();
  }, [startDate, endDate, employeeId]);

  function calculateTotalHours(timesheetData: any): number {
    return isNaN(timesheetData?.bench_hours)
      ? 0
      : Number(timesheetData?.bench_hours) +
          (isNaN(timesheetData?.time_off)
            ? 0
            : Number(timesheetData?.time_off) +
              (isNaN(timesheetData?.overtime)
                ? 0
                : Number(timesheetData?.overtime) +
                  (isNaN(timesheetData?.hours_per_day)
                    ? 0
                    : Number(timesheetData?.hours_per_day))));
  }

  const loadInitialTimesheetEntries = (
    showWeekend: boolean
  ): TimesheetEntries[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates: Date[] = [];

    // Iterate over each day between start and end dates
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      // Check if the current date is a weekend
      if (showWeekend || !Utils.isWeekendDate(date)) {
        dates.push(new Date(date));
      }
    }

    // Initialize timesheetEntries state with the array of dates
    const initialEntries: TimesheetEntries[] = dates.map((date) => ({
      date,
      entry: [],
    }));

    return initialEntries;
  };

  /*    
  const [employeeProjects, setEmployeeProjects] = useState<
    Array<EmployeeProject>
  >([]);
  
  useEffect(() => {
    fetchEmployeeProjects(employeeId);
  }, [employeeId]);*/

  /*//To fetch the employee-projects relationship data
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
  };*/

  const fetchTimesheets = () => {
    axios
      .post(`/timesheets/entries_by_dates`, {
        startDate: Utils.formatDateYYYYMMDD(new Date(startDate)),
        endDate: Utils.formatDateYYYYMMDD(new Date(endDate)),
        empId: employeeId,
      })
      .then((response) => {
        const updatedEntries: Array<TimesheetEntries> =
          loadInitialTimesheetEntries(showWeekend);

        response.data.timesheetsByAllocation.forEach((timesheetData: any) => {
          const totalHours = calculateTotalHours(timesheetData);
          const timesheetEntry: TimesheetEntry = {
            timesheetId: timesheetData?.timesheet_id,
            employeeId: timesheetData?.emp_id,
            timesheetDate: timesheetData?.timesheet_date,
            managerEmail: timesheetData?.manager_email,
            benchHours: timesheetData?.bench_hours,
            timeOffHours: timesheetData?.time_off,
            overTimeHours: timesheetData?.overtime,
            projectHours: timesheetData?.hours_per_day,
            taskDescription: timesheetData?.task,
            status: timesheetData?.timesheet_status,
            comments: timesheetData?.comments,
            createdBy: timesheetData?.created_by,
            createdDate: timesheetData?.created_at,
            updatedBy: timesheetData?.updated_by,
            updatedDate: timesheetData?.updated_at,
            totalHours: totalHours,
            isWeekend: Utils.isWeekendDate(timesheetData?.timesheet_date),
            employeeProject: {
              employeeProjectAllocationId: timesheetData?.emp_proj_aloc_id,
              allocationHoursPerDay: timesheetData?.allocation_hrs_per_day,
            },
            projectDetails: {
              projectId: timesheetData?.project_id,
              projectName: timesheetData?.project_name,
              location: timesheetData?.project_location,
            },
          } as TimesheetEntry;

          let dateExists = false;
          updatedEntries.forEach((obj) => {
            const objDate = new Date(obj.date);
            const givenDate = new Date(timesheetData?.timesheet_date);

            const isSameDate =
              objDate.getFullYear() === givenDate.getFullYear() &&
              objDate.getMonth() === givenDate.getMonth() &&
              objDate.getDate() === givenDate.getDate();

            if (isSameDate) {
              dateExists = true;
              obj.entry.push(timesheetEntry);
            }
          });

          if (!dateExists) {
            updatedEntries.push({
              date: timesheetData?.timesheet_date,
              entry: [timesheetEntry],
            });
          }
        });

        // Calculate totalHoursThisDay for each entry
        updatedEntries.forEach((entry) => {
          entry.totalHoursThisDay = calculateTotalHoursThisDay(entry.entry);
        });

        setTimesheetEntries(updatedEntries);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const calculateTotalHoursThisDay = (entry: TimesheetEntry[]): number => {
    return entry.reduce((total, item) => (total += item.totalHours || 0), 0);
  };

  return (
    <React.Fragment>
      {timesheetEntries.map((timesheetEntry) => (
        <TaskEffort
          key={timesheetEntry.date.toString()} // Remember to provide a unique key for each mapped element
          date={timesheetEntry.date}
          entry={timesheetEntry.entry}
        />
        
      ))}
    </React.Fragment>
  );
};

export default FancyTimesheet;
