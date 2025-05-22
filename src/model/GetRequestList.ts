import {List} from "@/model/core";
import {GetRequestModel} from "@/model/GetRequestModel";
import {GetRequestListDto} from "@/dtos";

export class GetRequestList extends List<GetRequestModel>{
    public constructor(dtos?: GetRequestListDto[]) {
        super(dtos, GetRequestModel, false);
    }
}
