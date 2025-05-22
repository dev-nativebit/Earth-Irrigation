import {dispatchable} from '@/redux/dispatchable';
import {
  attendanceApi,
  AttendanceApiParams,
  changeAttendanceStatusApi,
  ChangeAttendanceStatusApiParams, changePasswordApi, ChangePasswordApiParams, expenseApprovRejectApi,
  ExpenseApprovRejectApiProps,
  getAttendanceListApi,
  GetAttendanceListApiParams,
  getEmployeeDetailApi, updateProfileApi, UpdateProfileApiParams,
  userPermissionApi
} from '@/api';
import {Dispatch} from '@reduxjs/toolkit';
import {Action} from 'redux-saga';
import {getDefaultError, Result, showErrorMessage} from '@/core';
import {AttendanceListDto, EmployeeDataDto, UserPermissionDto} from '@/dtos';
import {UserPermissionMode} from '@/model/UserPermissionMode';
import {ResultCommonInterfaces} from '@/Interfaces';
import {userActions} from '@/redux/slice/UserSilce';
import {AttendanceList, EmployeeDataModel} from '@/model';
import {visitActions} from "@/redux/slice/VisitSlice";

export const userPermissionThunkCall = dispatchable(()=> {
  return async (dispatch:Dispatch<Action>) =>{
    try {
      dispatch(userActions.UserDetail(Result.waiting()));
      const response:Result<ResultCommonInterfaces> = await userPermissionApi.get();

      if (response.isSuccess) {

        //Parse dto from api response top model
        const dataModel = new UserPermissionMode(response.data as UserPermissionDto);
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(userActions.UserDetail(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }
      //Dispatch to fail the response
      dispatch(userActions.UserDetail(Result.fail( 'LoginThunkCall')));
      return getDefaultError( 'LoginThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH LoginThunkCall');
    }
  };
});


export const getEmployeeDetailThunkCall = dispatchable(()=> {
  return async (dispatch:Dispatch<Action>) =>{
    try {
      dispatch(userActions.employeeDetail(Result.waiting()));
      const response:Result<ResultCommonInterfaces> = await getEmployeeDetailApi.get();

      if (response.isSuccess) {
        //Parse dto from api response top model
        const dataModel = new EmployeeDataModel(response.data as EmployeeDataDto);
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(userActions.employeeDetail(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }
      //Dispatch to fail the response
      dispatch(userActions.employeeDetail(Result.fail( 'getEmployeeDetailThunkCall')));
      return getDefaultError( 'getEmployeeDetailThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH getEmployeeDetailThunkCall');
    }
  };
});

export const getAttendanceListThunkCall = dispatchable((params:GetAttendanceListApiParams)=> {
  return async (dispatch:Dispatch<Action>) =>{
    try {
      dispatch(userActions.attendanceList(Result.waiting()));
      const response:Result<ResultCommonInterfaces> = await getAttendanceListApi.post(params);

      if (response.isSuccess) {
        //Parse dto from api response top model
        const dataModel = new AttendanceList(response.data.dataList as AttendanceListDto[]);
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(userActions.attendanceList(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }
      //Dispatch to fail the response
      dispatch(userActions.attendanceList(Result.fail( 'getAttendanceListThunkCall')));
      return getDefaultError( 'getAttendanceListThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH getAttendanceListThunkCall');
    }
  };
});

export const attendanceThunkCall = dispatchable((
  params:AttendanceApiParams,
  formData: FormData
)=> {
  return async (dispatch:Dispatch<Action>) =>{
    try {
      dispatch(userActions.attendance(Result.waiting()));
      const response = await attendanceApi.post(params,formData);

      if (response.isSuccess) {

        //Parse dto from api response top model
        const dataModel = response.data
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(userActions.attendance(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }else {
        showErrorMessage(response.data.message)
      }
      //Dispatch to fail the response
      dispatch(userActions.attendance(Result.fail( 'LoginThunkCall')));
      return getDefaultError( 'LoginThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH LoginThunkCall');
    }
  };
});

export const changeAttendanceStatusThunkCall = dispatchable((params:ChangeAttendanceStatusApiParams)=> {
  return async (dispatch:Dispatch<Action>) =>{
    try {
      dispatch(userActions.changeAttendanceStatus(Result.waiting()));
      const response = await changeAttendanceStatusApi.post(params);

      if (response.isSuccess) {

        //Parse dto from api response top model
        const dataModel = response.data
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(userActions.changeAttendanceStatus(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }else {
        showErrorMessage(response.data.message)
      }
      //Dispatch to fail the response
      dispatch(userActions.attendance(Result.fail( 'changeAttendanceStatusThunkCall')));
      return getDefaultError( 'changeAttendanceStatusThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH changeAttendanceStatusThunkCall');
    }
  };
});

export const updateProfileThunkCall = dispatchable((
    params: UpdateProfileApiParams,
    formData: FormData
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(userActions.editProfile(Result.waiting()));
      const response = await updateProfileApi.post(params,formData);

      if (response.isSuccess) {
        //Parse dto from api response top model
        const dataModel = response.data;
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(userActions.editProfile(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }
      //Dispatch to fail the response
      dispatch(userActions.editProfile(Result.fail('updateProfileThunkCall')));
      return getDefaultError('updateProfileThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH updateProfileThunkCall');
    }
  };
});


export const changePasswordThunkCall = dispatchable((
    params: ChangePasswordApiParams
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(userActions.editProfile(Result.waiting()));
      const response = await changePasswordApi.post(params);

      if (response.isSuccess) {
        //Parse dto from api response top model
        const dataModel = response.data;
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(userActions.editProfile(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }else {
        console.log(response)
        showErrorMessage(response.message)
      }
      //Dispatch to fail the response
      dispatch(userActions.editProfile(Result.fail('changePasswordThunkCall')));
      return getDefaultError('changePasswordThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH changePasswordThunkCall');
    }
  };
});
