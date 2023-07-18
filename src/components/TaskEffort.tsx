import React, { useEffect, useState } from "react";
import "./TaskEffort.css";
import { TimesheetEntries } from "../types/TimesheetEntries";
import { formatToMonthDate } from "../lib/Utils";

const dayAbbreviation = (date: Date) =>
  date.toLocaleDateString("en-US", { weekday: "short" });

const colorNames: string[] = [
  "progress-bar bg-warning",
  "progress-bar bg-info",
  "progress-bar bg-primary",
];

const TaskEffort = (props: TimesheetEntries) => {
  return (
    <>
      <div className="container" style={{ marginBottom: "-5px" }}>
        <div className="dateContainerSection">
          <div className="daySection1">
            <div
              className={`container-fluid daySection2 ${
                props.entry.length === 0 ? "redFontColor" : ""
              }`}
            >
              {dayAbbreviation(new Date(props.date))}
            </div>
            <div
              className={`container-fluid dateSection ${
                props.entry.length === 0 ? "redFontColor" : ""
              }`}
            >
              {formatToMonthDate(new Date(props.date))}
            </div>
          </div>
        </div>
        <span></span>

        <div className="progress mb-3 progressBar">
          {props.entry.map((entry, i) => (
            <div
              key={i}
              className={colorNames[i]}
              style={{
                width: `${
                  (entry.totalHours /
                    (props.totalHoursThisDay === undefined
                      ? 1
                      : props.totalHoursThisDay)) *
                  12.5
                }%`,
              }}
              aria-valuenow={
                (entry.totalHours /
                  (props.totalHoursThisDay === undefined
                    ? 1
                    : props.totalHoursThisDay)) *
                100
              }
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div>
                <label className="progressBarHoursSection">{`${entry.totalHours} hours | ${entry.projectDetails?.projectName}`}</label>
                {["APPROVED", "ACCEPTED"].includes(
                  entry.status.toUpperCase()
                ) && <div className="checkmark"></div>}
                {["REJECTED"].includes(entry.status.toUpperCase()) && (
                  <div className="red-x big-x">&#10006;</div>
                )}
                {["SUBMITTED"].includes(entry.status.toUpperCase()) && (
                  <div className="red-x big-x">&#10531;</div>
                )}
                <label
                  className="progressBarStatusSection"
                  style={{
                    color: `${
                      ["SUBMITTED", "ENTERED"].includes(
                        entry.status.toUpperCase()
                      )
                        ? "slateblue"
                        : ["APPROVED", "ACCEPTED"].includes(
                            entry.status.toUpperCase()
                          )
                        ? "forestgreen"
                        : "red"
                    }`,
                  }}
                >{`${entry.status
                  .replace(/(\w)(\w*)/g, function (_, firstChar, restOfString) {
                    return firstChar.toUpperCase() + restOfString.toLowerCase();
                  })
                  .replace(/\s+/g, "")}`}</label>
              </div>
              <div>
                <label className="progressBarTaskSection">
                  {entry.taskDescription}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskEffort;
