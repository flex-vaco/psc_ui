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
import TimesheetFilters from "../../components/TimesheetFilters";

export type HoursType = {
  projectHours: number;
  benchHours: number;
  overTimeHours: number;
  timeOffHours: number;
  totalReportedHours: number;
};

const FancyTimesheet = () => {
  const userAsString: string = localStorage.getItem("user")?.toString() || "";
  const user: User = JSON.parse(userAsString) || null;
  const [employeeId, setEmployeeId] = useState<Nullable<number>>(
    APP_FUNCTIONS.userIsEmployee() ? user?.emp_id : null
  );
  const [timesheetEntries, setTimesheetEntries] = useState<
    Array<TimesheetEntries>
  >([]);
  const [loggedInUserInfo, setLoggedInUserInfo] = useState<User>(user);
  const [showWeekend, setShowWeekend] = useState<boolean>(false);
  const currentMonthDates = Utils.getStartEndDatesCurrentMonth();
  const [startDate, setStartDate] = useState<string>(
    currentMonthDates?.monthStartDate
  );
  const [endDate, setEndDate] = useState<string>(
    currentMonthDates?.monthEndDate
  );
  const [employeeProjects, setEmployeeProjects] = useState<
    Array<EmployeeProject>
  >([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number>(-1);
  const [timesheetHours, setTimesheetHours] = useState<HoursType>({
    benchHours: 0,
    projectHours: 0,
    overTimeHours: 0,
    timeOffHours: 0,
    totalReportedHours: 0,
  } as HoursType);

  useEffect(() => {
    fetchTimesheets();
    fetchEmployeeProjects();
  }, [employeeId]);

  useEffect(() => {
    fetchTimesheets();
    filterByDate();
  }, [startDate, endDate]);

  useEffect(() => {
    fetchTimesheets();
  }, [selectedProjectId, showWeekend]);

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

  //To fetch the employee-projects relationship data
  const fetchEmployeeProjects = (): void => {
    let employeeProjectsLocal: Array<EmployeeProject>;
    axios
      .get(`/empPrjAloc/empallocation`, { params: { emp_id: employeeId } })
      .then((response) => {
        //default project option "All"
        employeeProjectsLocal = [
          {
            projectDetails: {
              projectId: -1,
              projectName: "All",
              location: "",
            },
            employeeId: employeeId,
            employeeProjectAllocationId: -1,
            allocationHoursPerDay: -1,
          },
        ];

        if (response.data?.employee_allocation.length > 0) {
          response.data?.employee_allocation.map((element: any) => {
            employeeProjectsLocal = [
              ...employeeProjectsLocal,
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
          setEmployeeProjects(employeeProjectsLocal);
        }
        setEmployeeProjects(employeeProjectsLocal);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchUserDetails = () => {
    axios.get(`/users/${employeeId}`).then((response) => {
      const user: User = {
        first_name: response?.data.first_name,
        last_name: response?.data.last_name,
        email: response?.data.email,
        role: response?.data.role,
        emp_id: response?.data.emp_id,
      } as User;
      setLoggedInUserInfo(user);
    });
  };

  const fetchTimesheets = () => {
    axios
      .post(`/timesheets/entries_by_dates`, {
        startDate: Utils.formatDateYYYYMMDD(new Date(startDate)),
        endDate: Utils.formatDateYYYYMMDD(new Date(endDate)),
        empId: employeeId,
      })
      .then(async (response) => {
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
            projectId: timesheetData?.project_id,
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

        if (selectedProjectId !== -1) {
          const filteredEntriesByProject = filterByProject(updatedEntries);
          setTimesheetEntries(filteredEntriesByProject);
          setTimesheetHours(calculateAllTimesheetHours(filteredEntriesByProject));
        } else {
          setTimesheetEntries(updatedEntries);
          setTimesheetHours(calculateAllTimesheetHours(updatedEntries));

        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const calculateAllTimesheetHours = (timesheetEntriesArray: Array<TimesheetEntries>): HoursType => {
    var projectHours = 0;
    var overTimeHours = 0;
    var benchHours = 0;
    var timeOffHours = 0;
    var totalReportedHours = 0;

    timesheetEntriesArray.forEach((entries) => {
      entries.entry.forEach((timesheetEntry) => {
        projectHours += timesheetEntry.projectHours ?? 0;
        benchHours += timesheetEntry.benchHours ?? 0;
        overTimeHours += timesheetEntry.overTimeHours ?? 0;
        timeOffHours += timesheetEntry.timeOffHours ?? 0;
        totalReportedHours += timesheetEntry.totalHours ?? 0;
      });
    });
    return {
      benchHours: benchHours,
      projectHours: projectHours,
      overTimeHours: overTimeHours,
      timeOffHours: timeOffHours,
      totalReportedHours: totalReportedHours,
    } as HoursType
  };

  const calculateTotalHoursThisDay = (entry: TimesheetEntry[]): number => {
    return entry.reduce((total, item) => (total += item.totalHours || 0), 0);
  };
  const filterByDate = (): void => {
    const filteredEntries = timesheetEntries.filter((entry) => {
      const entryDate = new Date(entry.date);
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const isDateInRange =
        entryDate >= startDateObj && entryDate <= endDateObj;

      return isDateInRange;
    });
    setTimesheetEntries(filteredEntries);
  };

  const filterByProject = (
    timesheetEntriesParam: TimesheetEntries[]
  ): TimesheetEntries[] => {
    const filteredEntries = timesheetEntriesParam.map((e) => {
      return {
        date: e.date,
        totalHoursThisDay: e.totalHoursThisDay,
        entry: e?.entry?.filter((a) => a?.projectId === selectedProjectId),
      } as TimesheetEntries;
    });

    const filteredByProject = filteredEntries.filter((a) => a.entry.length > 0);
    //setTimesheetEntries(filteredProject);
    return filteredByProject;
  };

  const handleProjectFilter = (projectId: number): void => {
    setSelectedProjectId(projectId);
  };
  const handleDateFilter = (startDate: string, endDate: string): void => {
    if (!startDate) setStartDate(currentMonthDates?.monthStartDate);
    else setStartDate(startDate);
    if (!endDate) setEndDate(currentMonthDates?.monthEndDate);
    else setEndDate(endDate);
  };

  const handleShowWeekend = (isShowWeekend: boolean): void => {
    setShowWeekend(isShowWeekend);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row" style={{ backgroundColor: "lightgray" }}>
          <TimesheetFilters
            userInfo={loggedInUserInfo}
            empProjects={employeeProjects}
            startDate={startDate}
            endDate={endDate}
            showWeekend={showWeekend}
            selectedProjectId={selectedProjectId}
            timesheetHours={timesheetHours}
            handleDateFilter={handleDateFilter}
            handleProjectFilter={handleProjectFilter}
            handleShowWeekend={handleShowWeekend}
          ></TimesheetFilters>
        </div>
        <div className="row">
          <div className="col-md-3">
            <br />
          </div>
        </div>
        <div className="row">
          {timesheetEntries.map((timesheetEntry) => (
            <TaskEffort
              key={timesheetEntry.date.toString()} // Remember to provide a unique key for each mapped element
              date={timesheetEntry.date}
              entry={timesheetEntry.entry}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default FancyTimesheet;
