import {Model} from '@/model/core';
import {UserDetailDto} from '@/dtos';

export class UserModel extends Model<UserDetailDto>{
  public constructor(dto: UserDetailDto) {
    super(dto);
  }

  get loginId():string{
    return this.dto?.loginId ?? ''
  }
  get role():string{
    return this.dto?.role ?? ''
  }
  get roleName():string{
    return this.dto?.roleName ?? ''
  }
  get user_name():string{
    return this.dto?.user_name ?? ''
  }
  get superAuth():string{
    return this.dto?.superAuth ?? ''
  }
  get authId():string{
    return this.dto?.authId ?? ''
  }
  get zoneId():string{
    return this.dto?.zoneId ?? ''
  }
  get leadRights():string{
    return this.dto?.leadRights ?? ''
  }
  get user_code():string{
    return this.dto?.user_code ?? ''
  }
  get empId():string{
    return this.dto?.empId ?? ''
  }

}
