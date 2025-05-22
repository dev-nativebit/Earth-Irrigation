import {Entity} from "@/model/core";
import {GetHeadQuarterListDto} from "@/dtos";

export class GetHeadQuarterListModel extends Entity<GetHeadQuarterListDto>{
    constructor(dto: GetHeadQuarterListDto) {
        super(dto, 'id');
    }
    get id():string{
        return this.dto?.id ?? ''
    }
    get name():string{
        return this.dto?.name ?? ''
    }
}
