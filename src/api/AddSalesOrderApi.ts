import {HttpGet, ResultCommonInterfaces} from '@/Interfaces';
import {http, Result} from '@/core';
import {ADD_SALES_ORDERS} from '@/api/EndPoint';

class  AddSalesOrderApi implements HttpGet<ResultCommonInterfaces>{
  get = async ():Promise<Result<ResultCommonInterfaces>> =>
    http.get(ADD_SALES_ORDERS())
}

export const addSalesOrderApi = new AddSalesOrderApi();