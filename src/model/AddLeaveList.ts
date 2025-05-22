import {List} from "@/model/core";
import {AddLeaveModel} from "@/model/AddLeaveModel";
import {AddLeaveDto} from "@/dtos";
import {LabelValuePair} from "@/component";

export class AddLeaveList extends List<AddLeaveModel>{
    constructor(dtos?: AddLeaveDto[]) {
        super(dtos, AddLeaveModel, false);
    }
    getLabelValuePair(): LabelValuePair[] {
        return this.map((item) => ({ label: item.emp_name, value: item.id }));
    }
}
