import { Nullable } from "./Nullable";
import { Project } from "./Project";

export interface EmployeeProject {
  employeeId: Nullable<number>;
  projectDetails: Project;
  employeeProjectAllocationId: number;
  allocationHoursPerDay: number;
}
