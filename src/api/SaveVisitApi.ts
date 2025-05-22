import {HttpPost} from '@/Interfaces';
import {http, Result} from '@/core';
import { SAVE_VISIT} from '@/api/EndPoint';


export interface SaveVisitApiParams{
  id:string
  emp_id:string
  s_lat:string
  s_lon:string
  party_name:string
  visit_type:string
  contact_person:string
  purpose:string
}


class SaveVisitApi implements HttpPost<string>{
  post = async (params:SaveVisitApiParams):Promise<Result<string>> =>{
    const formData = new FormData();
    const paramKeys = Object.keys(params);
    paramKeys.map(paramKey => {
      formData.append(
        paramKey,
        params[`${paramKey}` as keyof SaveVisitApiParams],
      );
    });
    return http.post(SAVE_VISIT(), formData);
  }
}

export const saveVisitApi = new SaveVisitApi();
