import {List} from '@/model/core';
import {MenuModel} from '@/model/MenuModel';
import {MenuDto} from '@/dtos';

export class MenuList extends List<MenuModel>{
  public constructor(dtos?:MenuDto[]) {
    super(dtos,MenuModel,false);
  }
}