import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import {dashboardThunkCall, forceUpdateThunkCall, LoginAgainThunkCall, LoginThunkCall} from '@/redux/thunk/LoginThunk';
import {loginReducer} from '@/redux/slice/LoginSlice';
import {
	attendanceThunkCall, changeAttendanceStatusThunkCall, changePasswordThunkCall,
	getAttendanceListThunkCall,
	getEmployeeDetailThunkCall, updateProfileThunkCall,
	userPermissionThunkCall
} from '@/redux/thunk/UserThunk';
import {userReducer} from '@/redux/slice/UserSilce';

import {
	addEditExpThunkCall,
	addExTypeThunkCall,
	addVisitThunkCall,
	approveRejectExpenseThunkCall,
	deleteExpenseThunkCall,
	endVisitThunkCall,
	getExpenseListThunkCall,
	getVisitListThunkCall,
	savaVisitThunkCall,
	saveExpenseThunkCall,
} from '@/redux/thunk/VisitThunk';
import {visitReducer} from '@/redux/slice/VisitSlice';
import {
	addLeaveThunkCall,
	getLeaveListThunkCall,
	leaveApproveRejectThunkCall,
	saveLeaveThunkCall
} from "@/redux/thunk/LeaveThunk";
import {leaveReducer} from "@/redux/slice/LeaveSlice";
import {getHeadQuarterListThunkCall, getRequestListThunkCall, saveNewHeadQuarterThunkCall} from "@/redux/thunk/HQThunk";
import {hQReducer} from "@/redux/slice/HQSlice";



export const actions = {
	LoginThunkCallActions:LoginThunkCall,
	LoginAgainThunkCallActions:LoginAgainThunkCall,
	userPermissionThunkCallActions:userPermissionThunkCall,
	savaVisitThunkCallActions:savaVisitThunkCall,
	addVisitThunkCallActions:addVisitThunkCall,
	getVisitListThunkCallActions:getVisitListThunkCall,
	attendanceThunkCallActions:attendanceThunkCall,
	addExTypeThunkCallActions:addExTypeThunkCall,
	saveExpenseThunkCallActions:saveExpenseThunkCall,
	endVisitThunkCallActions:endVisitThunkCall,
	getExpenseListThunkCallActions:getExpenseListThunkCall,
	dashboardThunkCallActions:dashboardThunkCall,
	approveRejectExpenseThunkCallActions:approveRejectExpenseThunkCall,
	deleteExpenseThunkCallActions:deleteExpenseThunkCall,
	getEmployeeDetailThunkCallActions:getEmployeeDetailThunkCall,
	getAttendanceListThunkCallActions:getAttendanceListThunkCall,
	getLeaveListThunkCallActions:getLeaveListThunkCall,
	addLeaveThunkCallActions:addLeaveThunkCall,
	saveLeaveThunkCallActions:saveLeaveThunkCall,
	getRequestListThunkCallActions:getRequestListThunkCall,
	leaveApproveRejectThunkCallActions:leaveApproveRejectThunkCall,
	changeAttendanceStatusThunkCallActions:changeAttendanceStatusThunkCall,
	getHeadQuarterListThunkCallActions:getHeadQuarterListThunkCall,
	saveNewHeadQuarterThunkCallActions:saveNewHeadQuarterThunkCall,
	addEditExpThunkCallActions:addEditExpThunkCall,
	updateProfileThunkCallActions:updateProfileThunkCall,
	changePasswordThunkCallActions:changePasswordThunkCall,
	forceUpdateThunkCallActions:forceUpdateThunkCall,
};

export const reducers = {
	loginDetail:loginReducer,
	userDetail:userReducer,
	visitDetail:visitReducer,
	leaveDetail: leaveReducer,
	hQDetail: hQReducer,
}

export const store = configureStore({
	reducer:reducers,
	enhancers:undefined,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof  store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
