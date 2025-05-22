import {Result} from '@/core';
import {PayloadAction} from '@reduxjs/toolkit';
import {DashboardModel, ForceUpdateModel, LoginModel} from '@/model';
import {LoginSliceType} from '@/redux/slice/LoginSlice';
import {dashboardApi} from '@/api';

export default {
  'UserDetail': (state:LoginSliceType, action:PayloadAction<Result<LoginModel>>) =>{
    state.LoginResult = action.payload;
  },
  'dashboardDetail': (state:LoginSliceType, action:PayloadAction<Result<DashboardModel>>) =>{
    state.dashboardResult = action.payload;
  },
  'forceUpdate': (state:LoginSliceType, action:PayloadAction<Result<ForceUpdateModel>>) =>{
    state.forceUpdate = action.payload;
  },
};
