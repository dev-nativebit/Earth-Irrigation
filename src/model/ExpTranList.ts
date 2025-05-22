import {List} from "@/model/core";
import {ExpTranModel} from "@/model/ExpTranModel";
import {ExpTranDto} from "@/dtos";

export class ExpTranList extends List<ExpTranModel>{
    public constructor(dtos?:ExpTranDto[]) {
        super(dtos,ExpTranModel,false);
    }
}
