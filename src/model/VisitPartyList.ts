import {List} from '@/model/core';
import {VisitPartyListModel} from '@/model/VisitPartyListModel';
import {VisitPartyListDto} from '@/dtos';
import {LabelValuePair} from '@/component';

export class VisitPartyList extends List<VisitPartyListModel>{
   constructor(dtos?:VisitPartyListDto[]) {
    super(dtos,VisitPartyListModel,false);
  }

  getLabelValuePair(): LabelValuePair[] {
    return this.map((item) => ({ label: item.label, value: item.label }));
  }
}
