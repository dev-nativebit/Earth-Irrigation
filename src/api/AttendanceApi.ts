import {HttpPost} from '@/Interfaces';
import {http, Result} from '@/core';
import {ATTENDANCE} from '@/api/EndPoint';

export interface AttendanceApiParams {
  type:string
  id:string
  s_lat:string
  s_lon:string
}

class AttendanceApi implements HttpPost<string>{
  post = async (
    params:AttendanceApiParams,
    formData:FormData
  ):Promise<Result<string>> =>{
    formData.append('id',params.id);
    formData.append('type',params.type);
    formData.append('s_lat',params.s_lat);
    formData.append('s_lon',params.s_lon);
    return  http.post(ATTENDANCE(),formData)
  }

}

export const attendanceApi = new AttendanceApi();
