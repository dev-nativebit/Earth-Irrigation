import {PayloadAction} from '@reduxjs/toolkit';
import {Result} from '@/core';
import {GetHeadQuarterList, GetRequestList} from '@/model';
import {HQSliceType} from "@/redux/slice/HQSlice";

export default {
    'getHQList': (state: HQSliceType, action: PayloadAction<Result<GetRequestList>>) => {
        state.getHQList = action.payload;
    },
    'getHeadQuarterList': (state: HQSliceType, action: PayloadAction<Result<GetHeadQuarterList>>) => {
        state.getHeadQuarterList = action.payload;
    },
    'saveNewHeadQuarter': (state: HQSliceType, action: PayloadAction<Result<string>>) => {
        state.saveNewHeadQuarter = action.payload;
    },
};
