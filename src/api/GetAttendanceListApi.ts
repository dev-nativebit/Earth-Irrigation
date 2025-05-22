import {http, Http, Result} from "@/core";
import {HttpPost, ResultCommonInterfaces} from "@/Interfaces";
import {GET_ATTENDANCE_LIST} from "@/api/EndPoint";

export interface GetAttendanceListApiParams {
    start: string;
    length: string;
    search: string;
    self_punch:string;
}

class GetAttendanceListApi implements HttpPost<ResultCommonInterfaces>{
    post = async (params: GetAttendanceListApiParams): Promise<Result<ResultCommonInterfaces>> => {
        const formData = new FormData();
        const paramKeys = Object.keys(params);
        paramKeys.map(paramKey => {
            formData.append(
                paramKey,
                params[`${paramKey}` as keyof GetAttendanceListApiParams].toString(),
            );
        });
        return http.post(GET_ATTENDANCE_LIST(), formData);
    };
}

export const getAttendanceListApi = new GetAttendanceListApi()
