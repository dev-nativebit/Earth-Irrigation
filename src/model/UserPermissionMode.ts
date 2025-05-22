import {Model} from '@/model/core';
import {UserPermissionDto} from '@/dtos';
import {UserMenuModel} from '@/model/UserMenuModel';

export class UserPermissionMode  extends Model<UserPermissionDto>{
  constructor(dto:UserPermissionDto) {
    super(dto);
  }

  get headData():string {
    return this.dto?.headData ?? ''
  }
  get userPermission():UserMenuModel{
    return new UserMenuModel(this.dto?.userPermission)
  }
}