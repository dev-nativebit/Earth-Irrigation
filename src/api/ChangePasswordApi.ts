import {HttpPost} from "@/Interfaces";
import {http, Result} from "@/core";
import {CHANGE_PASSWORD} from "@/api/EndPoint";

export interface ChangePasswordApiParams{
    old_password:string;
    new_password:string;
    cpassword:string;
}

class ChangePasswordApi implements HttpPost<string> {
    post = async (params: ChangePasswordApiParams): Promise<Result<string>> => {
        const formData = new FormData();
        const paramKeys = Object.keys(params);
        paramKeys.map(paramKey => {
            formData.append(
                paramKey,
                params[`${paramKey}` as keyof ChangePasswordApiParams]
            );
        });
        return http.post(CHANGE_PASSWORD(), formData);
    };
}
export const changePasswordApi = new ChangePasswordApi()
