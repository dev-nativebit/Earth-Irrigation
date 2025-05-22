import { HttpPost, ResultCommonInterfaces} from "@/Interfaces";
import {http, Result} from "@/core";
import {FORCE_UPDATE} from "@/api/EndPoint";

export interface ForceUpdateApiParams{
    device_type:string
}

class ForceUpdateApi implements HttpPost<ResultCommonInterfaces>{
    post = async (params: ForceUpdateApiParams): Promise<Result<ResultCommonInterfaces>> => {
        const formData = new FormData();
        const paramKeys = Object.keys(params);
        paramKeys.map(paramKey => {
            formData.append(
                paramKey,
                params[`${paramKey}` as keyof ForceUpdateApiParams].toString(),
            );
        });
        return http.post(FORCE_UPDATE(), formData);
    };
}

export const forceUpdateApi = new ForceUpdateApi()
