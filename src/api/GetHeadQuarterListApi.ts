import {HttpGet, ResultCommonInterfaces} from '@/Interfaces';
import {http, Result} from '@/core';
import {GET_HEAD_QUARTER_LIST} from '@/api/EndPoint';


class GetHeadQuarterListApi implements HttpGet<ResultCommonInterfaces>{
    get = async (): Promise<Result<ResultCommonInterfaces>> =>
         http.get(GET_HEAD_QUARTER_LIST());
}

export const getHeadQuarterListApi = new GetHeadQuarterListApi()
