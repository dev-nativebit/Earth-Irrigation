import {AttendanceListModel} from "@/model/AttendanceListModel";
import {List} from "@/model/core";
import {AttendanceListDto} from "@/dtos";

export class AttendanceList extends List<AttendanceListModel>{
    constructor(dtos?: AttendanceListDto[]) {
        super(dtos, AttendanceListModel, false);
    }
}
