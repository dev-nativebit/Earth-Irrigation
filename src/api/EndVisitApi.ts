import {HttpPost} from '@/Interfaces';
import {http, Result} from '@/core';
import { SAVE_End_VISIT} from '@/api/EndPoint';

export interface EndVisitApiParams {
  id:string
  e_lat:string
  e_lon:string
  discussion_points: string
}

class EndVisitApi implements HttpPost<string>{
  post = async (params:EndVisitApiParams,formData:FormData):Promise<Result<string>> => {
    const paramKeys = Object.keys(params);
    paramKeys.map(paramKey => {
      formData.append(
        paramKey,
        params[`${paramKey}` as keyof EndVisitApiParams],
      );
    });
    return http.post(SAVE_End_VISIT(), formData);
  }
}

export const endVisitApi = new EndVisitApi()
