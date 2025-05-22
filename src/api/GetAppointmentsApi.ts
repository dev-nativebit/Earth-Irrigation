import {HttpPost, ResultCommonInterfaces} from "@/Interfaces";
import {http, Result} from "@/core";
import {GET_APPOINTMENTS} from "@/api/EndPoint";

export interface GetAppointmentsApiParams {
    ref_date:string
    status:string
    list_type:string
}

class GetAppointmentsApi implements HttpPost<ResultCommonInterfaces>{
    post = async (params: GetAppointmentsApiParams): Promise<Result<ResultCommonInterfaces>> => {
        const formData = new FormData();
        const paramKeys = Object.keys(params);
        paramKeys.map(paramKey => {
            formData.append(
                paramKey,
                params[`${paramKey}` as keyof GetAppointmentsApiParams].toString(),
            );
        });
        return http.post(GET_APPOINTMENTS(), formData);
    };
}

export const getAppointmentsApi = new GetAppointmentsApi()
