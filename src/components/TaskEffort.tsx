import React, { useEffect, useState } from "react";
import "./TaskEffort.css";
import { TimesheetEntries } from "../types/TimesheetEntries";

const dayAbbreviation = (date: Date) =>
  date.toLocaleDateString("en-US", { weekday: "short" });

const formatMonthDate = (date: Date): string => {
  const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  const day = date.getDate();
  return `${month}/${day}`;
};

const colorNames: string[] = ['progress-bar bg-warning', 'progress-bar bg-info', 'progress-bar bg-primary'];

const TaskEffort = (props: TimesheetEntries) => {
  return (
    <>
      <div className="container">
        <div className="dateContainerSection">
          <div className="daySection1">
          <div className={`container-fluid daySection2 ${props.entry.length === 0 ? 'redFontColor' : ''}`}>
              {dayAbbreviation(new Date(props.date))}
            </div>
            <div className={`container-fluid dateSection ${props.entry.length === 0 ? 'redFontColor' : ''}`}>
              {formatMonthDate(new Date(props.date))}
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
