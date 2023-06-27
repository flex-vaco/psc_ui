import { Nullable } from "./Nullable";
import { TimesheetEntry } from "./TimesheetEntry";

export interface TimesheetEntries {
  date: Date; //primary key
  entry: Array<TimesheetEntry>;
  }
