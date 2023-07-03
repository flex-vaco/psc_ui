import { EmployeeProject } from "./EmployeeProject";
import { Nullable } from "./Nullable";
import { Project } from "./Project";

export interface TimesheetEntry {
  timesheetId: number;
  projectHours: Nullable<number>;
  overTimeHours: Nullable<number>;
  benchHours: Nullable<number>;
  timeOffHours: Nullable<number>;
  projectId: Nullable<number>;
  taskDescription: Nullable<string>;
  employeeId: number;
  status: string;
  comments: any[];
  createdBy: number;
  createdDate: Date;
  updatedBy: number;
  updatedDate: Date;
  employeeProject: EmployeeProject;
  projectDetails: Project;
  managerEmail: string;
  timesheetDate: Date;

  //Calculation
  totalHours: number; //PH+OH+BH+TH
  isWeekend: boolean; //true or false
  isHoliday: boolean;
}
