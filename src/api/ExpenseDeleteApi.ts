import { http, Result } from "@/core";
import { HttpPost } from "@/Interfaces";
import { EXPENSE_DELETE } from "./EndPoint";

export interface ExpenseDeleteApiProps {
  id:string
}

class ExpenseDeleteApi implements HttpPost<string>{
    post = async (params: ExpenseDeleteApiProps): Promise<Result<string>> => {
        const formData = new FormData();
        const paramKeys = Object.keys(params);
        paramKeys.map(paramKey => {
          formData.append(
            paramKey,
            params[`${paramKey}` as keyof ExpenseDeleteApiProps].toString(),
          );
        });
        return http.post(EXPENSE_DELETE(), formData);
      };
}

export const expenseDeleteApi = new ExpenseDeleteApi()