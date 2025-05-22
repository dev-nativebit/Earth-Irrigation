import {PayloadAction} from '@reduxjs/toolkit';
import {Result} from '@/core';
import {VisitSliceType} from '@/redux/slice/VisitSlice';
import {AddVisitModel, EditExpenseModel, GetExpenseList, GetVisitList} from '@/model';
import {ExTypeModel} from '@/model/ExpTypeModel';

export default {
  'savaVisit': (state: VisitSliceType, action: PayloadAction<Result<string>>) => {
    state.saveVisit = action.payload
  },
  'endVisit': (state: VisitSliceType, action: PayloadAction<Result<string>>) => {
    state.endVisit = action.payload
  },
  'approveRejectExpense': (state: VisitSliceType, action: PayloadAction<Result<string>>) => {
    state.approveRejectExpense = action.payload
  },
  'deleteExpense': (state: VisitSliceType, action: PayloadAction<Result<string>>) => {
    state.deleteExpense = action.payload
  },
  'addVisit': (state: VisitSliceType, action: PayloadAction<Result<AddVisitModel>>) => {
    state.addVisit = action.payload
  },
  'getVisitList': (state: VisitSliceType, action: PayloadAction<Result<GetVisitList>>) => {
    state.getVisitList = action.payload
  },
  'addExpence': (state: VisitSliceType, action: PayloadAction<Result<ExTypeModel>>) => {
    state.addExType = action.payload
  },
  'saveExpense': (state: VisitSliceType, action: PayloadAction<Result<string>>) => {
    state.saveExpense = action.payload
  },
  'getExpenseList': (state: VisitSliceType, action: PayloadAction<Result<GetExpenseList>>) => {
    state.getExpenseList = action.payload
  },
  'addEditExp': (state: VisitSliceType, action: PayloadAction<Result<EditExpenseModel>>) => {
    state.addEditExp = action.payload
  },
};
