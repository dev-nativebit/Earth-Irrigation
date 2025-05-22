import {dispatchable} from '@/redux/dispatchable';
import {Dispatch} from '@reduxjs/toolkit';
import {Action} from 'redux-saga';
import {getDefaultError, Result, showErrorMessage} from '@/core';
import {DashboardModel, ForceUpdateModel, LoginModel} from '@/model';
import {loginActions} from '../slice/LoginSlice';
import {DashboardDto, ForceUpdateDto, LoginDto} from '@/dtos';
import {dashboardApi, forceUpdateApi, loginApi, LoginApiParams} from '@/api';
import {accountStore} from '@/stores/AccountStore';
import { Storage } from '@/core/Storage';
import {actions} from '@/redux/root.store';
import {ToastAndroid} from "react-native";

export const LoginThunkCall = dispatchable((
  formData: FormData,
  params:LoginApiParams
)=> {
  return async (dispatch:Dispatch<Action>) =>{
    try {
      dispatch(loginActions.UserDetail(Result.waiting()));
      const response = await loginApi.post(params,formData);


      if (response.isSuccess) {
        //Parse dto from api response top model
        const dataModel = new LoginModel(response.data as LoginDto);
        await Storage.setItemAsync(Storage.keys.authToken, dataModel.authToken);
        await Storage.setItemAsync(Storage.keys.sign, dataModel.sign);
        await accountStore.login(dataModel)
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(loginActions.UserDetail(resultDataModel));
        await actions.userPermissionThunkCallActions()
        //Return the result, so it can be used where api triggered
        return response;
      }else {
        showErrorMessage(response.message)
      }
      //Dispatch to fail the response
      dispatch(loginActions.UserDetail(Result.fail( 'LoginThunkCall')));
      return getDefaultError( 'LoginThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH LoginThunkCall');
    }
  };
});

export const dashboardThunkCall = dispatchable(()=> {
  return async (dispatch:Dispatch<Action>) =>{
    try {
      dispatch(loginActions.dashboardDetail(Result.waiting()));
      const response = await dashboardApi.get();


      if (response.isSuccess) {
        //Parse dto from api response top model
        const dataModel = new DashboardModel(response.data as DashboardDto);

        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(loginActions.dashboardDetail(resultDataModel));

        //Return the result, so it can be used where api triggered
        return response;
      }
      //Dispatch to fail the response
      dispatch(loginActions.dashboardDetail(Result.fail( 'dashboardThunkCall')));
      return getDefaultError( 'dashboardThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH dashboardThunkCall');
    }
  };
});

export const LoginAgainThunkCall = dispatchable(()=> {
  return async (dispatch:Dispatch<Action>) =>{
    try {
      dispatch(loginActions.UserDetail(Result.waiting()));
      const response = await Storage.getItemAsync(Storage.keys.login)

      if (response) {
        const data = JSON.parse(response);
        //Parse dto from api response top model
        const dataModel = new LoginModel(data.dto as LoginDto);
        await Storage.setItemAsync(Storage.keys.authToken, dataModel.authToken);
        await Storage.setItemAsync(Storage.keys.sign, dataModel.sign);
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(loginActions.UserDetail(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }
      //Dispatch to fail the response
      dispatch(loginActions.UserDetail(Result.fail( 'LoginAgainThunkCall')));
      return getDefaultError( 'LoginAgainThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH LoginAgainThunkCall');
    }
  };
});

export const forceUpdateThunkCall = dispatchable((device_type:string)=> {
  return async (dispatch:Dispatch<Action>) =>{
    try {
      dispatch(loginActions.forceUpdate(Result.waiting()));
      const response = await forceUpdateApi.post({device_type:device_type});


      if (response.isSuccess) {
        //Parse dto from api response top model
        const dataModel = new ForceUpdateModel(response.data as ForceUpdateDto);

        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(loginActions.forceUpdate(resultDataModel));

        //Return the result, so it can be used where api triggered
        return response;
      }else {
        ToastAndroid.show(response?.message ?? '', ToastAndroid.LONG);
      }
      //Dispatch to fail the response
      dispatch(loginActions.forceUpdate(Result.fail( 'forceUpdateThunkCall')));
      return getDefaultError(response.error,'forceUpdateThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH forceUpdateThunkCall');
    }
  };
});
