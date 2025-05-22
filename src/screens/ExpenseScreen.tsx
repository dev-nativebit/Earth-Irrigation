import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Box,
  ExpenseBottomSheet,
  ExpenseCard,
  FloatingButton, hideFullScreenProgress,
  RejectResonBottomSheet,
  Screen, showFullScreenProgress,
  StatusBarType,
  TabButtons,
} from '@/component';
import {Search} from '@/component/Search';
import {navigate, Routes} from '@/navigation/AppNavigation';
import {actions, RootState, useAppSelector} from '@/redux/root.store';
import {EditExpenseApiParams, ExpenseApprovRejectApiProps, ExpenseDeleteApiProps, GetExpenseListApiParams} from '@/api';
import {GetExpenseListModel, MenuModel, MenuPositionModel} from '@/model';
import {DeviceHelper} from '@/helper';
import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import _ from 'lodash';
import {MenuDto, MenuPositionDto} from "@/dtos";
import {observer} from "mobx-react";
import {leaveStore} from "@/stores";
import {useTheme} from "@shopify/restyle";
import {Theme} from "@/style";

export const ExpenseScreen: React.FC = observer( () => {
  const userPermissionResult = useAppSelector((state:RootState) => state.userDetail.userPermissionResult);
  const [selectedTab, setSelectedTab] = useState('Pending');
  const {colors} = useTheme<Theme>()
  const [isVisibleMenu,setIsVisibleMenu] = useState(false)
  const [isVisibleReason,setIsVisibleReason] = useState(false)
  const [selectedItem,setSelectedItem] = useState<GetExpenseListModel>()
  const [reason,setReason] = useState('')
  const [loadingBottom, setLoadingBottom] = useState(false);
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);
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

  const renderFooter = () => {
    return (
        <Box>
          {loadingBottom && <ActivityIndicator size="small" color="#557A19" />}
        </Box>
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handelApiCall(0,'')
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const fetchMoreData = () => {
    let pageNo = page + 1;
    const totalPage = 1000;
    if (totalPage >= pageNo) {
      setPage(pageNo);
      handelApiCall(leaveStore?.getExpenseList?.items.length,'');
    }
  };


  const handelOnTabPress = (option: string) => {

    setSelectedTab(option);
  };

  const handelApiCall =  (page:number,search?:string) =>{
    if (page > 0) {
      setLoadingBottom(true);
    }
    // showFullScreenProgress()
    const params:GetExpenseListApiParams = {
      length: page,
      search: search ?? '',
      start: 0,
      status: selectedTab === tabArray[0].title ? 0 : selectedTab === tabArray[1].title ? 1 : 2
    }
     actions.getExpenseListThunkCallActions(params).then(()=>{
       setLoadingBottom(false);
     })
    // hideFullScreenProgress()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    _.debounce(async (search: string) => {
       handelApiCall(0,search);
    }, 500), []);

  useEffect(() => {
    handelApiCall(0)
  }, [selectedTab]);


  const approveExpense = () =>{
    showFullScreenProgress()
    const props:ExpenseApprovRejectApiProps ={
      id: selectedItem?.expenseId ?? '',
      status: '1',
      amount: selectedItem?.amount ?? '',
      rej_reason: ''
    }
    actions.approveRejectExpenseThunkCallActions(props).then(res =>{
      if(res.isSuccess){
        handelApiCall(0)
      }
      hideFullScreenProgress()
    })

  }

  const rejectExpenseApiCall = () =>{
    setIsVisibleReason(false)
    showFullScreenProgress()
    const props:ExpenseApprovRejectApiProps ={
      id: selectedItem?.expenseId ?? '',
      status: '2',
      amount: selectedItem?.amount ?? '',
      rej_reason: reason,
    }
    actions.approveRejectExpenseThunkCallActions(props).then(res =>{
      if(res.isSuccess){
        handelApiCall(0)
      }
      hideFullScreenProgress()
    })

  }

  const deleteExpenseApiCall = () =>{
    showFullScreenProgress()
    const props:ExpenseDeleteApiProps={
      id:selectedItem?.expenseId ??''
    }

    actions.deleteExpenseThunkCallActions(props).then(res =>{
      if(res.isSuccess){
        handelApiCall(0)
      }
      hideFullScreenProgress()
    })
  }

  const permissionPosition = useMemo(() => {
    if (userPermissionResult?.isSuccess){
      return userPermissionResult.getValue().userPermission.menuPosition
    }
    return new MenuPositionModel({} as MenuPositionDto)
  }, [userPermissionResult]);

  const permissions = useMemo(() => {
    if (userPermissionResult?.isSuccess){
      return userPermissionResult.getValue().userPermission.bottomMenus.items[permissionPosition.Attendance]
    }
    return new MenuModel({} as MenuDto)
  }, [userPermissionResult])

  return (
    <Screen backgroundColor={'white'} statusBarType={StatusBarType.Light}>
      <Box flex={1} backgroundColor={'white'}>
        {/*<ScreenHeader title={'Expense'} />*/}
        <Search
          onPress={() => {}}
          onClearText={() => { handelApiCall(0)}}
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
          data={leaveStore?.getExpenseList?.items}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
          keyExtractor={item => item.expenseId}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ExpenseCard
              onMenuPress={()=>{
              setSelectedItem(item)
              setIsVisibleMenu(true)
            }}

              item={item}
            />
          )}
          onEndReachedThreshold={0.1}
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
        {
          permissions?.isWrite === '1' && (
             <FloatingButton
                 onPress={async () => {
                   await actions.addExTypeThunkCallActions()
                   navigate({
                     screenName: Routes.AddExpense,
                     params:{
                       isEdit:false,
                       isViewOnly:false,
                     }
                   });
                 }}
                 bottom={110}
             />
          )
        }

      </Box>
      <ExpenseBottomSheet
        isMenuButtonShow={selectedTab ===tabArray[0].title}
        isVisible={isVisibleMenu}
        onClose={() =>{setIsVisibleMenu(false)}}
        onDelete={deleteExpenseApiCall}
        onApprov={approveExpense}
        onEditPress={async() =>{
          const params:EditExpenseApiParams={
            id:selectedItem?.expenseId ?? '',
          }
          await actions.addEditExpThunkCallActions(params)
          await actions.addExTypeThunkCallActions()
          navigate({
            screenName: Routes.AddExpense,
            params:{
              isEdit:true,
              isViewOnly:false,
              selectedItem:selectedItem
            }
          });
        }}
        onViewPress={async() =>{
          const params:EditExpenseApiParams={
            id:selectedItem?.expenseId ?? '',
          }
          await actions.addEditExpThunkCallActions(params)
          await actions.addExTypeThunkCallActions()
          navigate({
            screenName: Routes.AddExpense,
            params:{
              isEdit:false,
              isViewOnly:true,
              selectedItem:selectedItem
            }
          });
        }}
        permissions={permissions}
        onReject={()=>{setIsVisibleReason(true)}}
      />

      <RejectResonBottomSheet
        isVisible={isVisibleReason}
        onClose={() =>{setIsVisibleReason(false)}}
        onChnage={setReason}
        onRejectPress={rejectExpenseApiCall}
        value={reason}
      />
    </Screen>
  );
});
