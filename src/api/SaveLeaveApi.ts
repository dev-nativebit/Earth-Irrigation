import {HttpPost} from "@/Interfaces";
import {http, Result} from "@/core";
import {SAVE_LEAVE} from "@/api/EndPoint";

export interface SaveLeaveParams{
    id:string,
    start_date:string,
    start_section:string,
    end_date:string,
    end_section:string,
    leave_reason:string,
}

class SaveLeaveApi implements HttpPost<string>{
    post = async (params: SaveLeaveParams): Promise<Result<string>> => {
        const formData = new FormData();
        const paramKeys = Object.keys(params);
        paramKeys.map(paramKey => {
            formData.append(
                paramKey,
                params[`${paramKey}` as keyof SaveLeaveParams].toString(),
            );
        });
        return http.post(SAVE_LEAVE(), formData);
    };
}
export const saveLeaveApi = new SaveLeaveApi()
