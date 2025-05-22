import {HttpPost, ResultCommonInterfaces} from "@/Interfaces";
import {http, Result} from "@/core";
import {EDIT_EXPENSE} from "@/api/EndPoint";

export interface EditExpenseApiParams {
    id:string
}

class EditExpenseApi implements HttpPost<ResultCommonInterfaces>{
    post = async (params: EditExpenseApiParams): Promise<Result<ResultCommonInterfaces>> => {
        const formData = new FormData();
        const paramKeys = Object.keys(params);
        paramKeys.map(paramKey => {
            formData.append(
                paramKey,
                params[`${paramKey}` as keyof EditExpenseApiParams]
            );
        });
        return http.post(EDIT_EXPENSE(), formData);
    };
}

export const editExpenseApi = new EditExpenseApi()
