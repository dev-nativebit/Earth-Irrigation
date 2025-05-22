import {HttpGet, ResultCommonInterfaces} from '@/Interfaces';
import {http, Result} from '@/core';
import {ADD_VISIT} from '@/api/EndPoint';

class AddVisitApi implements HttpGet<ResultCommonInterfaces>{
  get =  async ():Promise<Result<ResultCommonInterfaces>> =>
    http.get(ADD_VISIT())
}

export const addVisitApi = new AddVisitApi();