import {PayloadAction} from '@reduxjs/toolkit';
import {Result} from '@/core';
import {LeaveList} from '@/model';
import {LeaveSliceType} from '@/redux/slice/LeaveSlice';
import {AddLeaveList} from "@/model/AddLeaveList"

export default {
  'getLeaveList': (state: LeaveSliceType, action: PayloadAction<Result<LeaveList>>) => {
    state.getLeaveList = action.payload;
  },
  'addLeave': (state: LeaveSliceType, action: PayloadAction<Result<AddLeaveList>>) => {
    state.addLeave = action.payload;
  },
  'saveLeave': (state: LeaveSliceType, action: PayloadAction<Result<string>>) => {
    state.saveLeave = action.payload;
  },
  'leaveApproveReject': (state: LeaveSliceType, action: PayloadAction<Result<string>>) => {
    state.leaveApproveReject = action.payload;
  },
};
