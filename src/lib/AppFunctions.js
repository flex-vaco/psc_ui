import APP_CONSTANTS from "../appConstants";

const menuAccessRoles = [
  APP_CONSTANTS.USER_ROLES.SUPERVISOR,
  APP_CONSTANTS.USER_ROLES.ADMIN,
  APP_CONSTANTS.USER_ROLES.PRODUCER
];
const utilizationAccessRoles = [
  APP_CONSTANTS.USER_ROLES.SUPERVISOR,
  APP_CONSTANTS.USER_ROLES.ADMIN,
];
const allocationAccessRoles = [
  APP_CONSTANTS.USER_ROLES.SUPERVISOR,
  APP_CONSTANTS.USER_ROLES.ADMIN,
];
const employeeAccessRoles = [
  APP_CONSTANTS.USER_ROLES.SUPERVISOR,
  APP_CONSTANTS.USER_ROLES.ADMIN,
];
const projectAccessRoles = [
  APP_CONSTANTS.USER_ROLES.SUPERVISOR,
  APP_CONSTANTS.USER_ROLES.ADMIN,
];

const reportAccessRoles = [
  APP_CONSTANTS.USER_ROLES.SUPERVISOR,
  APP_CONSTANTS.USER_ROLES.ADMIN,
  APP_CONSTANTS.USER_ROLES.PRODUCER
];

const aiChatAccessRoles = reportAccessRoles;
const userAccessRoles = [APP_CONSTANTS.USER_ROLES.ADMIN];

export const hasMenuAccess = (activeUserRole) => {
  return menuAccessRoles.includes(activeUserRole) ? true : false;
};
export const hasEmployeeAccess = (activeUserRole) => {
  return employeeAccessRoles.includes(activeUserRole) ? true : false;
};
export const hasAllocationAccess = (activeUserRole) => {
  return allocationAccessRoles.includes(activeUserRole) ? true : false;
};
export const hasProjectAccess = (activeUserRole) => {
  return projectAccessRoles.includes(activeUserRole) ? true : false;
};
export const hasUtilizationAccess = (activeUserRole) => {
  return utilizationAccessRoles.includes(activeUserRole) ? true : false;
};
export const hasUserAccess = (activeUserRole) => {
  return userAccessRoles.includes(activeUserRole) ? true : false;
};
export const hasReportAccess = (activeUserRole) => {
  return reportAccessRoles.includes(activeUserRole) ? true : false;
};
export const hasAIChatAccess = (activeUserRole) => {
  return aiChatAccessRoles.includes(activeUserRole) ? true : false;
};