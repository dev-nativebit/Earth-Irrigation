import React, {useMemo, useState} from 'react';
import {Box} from '../Box';
import {Image, LogoutBottomSheet, SideMenuCell, Text} from '@/component';
import {Images} from '@/assets';
import {DeviceHelper} from '@/helper';
import {fonts} from '@/style';
import {navigate, reset, Routes} from '@/navigation/AppNavigation';
import {Storage} from '@/core/Storage';
import {RootState, useAppSelector} from '@/redux/root.store';
import {MenuList, UserModel} from '@/model';
import {ImageSourcePropType} from 'react-native';
import {UserDetailDto} from "@/dtos";
import TabNavigationData from "@/navigation/TabNavigationData";


export enum TopTabEnum {
  Home = 'Home',
  Attendance = 'Attendance',
  HeadQuarter = 'Head Quarter',
  Leave = 'Leave',
  LeaveApprove = 'Leave Approve',
  Expense = 'Expense',
  Visit = 'Visit',
  Profile = 'Profile',
  Logout = 'Logout',
  AttendanceApproval = 'Attendance Approval',
  HQChangeRequest = 'HQ Change Request',
  Reports ='Reports'
}

export interface DeleteDocumentModelProps {
  selectedTab?: TopTabEnum;
  onOptionSelected: (selectedTab: TopTabEnum) => void;
  onClosePress: () => void;
}

export const SideMenu: React.FC<DeleteDocumentModelProps> = ({
    selectedTab,
    onOptionSelected,
    onClosePress,
}: DeleteDocumentModelProps) => {
  const userPermissionResult = useAppSelector((state:RootState) => state.userDetail.userPermissionResult);
  const getPartyListResult = useAppSelector((state:RootState) => state.loginDetail.LoginResult);
  const [isVisibleLogout, setIsVisibleLogout] = useState(false);
  const userDetail = useMemo(() => {
    if (getPartyListResult?.isSuccess){
      return getPartyListResult.getValue().userDetail
    }
    return new UserModel({} as UserDetailDto)
  }, []);



  const handelOnLogoutPress = async () =>{
    await Storage.logout()
    reset({
      screenName:Routes.Login
    })
  }

  const sidebarMenus = useMemo(() => {
    if (userPermissionResult?.isSuccess){
      return userPermissionResult.getValue().userPermission.sidebarMenus
    }
    return new MenuList()
  }, []);

  const getIcon = (type:string):ImageSourcePropType =>{
      switch (type){
        case 'Attendance':
          return Images.attendance
        case 'Head Quarter':
          return Images.office
        case 'Leave':
          return Images.leave
        case 'Leave Approve':
          return Images.leave
        case 'Attendance Approval':
          return Images.attendance
        case 'HQ Change Request':
          return Images.profile
        case 'Reports':
          return Images.report
        case 'Home':
          return Images.home
        case 'Visit':
          return Images.visit
        case 'Profile':
          return Images.profile
        case 'Expense':
          return Images.expense
        case 'Logout':
          return Images.logout
        default:
          return Images.home
      }
  }

  const handelOnPress = (type:string) =>{
      switch (type){
        case 'Home':
          onClosePress();
          navigate({
            screenName:Routes.Dashboard,
            params:{
              screen:TabNavigationData[0].name
            }
          });
          onOptionSelected(TopTabEnum.Home);
          break;
        case 'Attendance':
          navigate({screenName: Routes.Attendance});
          onClosePress();
          onOptionSelected(TopTabEnum.Attendance);
          break;
        case 'Head Quarter':
          onClosePress();
          onOptionSelected(TopTabEnum.HeadQuarter);
          break;
        case 'Leave':
          onClosePress();
          onOptionSelected(TopTabEnum.Leave);
          navigate({screenName: Routes.Leave});
          break;
        case 'Visit':
          navigate({
            screenName:Routes.Dashboard,
            params:{
              screen:TabNavigationData[1].name
            }
          });
          onClosePress();
          onOptionSelected(TopTabEnum.Visit);
          break
        case 'Leave Approve':
          onClosePress();
          onOptionSelected(TopTabEnum.LeaveApprove);
          navigate({screenName: Routes.ApproveLeave});
          break;
        case 'Expense':
          navigate({
            screenName:Routes.Dashboard,
            params:{
              screen:TabNavigationData[2].name
            }
          });
          onClosePress();
          onOptionSelected(TopTabEnum.Expense);
          break;
        case 'Profile':
          navigate({
            screenName:Routes.Dashboard,
            params:{
              screen:TabNavigationData[3].name
            }
          });
          onClosePress();
          onOptionSelected(TopTabEnum.Profile);
          break;
        case 'Attendance Approval':
          onClosePress();
          onOptionSelected(TopTabEnum.AttendanceApproval);
          navigate({screenName: Routes.ApproveAttendance});
          break;
        case 'HQ Change Request':
          onClosePress();
          onOptionSelected(TopTabEnum.HQChangeRequest);
          navigate({screenName: Routes.HeadQuarterChange});
          break;
        case 'Reports':
          onClosePress();
          onOptionSelected(TopTabEnum.Reports);
          break;
        case 'Logout':
          onClosePress()
          setIsVisibleLogout(true)
          break;
      }
  }
  return (
    <Box flex={1} backgroundColor={'white'}>
      <Box>
        <Box backgroundColor={'header'} alignItems={'center'}>
          <Image
            source={Images.logo}
            height={DeviceHelper.calculateWidthRatio(120)}
            // @ts-ignore
            width={'80%'}
            resizeMode={'contain'}
          />
        </Box>
        <Text
          fontFamily={fonts.regular}
          fontSize={16}
          color={'black'}
          textAlign={'center'}
          marginHorizontal={'r'}
          marginTop="sr">
          {`${userDetail.user_code}-${userDetail.user_name}`}
        </Text>
        {sidebarMenus.map((item, index) => (
          <SideMenuCell
            key={index}
            onPress={() => {
              handelOnPress(item.menuName);
            }}
            title={item.menuName}
            isSelected={selectedTab === item.menuName}
            icon={getIcon(item.menuName)}
          />
        ))}
      </Box>
      <LogoutBottomSheet
        isVisible={isVisibleLogout}
        onClose={() => {
          setIsVisibleLogout(false);
        }}
        onLogoutPress={handelOnLogoutPress}
        message={'Do you really want to logout?'}
        positiveButtonLabel={'Yes, Logout'}
        negativeButtonLabel={'Cancel'}
      />
    </Box>
  );
};
