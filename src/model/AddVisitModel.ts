import {Model} from '@/model/core';
import {AddVisitDto} from '@/dtos';
import {HeadDataModel} from '@/model/HeadDataModel';
import {VisitPartyList} from '@/model/VisitPartyList';

export class AddVisitModel extends Model<AddVisitDto>{
  constructor(dot:AddVisitDto) {
    super(dot);
  }

  get headData():HeadDataModel{
    return new HeadDataModel(this.dto?.headData)
  }
  get visitTypeList():VisitPartyList{
    return new VisitPartyList(this.dto?.visitTypeList)
  }
}
