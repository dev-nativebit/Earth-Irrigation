import React, {useEffect, useRef, useState} from 'react';
import {
  Box,
  FloatingButton,
  LeaveCard,
  Screen,
  ScreenHeader,
  StatusBarType,
  TabButtons,
} from '@/component';
import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import {actions} from '@/redux/root.store';
import {GetLeaveListApiParams} from '@/api';
import {leaveStore} from '@/stores';
import {Search} from '@/component/Search';
import {SvgIcon} from '@/assets/SvgIcon';
import {DeviceHelper} from '@/helper';
import {observer} from 'mobx-react';
import {navigate, Routes} from '@/navigation/AppNavigation';
import {useTheme} from "@shopify/restyle";
import {Theme} from "@/style";

export const LeaveScreen:React.FC = observer( () =>{
    const {colors} = useTheme<Theme>()
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
    const selectedTab = useRef('Pending')
    const [loadingBottom, setLoadingBottom] = useState(false);
    const [page, setPage] = useState(0);
    const [refreshing, setRefreshing] = React.useState(false);
    const [
        onEndReachedCalledDuringMomentum,
        setOnEndReachedCalledDuringMomentum,
    ] = useState(false);

    const renderFooter = () => {
        return (
            <Box>
                {loadingBottom && <ActivityIndicator size="small" color="#557A19" />}
            </Box>
        );
    };

    useEffect(() => {
        apicall(0,selectedTab.current)
    }, []);

    const apicall = async (pageNo: number,status:string,search?:string) => {
        if (pageNo > 0) {
            setLoadingBottom(true);
        }
        const params: GetLeaveListApiParams = {
            auth_by: "",
            emp_id: "",
            from_date: "",
            id: "",
            to_date: "",
            status: status === tabArray[0].title ? '1' : status === tabArray[1].title ? '2' : '3',
            length: '10',
            search: search ?? '',
            start: pageNo.toString(),
        }
        console.log(params)
         actions.getLeaveListThunkCallActions(params)
             .then(response => {
                 setLoadingBottom(false);
             })
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        apicall(0,selectedTab.current)
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const fetchMoreData = () => {
        let pageNo = page + 1;
        const totalPage = 1000;
        if (totalPage >= pageNo) {
            setPage(pageNo);
            apicall(leaveStore?.leaveList?.items.length,selectedTab.current);
        }
    };

    const handelOnTabPress = async (option: string) => {
        await apicall(0,option)
            selectedTab.current = option
    };

    return(
        <Screen backgroundColor={'white'} statusBarType={StatusBarType.Light}>
            <Box flex={1}>
                <ScreenHeader title={'Leave'} />
                <Search
                    onPress={() => {}}
                    onClearText={async () => {}}
                    onTextChange={()=>{}}
                    onEndEditing={() => {}}
                />

                <Box>
                    <TabButtons
                        buttons={tabArray}
                        selectedTab={selectedTab.current}
                        setSelectedTab={handelOnTabPress}
                    />
                </Box>

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
                            progressViewOffset={40}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            progressBackgroundColor={colors.primary}
                            colors={[colors.white]}
                        />
                    }
                />
            </Box>
            <FloatingButton
                onPress={() =>{
                    navigate({
                        screenName:Routes.AddLeave
                    })
                }}
                bottom={40}
            />
        </Screen>
    )
})
