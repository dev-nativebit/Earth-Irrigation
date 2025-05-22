import {HttpGet, ResultCommonInterfaces} from '@/Interfaces';
import {http, Result} from '@/core';
import {EMPLOYEE_DETAIL} from '@/api/EndPoint';

class GetEmployeeDetailApi implements HttpGet<ResultCommonInterfaces>{
  get = async ():Promise<Result<ResultCommonInterfaces>> =>
    http.get(EMPLOYEE_DETAIL())
}

export const getEmployeeDetailApi = new GetEmployeeDetailApi()