import {PayloadAction} from '@reduxjs/toolkit';
import {Result} from '@/core';
import {UserSliceType} from '@/redux/slice/UserSilce';
import {UserPermissionMode} from '@/model/UserPermissionMode';
import {attendanceApi} from '@/api';
import {AttendanceList, EmployeeDataModel} from '@/model';

export default {
  UserDetail: (
    state: UserSliceType,
    action: PayloadAction<Result<UserPermissionMode>>,
  ) => {
    state.userPermissionResult = action.payload;
  },
  'attendance': (state: UserSliceType, action: PayloadAction<Result<string>>) => {
    state.attendance = action.payload;
  },
  'employeeDetail': (state: UserSliceType, action: PayloadAction<Result<EmployeeDataModel>>) => {
    state.employeeDetail = action.payload;
  },
  'attendanceList': (state: UserSliceType, action: PayloadAction<Result<AttendanceList>>) => {
    state.attendanceList = action.payload;
  },
  'changeAttendanceStatus': (state: UserSliceType, action: PayloadAction<Result<string>>) => {
    state.changeAttendanceStatus = action.payload;
  },
  'editProfile': (state: UserSliceType, action: PayloadAction<Result<string>>) => {
    state.editProfile = action.payload;
  },
};
