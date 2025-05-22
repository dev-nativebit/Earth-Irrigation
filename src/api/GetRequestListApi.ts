import {HttpPost, ResultCommonInterfaces} from "@/Interfaces";
import {http, Result} from "@/core";
import {HEAD_QUARTER_REQUEST_LIST} from "@/api/EndPoint";

export interface GetRequestListApiParams {
    status:string
    start:number
    length:number
    search:string
}

class GetRequestListApi implements HttpPost<ResultCommonInterfaces>{
    post = async (params: GetRequestListApiParams): Promise<Result<ResultCommonInterfaces>> => {
        const formData = new FormData();
        const paramKeys = Object.keys(params);
        paramKeys.map(paramKey => {
            formData.append(
                paramKey,
                params[`${paramKey}` as keyof GetRequestListApiParams].toString(),
            );
        });
        return http.post(HEAD_QUARTER_REQUEST_LIST(), formData);
    };
}

export const getRequestListApi = new GetRequestListApi()
