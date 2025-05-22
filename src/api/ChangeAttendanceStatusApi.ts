import {HttpPost} from '@/Interfaces';
import {http, Result} from '@/core';
import {CHANGE_ATTENDANCE_STATUS} from '@/api/EndPoint';

export interface ChangeAttendanceStatusApiParams {
  id: string;
  attendance_status: string;
  notes: string;
}

class ChangeAttendanceStatusApi implements HttpPost<string>{
    post = async (params: ChangeAttendanceStatusApiParams): Promise<Result<string>> => {
        const formData = new FormData();
        const paramKeys = Object.keys(params);
        paramKeys.map(paramKey => {
            formData.append(
                paramKey,
                params[`${paramKey}` as keyof ChangeAttendanceStatusApiParams].toString(),
            );
        });
        return http.post(CHANGE_ATTENDANCE_STATUS(), formData);
    };
}

export const changeAttendanceStatusApi = new ChangeAttendanceStatusApi()
