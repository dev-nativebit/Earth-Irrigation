import {HttpPost} from "@/Interfaces";
import {http, Result} from "@/core";
import { UPDATE_PROFILE} from "@/api/EndPoint";

export interface UpdateProfileApiParams{
    id:string;
    emp_email:string
    emp_contact:string;
    aadhar_no:string;
    pan_no:string;
}

class UpdateProfileApi implements HttpPost<string>{
    post = async (
        params:UpdateProfileApiParams,
        formData: FormData
    ):Promise<Result<string>> =>{
        formData.append('id',params.id)
        formData.append('emp_email',params.emp_email)
        formData.append('emp_contact',params.emp_contact)
        formData.append('aadhar_no',params.aadhar_no)
        formData.append('pan_no',params.pan_no)
        return http.post(UPDATE_PROFILE(), formData);
    }
}

export const updateProfileApi = new UpdateProfileApi();
