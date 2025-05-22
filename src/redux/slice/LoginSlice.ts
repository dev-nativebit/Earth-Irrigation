import {Result} from '@/core';
import {DashboardModel, ForceUpdateModel, LoginModel} from '@/model';
import {createSlice} from '@reduxjs/toolkit';
import {LOGIN_DETAIL} from '@/redux/slice/Types';
import LoginReducer from '@/redux/reducer/loginReducer';
import {dashboardApi} from '@/api';

export interface LoginSliceType {
  LoginResult?:Result<LoginModel>
  dashboardResult?:Result<DashboardModel>
  forceUpdate?:Result<ForceUpdateModel>
}

export const initialState:LoginSliceType = {
  LoginResult:undefined,
  dashboardResult:undefined,
  forceUpdate:undefined
};

const LoginSlice = createSlice({
  name:LOGIN_DETAIL,
  initialState:initialState,
  reducers:LoginReducer,
});

export const { actions : loginActions, reducer : loginReducer } = LoginSlice;
