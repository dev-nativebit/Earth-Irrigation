import {HttpPost, ResultCommonInterfaces} from '@/Interfaces';
import {http, Result} from '@/core';
import { GET_VISIT_LIST} from '@/api/EndPoint';

export interface GetVisitListApiParams {
  visit_status: number;
  start: number;
  length: number;
  search: string;
}

class GetVisitListApi implements HttpPost<ResultCommonInterfaces>{
  post = async (params: GetVisitListApiParams): Promise<Result<ResultCommonInterfaces>> => {
    const formData = new FormData();
    const paramKeys = Object.keys(params);
    paramKeys.map(paramKey => {
      formData.append(
        paramKey,
        params[`${paramKey}` as keyof GetVisitListApiParams].toString(),
      );
    });
    return http.post(GET_VISIT_LIST(), formData);
  };
}
export const getVisitListApi  = new GetVisitListApi();
