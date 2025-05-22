import {makeAutoObservable} from "mobx";
import {GetExpenseList, GetRequestList, GetVisitList, LeaveList} from "@/model";
import {GetRequestListDto} from "@/dtos";

class LeaveStore {
    private mLeaveListList: LeaveList | null = null;
    private mGetRequestList: GetRequestList | null = null;
    private mGetVisitList:  GetVisitList | null = null;
    private mGetExpenseList:  GetExpenseList | null = null;
    constructor() {
        makeAutoObservable(this);
    }

    get leaveList(): LeaveList {
        return this.mLeaveListList as LeaveList;
    }

    set leaveList(partyList: LeaveList | null) {
        this.mLeaveListList = partyList;
    }

    addLeaveList(data: LeaveList) {
        data.map(item => this.mLeaveListList?.addItem(item));
    }

    get getRequestList(): GetRequestList {
        return this.mGetRequestList as GetRequestList;
    }

    set getRequestList(getRequestList: GetRequestList | null) {
        this.mGetRequestList = getRequestList;
    }

    addGetRequestList(data: GetRequestList) {
        data.map(item => this.mGetRequestList?.addItem(item));
    }

    get getVisitList(): GetVisitList {
        return this.mGetVisitList as GetVisitList;
    }

    set getVisitList(getRequestList: GetVisitList | null) {
        this.mGetVisitList = getRequestList;
    }

    addGetVisitList(data: GetVisitList) {
        data.map(item => this.mGetVisitList?.addItem(item));
    }

    get getExpenseList(): GetExpenseList {
        return this.mGetExpenseList as GetExpenseList;
    }

    set getExpenseList(getExpenseList: GetExpenseList | null) {
        this.mGetExpenseList = getExpenseList;
    }

    addGetExpenseList(data: GetExpenseList) {
        data.map(item => this.mGetExpenseList?.addItem(item));
    }

}

export const leaveStore = new LeaveStore()
