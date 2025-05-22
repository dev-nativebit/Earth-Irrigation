import {Result} from '@/core';
import {createSlice} from '@reduxjs/toolkit';
import {USER_PERMISSION} from '@/redux/slice/Types';
import {UserPermissionMode} from '@/model/UserPermissionMode';
import UserReducer from '@/redux/reducer/UserReducer';
import {AttendanceList, EmployeeDataModel} from '@/model';

export interface UserSliceType {
  userPermissionResult?:Result<UserPermissionMode>
  attendance?:Result<string>
  changeAttendanceStatus?:Result<string>
  employeeDetail?:Result<EmployeeDataModel>
  attendanceList?:Result<AttendanceList>
  editProfile?:Result<string>
}

export const initialState:UserSliceType = {
  userPermissionResult:undefined,
  attendance:undefined,
  employeeDetail:undefined,
  changeAttendanceStatus:undefined,
  editProfile:undefined,
};

const UserSlice = createSlice({
  name:USER_PERMISSION,
  initialState:initialState,
  reducers:UserReducer,
});

export const { actions : userActions, reducer : userReducer } = UserSlice;
