import {Result} from '@/core';
import {DashboardModel, LeaveList, LoginModel} from '@/model';
import {createSlice} from '@reduxjs/toolkit';
import {LEAVE, LOGIN_DETAIL} from '@/redux/slice/Types';
import LoginReducer from '@/redux/reducer/loginReducer';
import {dashboardApi, leaveApproveRejectApi} from '@/api';
import LeaveReducer from "@/redux/reducer/LeaveReducer";
import {AddLeaveList} from "@/model/AddLeaveList";

export interface LeaveSliceType {
    getLeaveList?:Result<LeaveList>
    addLeave?:Result<AddLeaveList>
    saveLeave?:Result<string>
    leaveApproveReject?:Result<string>
}

export const initialState:LeaveSliceType = {
    getLeaveList:undefined,
    addLeave:undefined,
    saveLeave:undefined,
    leaveApproveReject:undefined,
};

const LeaveSlice = createSlice({
    name:LEAVE,
    initialState:initialState,
    reducers:LeaveReducer,
});

export const { actions : leaveActions, reducer : leaveReducer } = LeaveSlice;
