import {HttpPost} from "@/Interfaces";
import {http, Result} from "@/core";
import {APPROVE_LEAVE, SAVE_LEAVE} from '@/api/EndPoint';

export interface LeaveApproveRejectApiParams {
  id:string,
  status:string
  auth_notes:string
}

class LeaveApproveRejectApi implements HttpPost<string>{
    post = async (params: LeaveApproveRejectApiParams): Promise<Result<string>> => {
        const formData = new FormData();
        const paramKeys = Object.keys(params);
        paramKeys.map(paramKey => {
            formData.append(
                paramKey,
                params[`${paramKey}` as keyof LeaveApproveRejectApiParams],
            );
        });
        return http.post(APPROVE_LEAVE(), formData);
    };
}
export const leaveApproveRejectApi = new LeaveApproveRejectApi()
