import React, { useEffect, useState } from "react";
import "./TaskEffort.css";
import { TimesheetEntries } from "../types/TimesheetEntries";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddEditTimesheet from "./AddEditTimeSheet";

const dayAbbreviation = (date: Date) =>
  date.toLocaleDateString("en-US", { weekday: "short" });

const formatMonthDate = (date: Date): string => {
  const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  const day = date.getDate();
  return `${month}/${day}`;
};

const colorNames: string[] = [
  "progress-bar bg-warning",
  "progress-bar bg-info",
  "progress-bar bg-primary",
];

const TaskEffort = (props: TimesheetEntries) => {
  const [open, setOpen] = React.useState(false);

  const showAddEditTimesheet = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="container">
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
              {formatMonthDate(new Date(props.date))}
            </div>
          </div>
        </div>

        <div
          onClick={() => showAddEditTimesheet()}
          className="progress mb-3 progressBar"
        >
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
      {open && ( 
        <div style={{ width: "100%" }}>
        <Dialog  open={open} onClose={handleClose}>
          {/* <DialogTitle>New Entry</DialogTitle> */}
          <DialogContent >
            <AddEditTimesheet
              key={props.date.toDateString()} // Remember to provide a unique key for each mapped element
              date={props.date}
              entry={props.entry}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Save</Button>
          </DialogActions>
        </Dialog>
        </div>
      )}  
    </>
  );
};

export default TaskEffort;
