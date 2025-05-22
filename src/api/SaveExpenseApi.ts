import {HttpPost} from '@/Interfaces';
import {http, Result} from '@/core';
import {SAVE_EXPENSE} from '@/api/EndPoint';

export interface SaveExpenseApiParams {
  id: string
  expTrans:string
  exp_date:string
  notes:string
}

class SaveExpenseApi implements HttpPost<string>{
  post = async (
    params:SaveExpenseApiParams,
    formData: FormData
  ):Promise<Result<string>> =>{
    formData.append('id',params.id)
    formData.append('exp_date',params.exp_date)
    formData.append('expTrans',params.expTrans)
    formData.append('notes',params.notes)
    return http.post(SAVE_EXPENSE(),formData)
  }
}
export const saveExpenseApi = new SaveExpenseApi();
