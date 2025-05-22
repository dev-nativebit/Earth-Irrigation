import {HttpPost, ResultCommonInterfaces} from "@/Interfaces";
import {http, Result} from "@/core";
import {ADD_LEAVE} from "@/api/EndPoint";

class AddLeaveApi implements HttpPost<ResultCommonInterfaces>{
    post= async ():Promise<Result<ResultCommonInterfaces>> =>
        http.post(ADD_LEAVE())
}

export const addLeaveApi = new AddLeaveApi();
