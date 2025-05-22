import { ExpTypeListDto } from '@/dtos/ExpTypeListDto';
import {List} from '@/model/core';
import {ExpTypeListModel} from '@/model/ExpTypeListModel';
import {LabelValuePair} from '@/component';

export class ExpTypeList extends List<ExpTypeListModel>{
  constructor(dtos?:ExpTypeListDto[]) {
    super(dtos,ExpTypeListModel,false);
  }

  getLabelValuePair(): LabelValuePair[] {
    return this.map((item) => ({ label: item.label, value: '',data: item.ExpId }));
  }

}
