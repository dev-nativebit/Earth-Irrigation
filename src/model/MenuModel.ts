import {Entity} from '@/model/core';
import {MenuDto} from '@/dtos';

export class MenuModel extends Entity<MenuDto>{
  public constructor(dto:MenuDto) {
    super(dto,'menu_name');
  }

  get menuName():string{
    return this.dto?.menu_name ?? ''
  }
  get menuIcon():string{
    return this.dto?.menu_icon ?? ''
  }
  get baseUrl():string{
    return this.dto?.base_url ?? ''
  }
  get isRead():string{
    return this.dto?.is_read ?? ''
  }
  get isWrite():string{
    return this.dto?.is_write ?? ''
  }
  get isModify():string{
    return this.dto?.is_modify ?? ''
  }
  get isRemove():string{
    return this.dto?.is_remove ?? ''
  }
  get isApprove():string{
    return this.dto?.is_approve ?? ''
  }
}