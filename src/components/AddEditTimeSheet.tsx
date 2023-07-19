import { Label } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import React from "react";
import { TimesheetEntries } from "../types/TimesheetEntries";
import { EmployeeProject } from "../types/EmployeeProject";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Projects {
  projects: Array<EmployeeProject>;
}

type AddEdditTimeSheet = TimesheetEntries & Projects;

const AddEditTimesheet = (props: AddEdditTimeSheet) => {
  const [expanded, setExpanded] = React.useState<number | false>(0);
  console.log(props);
  const handleProjectChange = (e: any) => {
    e.preventDefault();
  };

  const handleAccordianChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleSave = () => {};
  return (
    <>
      <Grid className="dialogBody" container spacing={2}>
        <Grid item={true} className="gridRow" xs={6} md={12}>
          <div>{new Date(props.date.toString()).toDateString()}</div>
        </Grid>
        {props.entry.map((timeEntry, index) => {
          return (
            <Accordion
             
              expanded={expanded === index}
              onChange={handleAccordianChange(index)}
            >
              <AccordionSummary
                style={{ backgroundColor:'#ffc107' }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              ></AccordionSummary>
              <AccordionDetails>
                <Grid className="dialogBody" container spacing={2}>
                  <Grid item={true} style={{ marginTop: "20px" }} xs={6} md={4}>
                    <label>Project:</label>
                  </Grid>
                  <Grid item={true} style={{ marginTop: "20px" }} xs={6} md={8}>
                    <FormControl>
                      <NativeSelect
                        onChange={handleProjectChange}
                        value={props.entry[index]?.projectDetails.projectId}
                        defaultValue={30}
                        inputProps={{
                          name: "project",
                          id: "select-project",
                        }}
                      >
                        {props.projects.map((prj) => (
                          <option
                            key={prj.projectDetails.projectId}
                            value={prj.projectDetails.projectId}
                          >
                            {prj.projectDetails.projectName}
                          </option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  </Grid>
                  <Grid item={true} style={{ marginTop: "20px" }} xs={6} md={4}>
                    <label>Description:</label>
                  </Grid>
                  <Grid item={true} style={{ marginTop: "20px" }} xs={6} md={8}>
                    <FormControl fullWidth>
                      <TextField
                        placeholder="Timeentry description"
                        multiline
                        id="description"
                        value={props?.entry[index]?.taskDescription || ""}
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid item={true} style={{ marginTop: "20px" }} xs={6} md={4}>
                    <label>Hours:</label>
                  </Grid>
                  <Grid item={true} style={{ marginTop: "20px" }} xs={6} md={8}>
                    <TextField
                      style={{ width: "75px", marginRight: "15px" }}
                      id="outlined-number"
                      label="Project"
                      type="number"
                      value={props?.entry[index]?.projectHours || 0}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      style={{ width: "75px", marginRight: "15px" }}
                      id="outlined-number"
                      label="OT"
                      value={props?.entry[index]?.overTimeHours || 0}
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
                      value={props?.entry[index]?.benchHours || 0}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      style={{ width: "75px" }}
                      id="outlined-number"
                      label="Time Off"
                      type="number"
                      value={props?.entry[index]?.timeOffHours || 0}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid
                    item={true}
                    style={{ marginTop: "20px", textAlign: "end" }}
                    xs={12}
                    md={12}
                  >
                    <Button variant="contained" onClick={handleSave}>
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Grid>
    </>
  );
};

export default AddEditTimesheet;
