import {dispatchable} from '@/redux/dispatchable';
import {
    addLeaveApi,
    getLeaveListApi,
    GetLeaveListApiParams,
    leaveApproveRejectApi, LeaveApproveRejectApiParams,
    saveLeaveApi,
    SaveLeaveParams
} from '@/api';
import {Dispatch} from '@reduxjs/toolkit';
import {Action} from 'redux-saga';
import {getDefaultError, Result} from '@/core';
import {LeaveList} from '@/model';
import {AddLeaveDto, LeaveListDto} from '@/dtos';
import {leaveActions} from '@/redux/slice/LeaveSlice';
import {leaveStore} from "@/stores";
import {AddLeaveList} from "@/model/AddLeaveList";
import {ToastAndroid} from 'react-native';

export const getLeaveListThunkCall = dispatchable((params: GetLeaveListApiParams) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            dispatch(leaveActions.getLeaveList(Result.waiting()));
            const response = await getLeaveListApi.post(params);

            if (response.isSuccess) {

                //Parse dto from api response top model
                const dataModel = new LeaveList(response.data as LeaveListDto[]);

                if (params.start === '0') {
                    leaveStore.leaveList = dataModel
                }else {
                    leaveStore.addLeaveList(dataModel)
                }

                //Wrap with result class
                const resultDataModel = Result.ok(dataModel);
                //Dispatch to store in to redux
                dispatch(leaveActions.getLeaveList(resultDataModel));
                //Return the result, so it can be used where api triggered
                return response;
            }
            //Dispatch to fail the response
            dispatch(leaveActions.getLeaveList(Result.fail('getLeaveListThunkCall')));
            return getDefaultError('getLeaveListThunkCall');
        } catch (e) {
            //Dispatch to fail the response
            return getDefaultError(e, 'CATCH getLeaveListThunkCall');
        }
    };
});

export const addLeaveThunkCall = dispatchable(() => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            dispatch(leaveActions.addLeave(Result.waiting()));
            const response = await addLeaveApi.post();

            if (response.isSuccess) {

                //Parse dto from api response top model
                const dataModel = new AddLeaveList(response.data.empList as AddLeaveDto[]);
                //Wrap with result class
                const resultDataModel = Result.ok(dataModel);
                //Dispatch to store in to redux
                dispatch(leaveActions.addLeave(resultDataModel));
                //Return the result, so it can be used where api triggered
                return response;
            }
            //Dispatch to fail the response
            dispatch(leaveActions.addLeave(Result.fail('addLeaveThunkCall')));
            return getDefaultError('addLeaveThunkCall');
        } catch (e) {
            //Dispatch to fail the response
            return getDefaultError(e, 'CATCH addLeaveThunkCall');
        }
    };
});

export const saveLeaveThunkCall = dispatchable((params:SaveLeaveParams) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            dispatch(leaveActions.saveLeave(Result.waiting()));
            const response = await saveLeaveApi.post(params);

            if (response.isSuccess) {

                //Parse dto from api response top model
                const dataModel = response.data;
                //Wrap with result class
                const resultDataModel = Result.ok(dataModel);
                //Dispatch to store in to redux
                dispatch(leaveActions.saveLeave(resultDataModel));
                //Return the result, so it can be used where api triggered
                return response;
            }
            //Dispatch to fail the response
            dispatch(leaveActions.saveLeave(Result.fail('saveLeaveThunkCall')));
            return getDefaultError('saveLeaveThunkCall');
        } catch (e) {
            //Dispatch to fail the response
            return getDefaultError(e, 'CATCH saveLeaveThunkCall');
        }
    };
});

export const leaveApproveRejectThunkCall = dispatchable((params:LeaveApproveRejectApiParams) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            dispatch(leaveActions.leaveApproveReject(Result.waiting()));
            const response = await leaveApproveRejectApi.post(params);

            if (response.isSuccess) {

                //Parse dto from api response top model
                const dataModel = response.data;
                //Wrap with result class
                const resultDataModel = Result.ok(dataModel);
                //Dispatch to store in to redux
                dispatch(leaveActions.leaveApproveReject(resultDataModel));
                //Return the result, so it can be used where api triggered
              ToastAndroid.show(response?.message ?? '', ToastAndroid.LONG);
                return response;
            }
            //Dispatch to fail the response
            dispatch(leaveActions.leaveApproveReject(Result.fail('leaveApproveRejectThunkCall')));
            return getDefaultError('leaveApproveRejectThunkCall');
        } catch (e) {
            //Dispatch to fail the response
            return getDefaultError(e, 'CATCH leaveApproveRejectThunkCall');
        }
    };
});
