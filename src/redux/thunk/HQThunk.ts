import {dispatchable} from '@/redux/dispatchable';
import {
    getHeadQuarterListApi,
    getRequestListApi,
    GetRequestListApiParams,
    saveNewHeadQuarterApi,
    SaveNewHeadQuarterApiProps
} from '@/api';
import {Dispatch} from '@reduxjs/toolkit';
import {Action} from 'redux-saga';
import {getDefaultError, Result} from '@/core';
import {GetHeadQuarterList, GetRequestList} from '@/model';
import {GetHeadQuarterListDto, GetRequestListDto} from '@/dtos';
import {leaveStore} from '@/stores';
import {hQActions} from '@/redux/slice/HQSlice';

export const getRequestListThunkCall = dispatchable((params: GetRequestListApiParams) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            dispatch(hQActions.getHQList(Result.waiting()));
            const response = await getRequestListApi.post(params);

            if (response.isSuccess) {

                //Parse dto from api response top model
                const dataModel = new GetRequestList(response.data.dataList as GetRequestListDto[]);

                if (params.start === 0) {
                    leaveStore.getRequestList = dataModel
                }else {
                    leaveStore.addGetRequestList(dataModel)
                }

                //Wrap with result class
                const resultDataModel = Result.ok(dataModel);
                //Dispatch to store in to redux
                dispatch(hQActions.getHQList(resultDataModel));
                //Return the result, so it can be used where api triggered
                return response;
            }
            //Dispatch to fail the response
            dispatch(hQActions.getHQList(Result.fail('getRequestListThunkCall')));
            return getDefaultError('getRequestListThunkCall');
        } catch (e) {
            //Dispatch to fail the response
            return getDefaultError(e, 'CATCH getRequestListThunkCall');
        }
    };
});

export const getHeadQuarterListThunkCall = dispatchable(() => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            dispatch(hQActions.getHeadQuarterList(Result.waiting()));
            const response = await getHeadQuarterListApi.get();

            if (response.isSuccess) {

                //Parse dto from api response top model
                const dataModel = new GetHeadQuarterList(response.data.headQuarterList as GetHeadQuarterListDto[]);

                //Wrap with result class
                const resultDataModel = Result.ok(dataModel);
                //Dispatch to store in to redux
                dispatch(hQActions.getHeadQuarterList(resultDataModel));
                //Return the result, so it can be used where api triggered
                return response;
            }
            //Dispatch to fail the response
            dispatch(hQActions.getHeadQuarterList(Result.fail('getHeadQuarterListThunkCall')));
            return getDefaultError('getHeadQuarterListThunkCall');
        } catch (e) {
            //Dispatch to fail the response
            return getDefaultError(e, 'CATCH getHeadQuarterListThunkCall');
        }
    };
});

export const saveNewHeadQuarterThunkCall = dispatchable((params:SaveNewHeadQuarterApiProps) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            dispatch(hQActions.saveNewHeadQuarter(Result.waiting()));
            const response = await saveNewHeadQuarterApi.post(params);

            if (response.isSuccess) {

                //Parse dto from api response top model
                const dataModel = response.data;

                //Wrap with result class
                const resultDataModel = Result.ok(dataModel);
                //Dispatch to store in to redux
                dispatch(hQActions.saveNewHeadQuarter(resultDataModel));
                //Return the result, so it can be used where api triggered
                return response;
            }
            //Dispatch to fail the response
            dispatch(hQActions.saveNewHeadQuarter(Result.fail('saveNewHeadQuarterThunkCall')));
            return getDefaultError('saveNewHeadQuarterThunkCall');
        } catch (e) {
            //Dispatch to fail the response
            return getDefaultError(e, 'CATCH saveNewHeadQuarterThunkCall');
        }
    };
});
