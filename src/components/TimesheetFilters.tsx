import React, { useEffect, useState } from "react";
import "./TaskEffort.css";
import { TimesheetEntries } from "../types/TimesheetEntries";
import { User } from "../types/User";
import { EmployeeProject } from "../types/EmployeeProject";
import HoursDashboard from "./HoursDashboard";
import { HoursType } from "../pages/timesheet/FancyTimesheet";
import "./TaskEffort.css";

export interface FiltersProps {
  userInfo: User;
  startDate: string;
  endDate: string;
  empProjects: EmployeeProject[];
  selectedProjectId: number;
  showWeekend: boolean;
  timesheetHours: HoursType;
  handleDateFilter: (startDate: string, endDate: string) => any;
  handleProjectFilter: (projectId: number) => any;
  handleShowWeekend: (isShowWeekend: boolean) => any;
}

const TimesheetFilters = (props: FiltersProps) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.handleDateFilter(startDate, endDate);
  };

  return (
    <div className="container border">
      <div className="row">
        <div className="col-12">
          <div className="emp-name">{`${props.userInfo.first_name}  ${props.userInfo.last_name}`}</div>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <div className="email">{`Email: ${props.userInfo.email}`}</div>
          <div className="email">{`Role: ${props.userInfo.role}`}</div>
        </div>
        <div className="col-3"></div>
        <div className="col-3">
          <label htmlFor="project-dropdown">Select Project </label>
          <div id="project-dropdown" className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle projectDropdownButton"
              type="button"
              id="projectDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {
                props.empProjects.filter(
                  (a) =>
                    a?.projectDetails?.projectId === props.selectedProjectId
                )[0]?.projectDetails?.projectName
              }
            </button>
            <ul
              className="dropdown-menu projectDropdownMenu"
              aria-labelledby="projectDropdown"
            >
              {props.empProjects.map((empProjects) => (
                <li key={empProjects.projectDetails?.projectId}>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() =>
                      props.handleProjectFilter(
                        empProjects.projectDetails?.projectId
                      )
                    }
                  >
                    {empProjects.projectDetails?.projectName}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-7">
          <form onSubmit={handleSubmit} className="row">
              <div className="col-3">
                <div className="form-group float-start mb-2 me-2">
                  <label htmlFor="dispStartDate">Start Date</label>
                  <input
                    className="form-control"
                    type="date"
                    name="startDate"
                    id="startDate"
                    defaultValue={props.startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group float-start">
                  <label htmlFor="dispEndDate">End Date</label>
                  <input
                    className="form-control"
                    type="date"
                    name="endDate"
                    id="endDate"
                    defaultValue={props.endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group float-start mb-2 me-2">
                  <label htmlFor="get"> </label>
                  <button
                    onClick={(event) => {
                      handleSubmit(event);
                    }}
                    type="submit"
                    name="get"
                    className="form-control btn btn-outline-info me-2"
                  >
                    Filter
                  </button>
                </div>
              </div>
          </form>
        </div>
        <div className="col-4">
          
        </div>
      </div>
      <div className="row">
        <HoursDashboard
          startDate={props.startDate}
          endDate={props.endDate}
          showWeekend={props.showWeekend}
          selectedProjectId={0}
          handleShowWeekend={props.handleShowWeekend}
          timesheetHours={props.timesheetHours}
        ></HoursDashboard>
      </div>
    </div>
  );
};

export default TimesheetFilters;
