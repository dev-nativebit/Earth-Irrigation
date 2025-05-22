import {Model} from '@/model/core';
import {ExpTypeDto} from '@/dtos/ExpTypeListDto';
import {HeadDataModel} from '@/model/HeadDataModel';
import {ExpTypeList} from '@/model/ExpTypeList';
import {LabelValuePair} from "@/component";

export class ExTypeModel extends Model<ExpTypeDto> {
  constructor(dto: ExpTypeDto) {
    super(dto);
  }
  get travelBy():string[]{
    return this.dto?.travelBy?? []
  }
  get expTypeList(): ExpTypeList {
    return new ExpTypeList(this.dto?.expTypeList);
  }

  get getLabelValuePair(): LabelValuePair[] {
    return this.travelBy.map((item) => ({ label: item,value: item }));
  }
}
