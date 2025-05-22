import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    Box,
    HeadQuarterChangeCard, hideFullScreenProgress, LogoutBottomSheet,
    ResignBottomSheet,
    Screen,
    ScreenHeader, showFullScreenProgress,
    StatusBarType,
    TabButtons
} from "@/component";
import {ActivityIndicator, FlatList, RefreshControl} from "react-native";
import {GetRequestListApiParams, SaveNewHeadQuarterApiParams} from "@/api";
import {actions, RootState, useAppSelector} from "@/redux/root.store";
import {leaveStore} from "@/stores";
import {SvgIcon} from "@/assets/SvgIcon";
import {DeviceHelper} from "@/helper";
import {Search} from "@/component/Search";
import {observer} from "mobx-react";
import {Images} from "@/assets";
import {useForm} from "react-hook-form";
import {customFormGenerator} from "@/customFormGenerator";
import {EmployeeDetailModel, GetHeadQuarterList} from "@/model";
import {EmployeeDetailDto} from "@/dtos";
import {useTheme} from "@shopify/restyle";
import {Theme} from "@/style";
import _ from 'lodash';



export const HeadQuarterChangeScreen:React.FC = observer( () => {
    const {colors} = useTheme<Theme>()
    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        reset,
        formState: {errors},
    } = useForm();
    const getHeadQuarterListResult = useAppSelector((state:RootState) => state.hQDetail.getHeadQuarterList);
    const tabArray = [
        {
            title: 'Pending',
        },
        {
            title: 'Approved',
        },
        {
            title: 'Rejected',
        },
    ];
    const [selectedTab, setSelectedTab] = useState('Pending');
    const [isVisibleChangeHeadQuarter, setIsVisibleChangeHeadQuarter] = useState(false)
    const [isVisibleConformation, setIsVisibleConformation] = useState(false)
    const [loadingBottom, setLoadingBottom] = useState(false);
    const [page, setPage] = useState(0);
    const [refreshing, setRefreshing] = React.useState(false);
    const [
        onEndReachedCalledDuringMomentum,
        setOnEndReachedCalledDuringMomentum,
    ] = useState(false);

    const employeeDetailResult = useAppSelector((state:RootState) => state.userDetail.employeeDetail);

    const employeeDetail:EmployeeDetailModel = useMemo(() => {
        if (employeeDetailResult?.isSuccess){
            return employeeDetailResult.getValue().employeeDetail
        }
        return new EmployeeDetailModel({} as EmployeeDetailDto)
    }, []);


    const renderFooter = () => {
        return (
            <Box>
                {loadingBottom && <ActivityIndicator size="small" color="#557A19" />}
            </Box>
        );
    };

    useEffect(() => {
        apicall(0,selectedTab)
        actions.getHeadQuarterListThunkCallActions().then(r => {})
    }, []);

    const apicall = async (pageNo: number,status:string,search?:string) => {
        if (pageNo > 0) {
            setLoadingBottom(true);
        }
        const params: GetRequestListApiParams = {
            status: status === tabArray[0].title ? '0' : status === tabArray[1].title ? '1' : '2',
            length: 10,
            search: search ?? '',
            start: pageNo

        }
        actions.getRequestListThunkCallActions(params)
            .then(response => {
                setLoadingBottom(false);
            })
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        apicall(0,selectedTab)
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const fetchMoreData = () => {
        let pageNo = page + 1;
        const totalPage = 1000;
        if (totalPage >= pageNo) {
            setPage(pageNo);
            apicall(leaveStore?.getRequestList?.items.length,selectedTab);
        }
    };

    const handelOnTabPress = async (option: string) => {
        await apicall(0,option)
        setSelectedTab(option);
    };

    const getHeadQuarterList = useMemo(() => {
        if (getHeadQuarterListResult?.isSuccess){
            return getHeadQuarterListResult.getValue()
        }
        return new GetHeadQuarterList()
    }, []);

    const form = useMemo(() => customFormGenerator.generateChangeHeadQuarterForm(getHeadQuarterList), [getHeadQuarterListResult]);

    const submit = async () =>{
        setIsVisibleConformation(false)
        showFullScreenProgress()
        const params:SaveNewHeadQuarterApiParams ={
            emp_id: employeeDetail.id,
            hq_id: employeeDetail.quarter_id,
            id: "0",
            new_hq_id: getValues().headQuarter
        }
        await actions.saveNewHeadQuarterThunkCallActions(params)
            .then(()=>{
                hideFullScreenProgress()
                clearForm()
            })
    }

    const handelOnChangeRequest =() =>{
        handleSubmit(submit)()
    }

    const clearForm = () =>{
        setValue('headQuarter','')
        setValue('notes','')
    }

  const debouncedUpdate = useCallback(
    _.debounce(async (search: string) => {
      await apicall(0,search);
    }, 500), []);

    return(
        <Screen backgroundColor={'white'} statusBarType={StatusBarType.Light}>
            <Box flex={1}>
                <ScreenHeader
                    title={'HQ Change Request'}
                    onTermsPress={()=>{setIsVisibleChangeHeadQuarter(true)}}
                    isTerms={true}
                    source={Images.add}
                />
                <Search
                    onPress={() => {}}
                    onClearText={async () => {
                      await apicall(0,'');
                    }}
                    onTextChange={debouncedUpdate}
                    onEndEditing={() => {}}
                />

                <Box>
                    <TabButtons
                        buttons={tabArray}
                        selectedTab={selectedTab}
                        setSelectedTab={handelOnTabPress}
                    />
                </Box>
                <FlatList
                    data={leaveStore?.getRequestList?.items}
                    onMomentumScrollBegin={() => {
                        setOnEndReachedCalledDuringMomentum(false);
                    }}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item ,index}) => (
                        <HeadQuarterChangeCard
                            item={item}
                            isBordered={(index + 1) <  leaveStore?.getRequestList?.items.length}
                        />
                    )}
                    onEndReachedThreshold={0.1}
                    ListEmptyComponent={(
                        <SvgIcon
                            name={'noData'}
                            height={DeviceHelper.calculateWidthRatio(200)}
                            width={DeviceHelper.calculateWidthRatio(200)}
                            pressableProps={{
                                style:{
                                    alignSelf:'center',
                                    marginTop:107,
                                    height:'100%'
                                }
                            }}
                        />
                    )}
                    ListFooterComponent={(
                        <Box height={DeviceHelper.calculateHeightRatio(190)}>
                            {renderFooter()}
                        </Box>
                    )}
                    onEndReached={() => {
                        if (!onEndReachedCalledDuringMomentum) {
                            fetchMoreData(); // LOAD MORE DATA
                            setOnEndReachedCalledDuringMomentum(true);
                        }
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            progressBackgroundColor={colors.primary}
                            colors={[colors.white]}
                            progressViewOffset={40}
                        />
                    }
                />

            </Box>
            <ResignBottomSheet
                isVisible={isVisibleChangeHeadQuarter}
                onClose={() =>{
                    setIsVisibleChangeHeadQuarter(false)
                    clearForm()
                }}
                fieldArray={form}
                control={control}
                errors={errors}
                setValue={setValue}
                onSavePress={() =>{
                    setIsVisibleChangeHeadQuarter(false)
                    setIsVisibleConformation(true)
                }} />

            <LogoutBottomSheet
                isVisible={isVisibleConformation}
                onClose={() =>{
                    setIsVisibleConformation(false)
                    clearForm()
                }}
                onLogoutPress={handelOnChangeRequest}
                message={'are you sure you want to change Head Quarter ? Your old requests has been cancelled'}
                positiveButtonLabel={'Yes change'}
                negativeButtonLabel={'No'}
            />
        </Screen>
    )
})
