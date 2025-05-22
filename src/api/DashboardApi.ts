import {HttpGet, ResultCommonInterfaces} from '@/Interfaces';
import {http, Result} from '@/core';
import {DASHBOARD} from '@/api/EndPoint';

class DashboardApi implements HttpGet<ResultCommonInterfaces>{
  get = async ():Promise<Result<ResultCommonInterfaces>> =>
    http.get(DASHBOARD())
}

export const dashboardApi = new DashboardApi();