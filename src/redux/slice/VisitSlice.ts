import {Result} from '@/core';
import {createSlice} from '@reduxjs/toolkit';
import {VISIT} from '@/redux/slice/Types';
import VisitReducer from '@/redux/reducer/VisitReducer';
import {AddVisitModel, EditExpenseModel, GetExpenseList, GetVisitList} from '@/model';
import {ExTypeModel} from '@/model/ExpTypeModel';

export interface VisitSliceType {
  saveVisit?: Result<string>;
  endVisit?: Result<string>;
  saveExpense?: Result<string>;
  deleteExpense?: Result<string>;
  approveRejectExpense?: Result<string>;
  addVisit?: Result<AddVisitModel>;
  getVisitList?: Result<GetVisitList>;
  getExpenseList?: Result<GetExpenseList>;
  addExType?: Result<ExTypeModel>;
  addEditExp?: Result<EditExpenseModel>;
}

export const initialState:VisitSliceType = {
  saveVisit:undefined,
  endVisit:undefined,
  saveExpense:undefined,
  deleteExpense:undefined,
  addVisit:undefined,
  getVisitList:undefined,
  approveRejectExpense:undefined,
  addExType:undefined,
  getExpenseList:undefined,
  addEditExp:undefined
};

const VisitSlice = createSlice({
  name:VISIT,
  initialState:initialState,
  reducers:VisitReducer,
});


export const { actions : visitActions, reducer : visitReducer } = VisitSlice;
