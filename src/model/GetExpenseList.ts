import {List} from './core';
import {GetExpenseListModel} from '@/model/GetExpenseListModel';
import {GetExpenseListDto} from '@/dtos';

export class GetExpenseList extends List<GetExpenseListModel>{
  constructor(dtos?:GetExpenseListDto[]) {
    super(dtos,GetExpenseListModel,false);
  }
}