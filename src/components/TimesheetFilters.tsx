import React, { useEffect, useReducer, useState } from "react";
import "./TaskEffort.css";
import { TimesheetEntries } from "../types/TimesheetEntries";
import { User } from "../types/User";
import { EmployeeProject } from "../types/EmployeeProject";
import HoursDashboard from "./HoursDashboard";
import { HoursType } from "../pages/timesheet/FancyTimesheet";
import "./TaskEffort.css";
import Dropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";
import {
  OnDatesChangeProps,
} from "@datepicker-react/styled";
import { DateRangeInput } from "@datepicker-react/styled";
import { ThemeProvider } from "styled-components";

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
  const initialState = {
    startDate: new Date(props.startDate),
    endDate: new Date(props.endDate),
    focusedInput: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "focusChange":
        return { ...state, focusedInput: action.payload };
      case "dateChange":
        return action.payload;
      default:
        throw new Error();
    }
  }

  const handleDateSelection = (data: OnDatesChangeProps) => {
    if (data?.startDate != null && data?.endDate != null) {
      props.handleDateFilter(
        data.startDate?.toString() ?? "",
        data.endDate?.toString() ?? ""
      );
    }
  };

  const options = props.empProjects.map((empProjects) => {
    return {
      value: empProjects.projectDetails?.projectId.toString(),
      label: empProjects.projectDetails?.projectName,
    } as Option;
  });

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
        <div className="col-3"></div>
      </div>
      <div className="row">
        <div className="col-7">
            <ThemeProvider
            theme={{
              breakpoints: ["32em", "48em", "64em"],
              reactDatepicker: {
                daySize: [30, 34],
                fontFamily: "system-ui, -apple-system",
                colors: {
                  accessibility: "#D80249",
                  selectedDay: "#f7518b",
                  selectedDayHover: "#F75D95",
                  primaryColor: "#d8366f",
                },
                dateRangeZIndex: "999",
              },
            }}
            
          >
            <DateRangeInput
              onDatesChange={(data) => {
                dispatch({ type: "dateChange", payload: data });
                handleDateSelection(data);
              }}
              onFocusChange={(focusedInput) =>
                dispatch({ type: "focusChange", payload: focusedInput })
              }
              startDate={state.startDate} // Date or null
              endDate={state.endDate} // Date or null
              focusedInput={state.focusedInput} // START_DATE, END_DATE or null
            />
          </ThemeProvider>

        </div>
        <div className="col-3"></div>
        <div className="col-2">
          <Dropdown
            options={options}
            value={
              props.empProjects.filter(
                (a) => a?.projectDetails?.projectId === props.selectedProjectId
              )[0]?.projectDetails?.projectName
            }
            onChange={(args) => props.handleProjectFilter(Number(args?.value))}
          />
        </div>
      </div>
      <div className="row"><br></br></div>
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
