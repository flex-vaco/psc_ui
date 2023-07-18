import React, { useEffect, useState } from "react";
import "./TaskEffort.css";
import { TimesheetEntries } from "../types/TimesheetEntries";
import { formatToMonthDate } from "../lib/Utils";
import { HoursType } from "../pages/timesheet/FancyTimesheet";
import { VerticalAlignBottom } from "@mui/icons-material";

export interface HoursDashboardProps {
  startDate: string;
  endDate: string;
  selectedProjectId: number;
  showWeekend: boolean;
  timesheetHours: HoursType;
  handleShowWeekend: (isShowWeekend: boolean) => any;
}

export const convertNumberToOneDecimalString = (num: number): string => {
  const truncated = num.toFixed(1); // Convert to string with one decimal place
  return truncated;
};

const HoursDashboard: React.FC<HoursDashboardProps> = (
  props: HoursDashboardProps
) => {
  return (
    <div className="container-fluid hoursContainer">
      <div className="row">
        <div className="col-2" style={{ textAlign: "center" }}>
          <span>
            <div className="hours-name">{"Project Hours"}</div>

            <div className="hours">
              {convertNumberToOneDecimalString(
                props.timesheetHours.projectHours
              )}
            </div>
            <div className="period">{`Period (${formatToMonthDate(
              new Date(props.startDate)
            )} - ${formatToMonthDate(new Date(props.endDate))})`}</div>
          </span>
        </div>
        <span className="vr"></span>
        <div className="col-2" style={{ textAlign: "center" }}>
          <span>
            <div className="hours-name">{"Bench Hours"}</div>

            <div className="hours">
              {convertNumberToOneDecimalString(props.timesheetHours.benchHours)}
            </div>
            <div className="period">{`Period (${formatToMonthDate(
              new Date(props.startDate)
            )} - ${formatToMonthDate(new Date(props.endDate))})`}</div>
          </span>
        </div>
        <span className="vr"></span>
        <div className="col-2" style={{ textAlign: "center" }}>
          <span>
            <div className="hours-name">{"Overtime Hours"}</div>

            <div className="hours">
              {convertNumberToOneDecimalString(
                props.timesheetHours.overTimeHours
              )}
            </div>
            <div className="period">{`Period (${formatToMonthDate(
              new Date(props.startDate)
            )} - ${formatToMonthDate(new Date(props.endDate))})`}</div>
          </span>
        </div>
        <span className="vr"></span>
        <div className="col-2" style={{ textAlign: "center" }}>
          <span>
            <div className="hours-name">{"TimeOff Hours"}</div>
            <div className="hours">
              {convertNumberToOneDecimalString(
                props.timesheetHours.timeOffHours
              )}
            </div>
            <div className="period">{`Period (${formatToMonthDate(
              new Date(props.startDate)
            )} - ${formatToMonthDate(new Date(props.endDate))})`}</div>
          </span>
        </div>
        <span className="vr"></span>

        <div
          className="col-3"
          style={{ verticalAlign: "bottom", float: "right", marginTop:"20px" }}
        >
          <div>
            <div style={{ verticalAlign: "bottom", float: "right" }}>
              <span className="period">{"Timesheet Total "}</span>
              <span className="timesheetTotalHours">{`${props.timesheetHours.totalReportedHours}`}</span>
              <span className="period">{"  hours"}</span>
            </div>

            <div
              className="form-check form-switch"
              style={{ verticalAlign: "bottom", float: "right", marginTop: "10px" }}
            >
              <label
                className="form-check-label period"
                htmlFor="flexSwitchCheckDefault"
              >
                Show Weekend
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                value={props.showWeekend ? 1 : 0}
                onChange={(e) => {
                  props.handleShowWeekend(e.target.checked);
                }}
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoursDashboard;
