import { Label } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import React from "react";
import { TimesheetEntries } from "../types/TimesheetEntries";

const AddEditTimesheet = (props: TimesheetEntries) => {
  console.log(props);
  return (
    <>
      <Grid className="dialogBody" container spacing={2}>
        <Grid className="gridRow" xs={6} md={12}>
          <div>{new Date(props.date.toString()).toDateString()}</div>
        </Grid>
        <Grid style={{ marginTop: "20px" }} xs={6} md={4}>
          <label>Project:</label>
        </Grid>
        <Grid style={{ marginTop: "20px" }} xs={6} md={8}>
          <FormControl>
            <NativeSelect
              defaultValue={30}
              inputProps={{
                name: "project",
                id: "uncontrolled-native",
              }}
            >
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid style={{ marginTop: "20px" }}xs={6} md={4}>
          <label>Description:</label>
        </Grid>
        <Grid style={{ marginTop: "20px" }} xs={6} md={8}>
          <FormControl fullWidth>
            <TextField
              placeholder="Timeentry description"
              multiline
              id="description"
            ></TextField>
          </FormControl>
        </Grid>
        <Grid style={{ marginTop: "20px" }} xs={6} md={4}>
          <label>Hours:</label>
        </Grid>
        <Grid style={{ marginTop: "20px" }} xs={6} md={8}>
          <TextField
            style={{ width: "75px", marginRight: "15px" }}
            id="outlined-number"
            label="Project"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{ width: "75px", marginRight: "15px" }}
            id="outlined-number"
            label="OT"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{ width: "75px", marginRight: "15px" }}
            id="outlined-number"
            label="Bench"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{ width: "75px" }}
            id="outlined-number"
            label="Time Off"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddEditTimesheet;
