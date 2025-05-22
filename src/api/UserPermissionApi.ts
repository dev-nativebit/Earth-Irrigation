import {HttpGet, HttpPost, ResultCommonInterfaces} from '@/Interfaces';
import {http, Result} from '@/core';
import {USER_PERMISSION} from '@/api/EndPoint';

class UserPermissionApi implements HttpGet<ResultCommonInterfaces>{
  get = async ():Promise<Result<ResultCommonInterfaces>> =>
    http.get(USER_PERMISSION())
}

export const userPermissionApi = new UserPermissionApi();