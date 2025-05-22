import {HttpPost, ResultCommonInterfaces} from '@/Interfaces';
import {http, Result} from '@/core';
import {GET_EXPENSE_LIST} from '@/api/EndPoint';

export interface GetExpenseListApiParams {
  status: number;
  start: number;
  length: number;
  search: string;
}

class GetExpenseListApi implements HttpPost<ResultCommonInterfaces>{
  post = async (params: GetExpenseListApiParams): Promise<Result<ResultCommonInterfaces>> => {
    const formData = new FormData();
    const paramKeys = Object.keys(params);
    paramKeys.map(paramKey => {
      formData.append(
        paramKey,
        params[`${paramKey}` as keyof GetExpenseListApiParams].toString(),
      );
    });
    return http.post(GET_EXPENSE_LIST(), formData);
  };
}

export const getExpenseListApi = new GetExpenseListApi();