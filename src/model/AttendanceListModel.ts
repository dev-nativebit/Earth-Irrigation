import {Entity, EntityId, Model} from "@/model/core";
import {AttendanceListDto} from "@/dtos";

export class AttendanceListModel extends Entity<AttendanceListDto> {
    constructor(dto: AttendanceListDto) {
        super(dto,'id');
    }
    get id(): string{
        return this.dto?.id ?? ''
    }
    get type(): string{
        return this.dto?.type ?? ''
    }
    get punch_date(): string{
        return this.dto?.punch_date ?? ''
    }
    get loc_add(): string{
        return this.dto?.loc_add ?? ''
    }
    get lat_long(): string{
        return this.dto?.lat_long ?? ''
    }
    get img_file_path(): string{
        return this.dto?.img_file_path ?? ''
    }
    get hq_name():string{
        return this.dto?.hq_name ?? ''
    }
    get hq_location():string{
        return this.dto?.hq_location ?? ''
    }
    get distance():number{
        return this.dto?.distance ?? ''
    }
}
