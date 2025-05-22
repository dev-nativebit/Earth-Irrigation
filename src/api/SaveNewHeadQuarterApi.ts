import {HttpPost} from "@/Interfaces";
import {http, Result} from "@/core";
import {SAVE_NWE_HEAD_QUARTER} from "@/api/EndPoint";

export interface SaveNewHeadQuarterApiParams{
    id: string;
    emp_id:string
    hq_id:string
    new_hq_id:string
}

class SaveNewHeadQuarterApi implements HttpPost<string>{
    post = async (params: SaveNewHeadQuarterApiParams): Promise<Result<string>> => {
        const formData = new FormData();
        const paramKeys = Object.keys(params);
        paramKeys.map(paramKey => {
            formData.append(
                paramKey,
                params[`${paramKey}` as keyof SaveNewHeadQuarterApiParams].toString(),
            );
        });
        return http.post(SAVE_NWE_HEAD_QUARTER(), formData);
    };
}

export const saveNewHeadQuarterApi = new SaveNewHeadQuarterApi()
