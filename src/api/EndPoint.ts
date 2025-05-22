export const BASE_URL = 'https://earthirrigation.nativebittechnologies.in/api'

export const LOGIN = ():string => `${BASE_URL}/auth/check`
export const DASHBOARD = ():string => `${BASE_URL}/dashboard`
export const USER_PERMISSION = ():string => `${BASE_URL}/permission/getUserPermission`
export const SAVE_VISIT = ():string => `${BASE_URL}/visit/saveVisit`
export const ADD_VISIT = ():string => `${BASE_URL}/visit/addVisit`
export const GET_VISIT_LIST = ():string => `${BASE_URL}/visit/getVisitList`
export const ADD_SALES_ORDERS = ():string => `${BASE_URL}/salesOrder/addSalesOrder`
export const ATTENDANCE = ():string => `${BASE_URL}/attendance/saveAttendance`
export const GET_EXPENSE_LIST = ():string => `${BASE_URL}/expense/getExpenseList`
export const ADD_EXPENSE = ():string => `${BASE_URL}/expense/addExpense`
export const SAVE_EXPENSE = ():string => `${BASE_URL}/expense/save`
export const SAVE_End_VISIT = ():string => `${BASE_URL}/visit/saveEndVisit`
export const EXPENSE_APPROVE_REJECT = ():string => `${BASE_URL}/expense/saveApprovedData`
export const EXPENSE_DELETE = ():string => `${BASE_URL}/expense/delete`
export const EMPLOYEE_DETAIL = ():string => `${BASE_URL}/employee/getEmployeeDetail`
export const GET_APPOINTMENTS = ():string => `${BASE_URL}/lead/getAppointments`
export const GET_ATTENDANCE_LIST = ():string => `${BASE_URL}/attendance/getAttendanceList`
export const GET_LEAVE_LIST = ():string => `${BASE_URL}/leave/getLeaveList`
export const ADD_LEAVE = ():string => `${BASE_URL}/leave/addLeave`
export const SAVE_LEAVE = ():string => `${BASE_URL}/leave/save`
export const APPROVE_LEAVE = ():string => `${BASE_URL}/leave/approveLeave`
export const HEAD_QUARTER_REQUEST_LIST = ():string => `${BASE_URL}/headQuater/getRequestList`
export const CHANGE_ATTENDANCE_STATUS = ():string => `${BASE_URL}/attendance/changeAttendanceStatus`
export const HEAD_QUARTER_CHANGE_REQUEST_STATUS = ():string => `${BASE_URL}/headQuater/changeHqRequestStatus`
export const GET_HEAD_QUARTER_LIST = ():string => `${BASE_URL}/headQuater/getHeadQuaterList`
export const SAVE_NWE_HEAD_QUARTER = ():string => `${BASE_URL}/headQuater/saveNewHeadQuarter`
export const EDIT_EXPENSE = ():string => `${BASE_URL}/expense/edit`
export const UPDATE_PROFILE = ():string => `${BASE_URL}/employee/save`
export const CHANGE_PASSWORD = ():string => `${BASE_URL}/employee/changePassword`
export const FORCE_UPDATE = ():string => `${BASE_URL}/auth/getCurrentVersion`

