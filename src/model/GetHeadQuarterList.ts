import {List} from "@/model/core";
import {GetHeadQuarterListModel} from "@/model/GetHeadQuarterListModel";
import {GetHeadQuarterListDto} from "@/dtos";
import {LabelValuePair} from "@/component";

export class GetHeadQuarterList extends List<GetHeadQuarterListModel>{
    public constructor(dtos?:GetHeadQuarterListDto[]) {
        super(dtos,GetHeadQuarterListModel,false);
    }

    getLabelValuePair(): LabelValuePair[] {
        return this.map((item) => ({ label: item.name, value: item.id }));
    }
}
