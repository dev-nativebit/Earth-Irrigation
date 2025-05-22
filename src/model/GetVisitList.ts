import {List} from '@/model/core';
import {GetVisitListModel} from '@/model/GetVisitListModel';
import {GetVisitListDto} from '@/dtos';

export class GetVisitList extends List<GetVisitListModel>{
  constructor(dtos?:GetVisitListDto[]) {
    super(dtos,GetVisitListModel,false);
  }
}