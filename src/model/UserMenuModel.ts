import {Model} from '@/model/core';
import {UserMenuDto} from '@/dtos';
import {MenuList} from '@/model/MenuList';
import {MenuPositionModel} from "@/model/MenuPositionModel";

export class UserMenuModel extends Model<UserMenuDto>{
  public constructor(dto:UserMenuDto) {
    super(dto);
  }

  get sidebarMenus():MenuList{
    return new MenuList(this.dto?.sidebarMenus)
  }
  get bottomMenus():MenuList{
    return new MenuList(this.dto?.bottomMenus)
  }

  get menuPosition():MenuPositionModel{
    return new MenuPositionModel(this.dto?.menuPosition)
  }

}
