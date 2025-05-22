import { http, Result } from "@/core";
import { HttpPost } from "@/Interfaces";
import { EXPENSE_APPROVE_REJECT } from "./EndPoint";

export interface ExpenseApprovRejectApiProps {
    id:string
    status:string
    amount:string
    rej_reason:string
}

class ExpenseApprovRejectApi implements HttpPost<string>{
    post = async (params: ExpenseApprovRejectApiProps): Promise<Result<string>> => {
        const formData = new FormData();
        const paramKeys = Object.keys(params);
        paramKeys.map(paramKey => {
          formData.append(
            paramKey,
            params[`${paramKey}` as keyof ExpenseApprovRejectApiProps].toString(),
          );
        });
        return http.post(EXPENSE_APPROVE_REJECT(), formData);
      };
}

export const expenseApprovRejectApi = new ExpenseApprovRejectApi()