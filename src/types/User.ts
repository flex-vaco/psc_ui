import { Nullable } from "./Nullable";

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  emp_id: number;
  project_id: Nullable<number>;
  needsPasswordReset: Nullable<boolean>;
  isManager: boolean;
  isProvider: boolean;
}
