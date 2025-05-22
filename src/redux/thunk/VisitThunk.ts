import {dispatchable} from '@/redux/dispatchable';
import {Dispatch} from '@reduxjs/toolkit';
import {Action} from 'redux-saga';
import {getDefaultError, Result, showErrorMessage} from '@/core';
import {
  addExpenceApi,
  addVisitApi, editExpenseApi,
  EditExpenseApiParams,
  endVisitApi,
  EndVisitApiParams,
  expenseApprovRejectApi,
  ExpenseApprovRejectApiProps,
  expenseDeleteApi,
  ExpenseDeleteApiProps,
  getExpenseListApi,
  GetExpenseListApiParams,
  getVisitListApi,
  GetVisitListApiParams,
  saveExpenseApi,
  SaveExpenseApiParams,
  saveVisitApi,
  SaveVisitApiParams,
} from '@/api';
import {visitActions} from '@/redux/slice/VisitSlice';
import {AddVisitModel, EditExpenseModel, GetExpenseList, GetVisitList} from '@/model';
import {AddVisitDto, EditExpenseDto, GetExpenseListDto, GetVisitListDto} from '@/dtos';
import {ExTypeModel} from '@/model/ExpTypeModel';
import {ExpTypeDto} from '@/dtos/ExpTypeListDto';
import {leaveStore} from "@/stores";

export const savaVisitThunkCall = dispatchable((params: SaveVisitApiParams) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(visitActions.savaVisit(Result.waiting()));
      const response = await saveVisitApi.post(params);

      if (response.isSuccess) {
        //Parse dto from api response top model
        const dataModel = response.data;
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(visitActions.savaVisit(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }else {
        showErrorMessage(response.error.general_error)
      }
      //Dispatch to fail the response
      dispatch(visitActions.savaVisit(Result.fail('savaVisitThunkCall')));
      return getDefaultError('savaVisitThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH savaVisitThunkCall');
    }
  };
});

export const approveRejectExpenseThunkCall = dispatchable((params: ExpenseApprovRejectApiProps) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(visitActions.approveRejectExpense(Result.waiting()));
      const response = await expenseApprovRejectApi.post(params);

      if (response.isSuccess) {
        //Parse dto from api response top model
        const dataModel = response.data;
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(visitActions.approveRejectExpense(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }
      //Dispatch to fail the response
      dispatch(visitActions.approveRejectExpense(Result.fail('approveRejectExpenseThunkCall')));
      return getDefaultError('approveRejectExpenseThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH approveRejectExpenseThunkCall');
    }
  };
});

export const deleteExpenseThunkCall = dispatchable((params: ExpenseDeleteApiProps) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(visitActions.deleteExpense(Result.waiting()));
      const response = await expenseDeleteApi.post(params);

      if (response.isSuccess) {
        //Parse dto from api response top model
        const dataModel = response.data;
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(visitActions.deleteExpense(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }
      //Dispatch to fail the response
      dispatch(visitActions.deleteExpense(Result.fail('deleteExpenseThunkCall')));
      return getDefaultError('deleteExpenseThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH deleteExpenseThunkCall');
    }
  };
});

export const endVisitThunkCall = dispatchable((params: EndVisitApiParams,formData:FormData) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(visitActions.endVisit(Result.waiting()));
      const response = await endVisitApi.post(params,formData);

      if (response.isSuccess) {
        //Parse dto from api response top model
        const dataModel = response.data;
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(visitActions.endVisit(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }
      //Dispatch to fail the response
      dispatch(visitActions.endVisit(Result.fail('endVisitThunkCall')));
      return getDefaultError('endVisitThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH endVisitThunkCall');
    }
  };
});

export const saveExpenseThunkCall = dispatchable((
  params: SaveExpenseApiParams,
  formData: FormData
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(visitActions.addExpence(Result.waiting()));
      const response = await saveExpenseApi.post(params,formData);

      if (response.isSuccess) {
        //Parse dto from api response top model
        const dataModel = response.data;
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(visitActions.addExpence(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }else {
        showErrorMessage(response.message)
      }
      //Dispatch to fail the response
      dispatch(visitActions.addExpence(Result.fail('saveExpenseThunkCall')));
      return getDefaultError('saveExpenseThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH saveExpenseThunkCall');
    }
  };
});

export const addVisitThunkCall = dispatchable(() => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(visitActions.addVisit(Result.waiting()));
      const response = await addVisitApi.get();


      if (response.isSuccess) {

        //Parse dto from api response top model
        const dataModel = new AddVisitModel(response.data as AddVisitDto);
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(visitActions.addVisit(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }
      //Dispatch to fail the response
      dispatch(visitActions.addVisit(Result.fail('addVisitThunkCall')));
      return getDefaultError('addVisitThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH addVisitThunkCall');
    }
  };
});

export const getVisitListThunkCall = dispatchable((params: GetVisitListApiParams) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(visitActions.getVisitList(Result.waiting()));
      const response = await getVisitListApi.post(params);


      if (response.isSuccess) {

        //Parse dto from api response top model
        const dataModel = new GetVisitList(response.data.dataList as GetVisitListDto[]);

        if (params.start === 0){
          leaveStore.getVisitList = dataModel
        }else {
          leaveStore.addGetVisitList(dataModel)
        }
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(visitActions.getVisitList(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }
      //Dispatch to fail the response
      dispatch(visitActions.getVisitList(Result.fail('getVisitListThunkCall')));
      return getDefaultError('getVisitListThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH getVisitListThunkCall');
    }
  };
});

export const getExpenseListThunkCall = dispatchable((params: GetExpenseListApiParams) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(visitActions.getExpenseList(Result.waiting()));
      const response = await getExpenseListApi.post(params);


      if (response.isSuccess) {

        //Parse dto from api response top model
        const dataModel = new GetExpenseList(response.data.dataList as GetExpenseListDto[]);
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        if (params.start === 0) {
          leaveStore.getExpenseList = dataModel
        }else {
          leaveStore.addGetExpenseList(dataModel)
        }
        //Dispatch to store in to redux
        dispatch(visitActions.getExpenseList(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }
      //Dispatch to fail the response
      dispatch(visitActions.getExpenseList(Result.fail('getExpenseListThunkCall')));
      return getDefaultError('getExpenseListThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH getExpenseListThunkCall');
    }
  };
});

export const addEditExpThunkCall = dispatchable((params: EditExpenseApiParams) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(visitActions.addEditExp(Result.waiting()));
      const response = await editExpenseApi.post(params);

      if (response.isSuccess) {
        //Parse dto from api response top model
        const dataModel = new EditExpenseModel(response.data.dataRow as EditExpenseDto);
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(visitActions.addEditExp(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }
      //Dispatch to fail the response
      dispatch(visitActions.addEditExp(Result.fail('addEditExpThunkCall')));
      return getDefaultError('addEditExpThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH addEditExpThunkCall');
    }
  };
});

export const addExTypeThunkCall = dispatchable(() => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(visitActions.addExpence(Result.waiting()));
      const response = await addExpenceApi.get();


      if (response.isSuccess) {

        //Parse dto from api response top model
        const dataModel = new ExTypeModel(response.data as ExpTypeDto);
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(visitActions.addExpence(resultDataModel));
        //Return the result, so it can be used where api triggered
        return response;
      }
      //Dispatch to fail the response
      dispatch(visitActions.addExpence(Result.fail('addExTypeThunkCall')));
      return getDefaultError('addExTypeThunkCall');
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH addExTypeThunkCall');
    }
  };
});
