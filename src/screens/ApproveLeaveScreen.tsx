import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Box, hideFullScreenProgress,
  LeaveCard,
  ResignBottomSheet,
  Screen,
  ScreenHeader,
  showFullScreenProgress,
  StatusBarType,
} from '@/component';
import {Search} from "@/component/Search";
import {ActivityIndicator, FlatList, RefreshControl} from "react-native";
import {leaveStore} from "@/stores";
import {SvgIcon} from "@/assets/SvgIcon";
import {DeviceHelper} from "@/helper";
import {GetLeaveListApiParams, LeaveApproveRejectApiParams} from "@/api";
import {actions} from "@/redux/root.store";
import {observer} from "mobx-react";
import {useForm} from "react-hook-form";
import {customFormGenerator, RejectNotesIDs} from "@/customFormGenerator";
import {useTheme} from "@shopify/restyle";
import {Theme} from "@/style";
import _ from 'lodash';


export const ApproveLeaveScreen:React.FC = observer(() =>{
    const {colors} = useTheme<Theme>()
    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm();
    const [selectedID, setSelectedID] = useState('')
    const [isVisibleNote, setIsVisibleNote] = useState(false)
    const [loadingBottom, setLoadingBottom] = useState(false);
    const [page, setPage] = useState(0);
    const [refreshing, setRefreshing] = React.useState(false);
    const [
        onEndReachedCalledDuringMomentum,
        setOnEndReachedCalledDuringMomentum,
    ] = useState(false);

    const form = useMemo(() => customFormGenerator.generateRejectNotesForm(), []);

    const renderFooter = () => {
        return (
            <Box>
                {loadingBottom && <ActivityIndicator size="small" color="#557A19" />}
            </Box>
        );
    };

    useEffect(() => {
        apicall(0)
    }, []);

    const apicall = async (pageNo: number,search?:string) => {
        if (pageNo > 0) {
            setLoadingBottom(true);
        }
        const params: GetLeaveListApiParams = {
            auth_by: "",
            emp_id: "",
            from_date: "",
            id: "",
            to_date: "",
            status: '1',
            length: '10',
            search: search ?? '',
            start: pageNo.toString(),
        }
        actions.getLeaveListThunkCallActions(params)
            .then(response => {
                setLoadingBottom(false);
            })
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        apicall(0)
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const fetchMoreData = async () => {
        let pageNo = page + 1;
        const totalPage = 1000;
        if (totalPage >= pageNo) {
            setPage(pageNo);
            await apicall(leaveStore?.leaveList?.items.length);
        }
    };

    const handleOnRejectApiCall = async () =>{
        setIsVisibleNote(false)
        const params:LeaveApproveRejectApiParams={
            id: selectedID,
            status: '3',
            auth_notes: getValues()[RejectNotesIDs.notes]

        }
        showFullScreenProgress()
         actions.leaveApproveRejectThunkCallActions(params).then(async (value) =>{
           hideFullScreenProgress()
           if (value.isSuccess){
             await apicall(0)
           }
         })
    }

    const handleOnApproveApiCall = async (id:string) =>{
        const params:LeaveApproveRejectApiParams={
            id: id,
            status: '2',
            auth_notes: getValues()[RejectNotesIDs.notes] ? getValues()[RejectNotesIDs.notes] : ''

        }
      console.log(params);
        showFullScreenProgress()
         actions.leaveApproveRejectThunkCallActions(params).then(async value => {
           hideFullScreenProgress()
           if (value.isSuccess){
             await apicall(0)
           }
         })
    }

    const handleOnPressNote = () => {
        handleSubmit(handleOnRejectApiCall)()
    }

  const debouncedUpdate = useCallback(
    _.debounce(async (search: string) => {
      await apicall(0,search);
    }, 500), []);

    return(
        <Screen backgroundColor={'white'} statusBarType={StatusBarType.Light}>
            <Box flex={1}>
                <ScreenHeader title={'Approve Leave'} />
                <Search
                    onPress={() => {}}
                    onClearText={async () => {
                      await apicall(0,'');
                    }}
                    onTextChange={debouncedUpdate}
                    onEndEditing={() => {}}
                />


                <FlatList
                    data={leaveStore?.leaveList?.items}
                    onMomentumScrollBegin={() => {
                        setOnEndReachedCalledDuringMomentum(false);
                    }}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item ,index}) => (
                        <LeaveCard
                            item={item}
                            isBordered={(index + 1) <  leaveStore?.leaveList?.items.length}
                            isShowMenu={true}
                            onMenuPress={async (key) =>{
                                setSelectedID(item.id)
                                if (key ==='2'){
                                    setIsVisibleNote(true)
                                }else {
                                    await handleOnApproveApiCall(item.id)
                                }
                            }}
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
                isVisible={isVisibleNote}
                onClose={()=>{
                    setIsVisibleNote(false)
                    setValue(RejectNotesIDs.notes, '')
                }}
                fieldArray={form}
                control={control}
                errors={errors}
                onSavePress={handleOnPressNote}
            />
        </Screen>
    )
})
