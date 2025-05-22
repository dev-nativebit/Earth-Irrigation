import {HttpPost, ResultCommonInterfaces} from "@/Interfaces";
import {http, Result} from "@/core";
import {GET_LEAVE_LIST} from "@/api/EndPoint";

export interface GetLeaveListApiParams  {
    id:string
    status:string
    from_date:string
    to_date:string
    emp_id:string
    auth_by:string
    start:string
    length:string
    search:string
}

class GetLeaveListApi implements HttpPost<ResultCommonInterfaces>{
    post = async (params: GetLeaveListApiParams): Promise<Result<ResultCommonInterfaces>> => {
        const formData = new FormData();
        const paramKeys = Object.keys(params);
        paramKeys.map(paramKey => {
            formData.append(
                paramKey,
                params[`${paramKey}` as keyof GetLeaveListApiParams],
            );
        });
        return http.post(GET_LEAVE_LIST(), formData);
    };
}

export const getLeaveListApi = new GetLeaveListApi()
