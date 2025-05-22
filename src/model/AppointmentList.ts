import {List} from "@/model/core";
import {AppointmentModel} from "@/model/AppointmentModel";
import {AppointmentDto} from "@/dtos";

export class AppointmentList extends  List<AppointmentModel>{
    public constructor(dtos?:AppointmentDto[]) {
        super(dtos,AppointmentModel,false);
    }
}
