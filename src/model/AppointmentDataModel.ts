import {AppointmentDataDto} from "@/dtos";
import {Model} from "@/model/core";
import {AppointmentList} from "@/model/AppointmentList";

export class AppointmentDataModel extends Model<AppointmentDataDto>{
    public constructor(dto:AppointmentDataDto) {
        super(dto);
    }

    get appointmentList():AppointmentList{
        return new AppointmentList(this.dto?.appointmentList);
    }

    get dateList():string[]{
        return this.dto?.dateList ?? [];
    }
}
