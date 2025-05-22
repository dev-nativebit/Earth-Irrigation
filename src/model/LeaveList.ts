import {List} from "@/model/core";
import {LeaveListModel} from "@/model/LeaveListModel";
import {LeaveListDto} from "@/dtos";

export class LeaveList extends List<LeaveListModel>{
    constructor(dtos?: LeaveListDto[]) {
        super(dtos, LeaveListModel, false);
    }
}
