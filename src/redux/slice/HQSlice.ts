import {Result} from '@/core';
import {DashboardModel, GetHeadQuarterList, GetRequestList, LeaveList, LoginModel} from '@/model';
import {createSlice} from '@reduxjs/toolkit';
import {HEAD_QUARTER, LEAVE, LOGIN_DETAIL} from '@/redux/slice/Types';
import LoginReducer from '@/redux/reducer/loginReducer';
import {dashboardApi, saveNewHeadQuarterApi} from '@/api';
import LeaveReducer from "@/redux/reducer/LeaveReducer";
import {AddLeaveList} from "@/model/AddLeaveList";
import HQReducer from "@/redux/reducer/HQReducer";

export interface HQSliceType {
    getHQList?: Result<GetRequestList>
    getHeadQuarterList?: Result<GetHeadQuarterList>
    saveNewHeadQuarter?: Result<string>
}
export const initialState:HQSliceType = {
    getHQList:undefined,
    getHeadQuarterList:undefined,
    saveNewHeadQuarter:undefined
};

const HQSlice = createSlice({
    name:HEAD_QUARTER,
    initialState:initialState,
    reducers:HQReducer,
});

export const { actions : hQActions, reducer : hQReducer } = HQSlice;
