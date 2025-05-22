import {HttpGet, ResultCommonInterfaces} from '@/Interfaces';
import {http, Result} from '@/core';
import {ADD_EXPENSE} from '@/api/EndPoint';

class AddExpenceApi implements HttpGet<ResultCommonInterfaces>{
  get = async ():Promise<Result<ResultCommonInterfaces>> =>
    http.get(ADD_EXPENSE())
}

export const addExpenceApi = new AddExpenceApi();