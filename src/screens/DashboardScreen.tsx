import React, {useEffect, useMemo, useState} from 'react';
import {
  Box,
  Header,
  Image,
  Screen,
  SideDrawerMenu,
  StatusBarType,
  Text,
  TopTabEnum,
} from '@/component';
import TabNavigationData from '@/navigation/TabNavigationData';
import {
  ImageSourcePropType,
  Keyboard,
  PermissionsAndroid,
  Platform,
  View,
} from 'react-native';
import {DeviceHelper} from '@/helper';
import {fonts, Theme} from '@/style';
import styles from '@/navigation/styles';
import {useTheme} from '@shopify/restyle';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {navigate, Routes} from '@/navigation/AppNavigation';
import {actions, RootState, useAppSelector} from '@/redux/root.store';
import { MenuList, UserModel} from '@/model';
import {Images} from '@/assets';
import {Home, Visit} from '@/screens/Tab';
import {Storage} from '@/core';
import {utils} from '@/utils/Utils';
import {UserDetailDto} from '@/dtos';
import {ExpenseScreen} from '@/screens/ExpenseScreen';
import {ProfileScreen} from '@/screens/ProfileScreen';

type RootTabParamList = {
  [key: string]: undefined;
};


export const DashboardScreen: React.FC = () => {

  const userPermissionResult = useAppSelector((state:RootState) => state.userDetail.userPermissionResult);
  const getUserDetailResult = useAppSelector((state:RootState) => state.loginDetail.LoginResult);
  const [visible, setVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TopTabEnum.Home);
  const [stageType, setStageType] = useState('New');
  const { colors } = useTheme<Theme>();
  const Tab = createBottomTabNavigator<RootTabParamList>();
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  const userDetail = useMemo(() => {
    if (getUserDetailResult?.isSuccess){
      return getUserDetailResult.getValue().userDetail
    }
    return new UserModel({} as UserDetailDto)
  }, []);




  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const bottomMenus = useMemo(() => {
    if (userPermissionResult?.isSuccess){
      return userPermissionResult.getValue().userPermission.bottomMenus
    }
    return new MenuList()
  }, []);

  const getIcon = (type:string):ImageSourcePropType =>{
    switch (type){
      case 'Home':
        return Images.home
      case 'Visit':
        return Images.visit
      case 'Expense':
        return Images.expense
      case 'Profile':
        return Images.profile
      default:
        return Images.home
    }
  }

  const getComponent = (type:string):React.ElementType =>{
    switch (type){
      case 'Home':
        return Home
      case 'Visit':
        return Visit
      case 'Expense':
        return ExpenseScreen
      case 'Profile':
        return ProfileScreen
      default:
        return Home
    }
  }

  const callInitApis = async () =>{
    await Storage.setItemAsync(Storage.keys.leadStage,'1')
    await Storage.setItemAsync(Storage.keys.leadType,'New')
    await actions.dashboardThunkCallActions()
    await actions.getEmployeeDetailThunkCallActions()
  }

  const checkLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: '',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    callInitApis()
    // getEnableLocation()
    checkLocationPermission()
  }, []);

  const getLeadType =async () => {
    const type = await Storage.getItemAsync(Storage.keys.leadType)
    if (type!== null) {
      setStageType(type)
    }
  }

  useEffect(() => {
    getLeadType()
  }, [selectedTab]);

  const checkUserRole =  (role:string) => {
    switch (role){
      case '-1':
        return false;
      case '1':
        return false
      case '4':
        return false
      default:
        return true
    }
  }

  const handleOnProfile= (key:string) => {
    switch (key){
      case '1':
        navigate({
          screenName: Routes.EditProfile
        })
        break;
      case '2':
        navigate({
          screenName: Routes.ResetPassword
        })
        break;
    }
  }

  return (
    <Screen
      statusBarColor={selectedTab === TopTabEnum.Home ? colors.white : colors.header}
      statusBarType={selectedTab === TopTabEnum.Home ? StatusBarType.Light : StatusBarType.Light}
      backgroundColor={'white'}
    >
      <Box flex={1}>
        <SideDrawerMenu
          isOpen={visible}
          onGestureStart={() => setVisible(true)}
          onOptionSelected={setSelectedTab}
          selectedTab={selectedTab}
          onClosePress={() => {
            setVisible(false);
          }}
          onClose={() => {
            setVisible(false);
          }}
        >
            <Header
              title={selectedTab.toString()}
              onDrawerPress={() =>{
                setVisible(true);
              }}
              onUserPress={() =>{
                utils.handleEnabledPressed().then(res =>{
                  if(res){
                    navigate({
                      screenName:Routes.Attendance
                    })
                  }
                })
              }}
              isLead={selectedTab === TopTabEnum.Profile}
              isShowAttention={selectedTab === TopTabEnum.Home && checkUserRole(userDetail.role)}
              leadType={stageType}
              onSelect={handleOnProfile}
            />

            <Tab.Navigator
              initialRouteName={TabNavigationData[0].name}
              screenListeners={({route}) => {
                setSelectedTab(route.name as TopTabEnum)
                return{}
              }}
              screenOptions={({ route }) => {
                // console.log(route);

                const hideTabBar = keyboardVisible;
                return {
                  tabBarStyle: {
                    height: hideTabBar ? 0 : Platform.OS === 'ios' ? 88 : 70,
                    backgroundColor: colors.primary,
                    position: 'absolute',
                    paddingHorizontal: hideTabBar ? 0 : 5,
                    paddingTop: hideTabBar ? 0 : 5,
                    opacity: hideTabBar ? 0 : 1,
                    elevation: 2,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -3 }, // Shadow on top
                    shadowOpacity: 0.15,
                    shadowRadius: 3,
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15,
                  },
                  headerShown: false,
                  tabBarHideOnKeyboard: true,
                };
              }}>
              {bottomMenus.map((item, idx) => (
                <Tab.Screen
                  key={`tab_item${idx + 1}`}
                  name={item?.menuName}
                  // @ts-ignore
                  component={getComponent(item.menuName)}
                  listeners={{
                    tabPress: event => {
                      setSelectedTab(item.menuName as TopTabEnum)
                    },
                  }}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <View style={[styles.tabBarItemContainer,
                        (focused) && {
                          position: 'absolute',
                          top: -35,
                          backgroundColor: colors.primary,
                          borderRadius: DeviceHelper.calculateWidthRatio(35),
                          height :DeviceHelper.calculateWidthRatio(65),
                          width :DeviceHelper.calculateWidthRatio(65),
                          borderWidth:3,
                          borderColor:colors.white,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: -3 }, // Shadow on top
                          shadowOpacity: 0.1,
                          shadowRadius: 3,
                        }]}>
                        <Image
                          source={getIcon(item.menuName)}
                          height={ DeviceHelper.calculateWidthRatio(24)}
                          width={  DeviceHelper.calculateWidthRatio(24)}
                          resizeMode={'contain'}
                          tintColor={'white'}
                        />
                      </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                      <Text
                        marginBottom={'ssr'}
                        fontSize={14}
                        fontFamily={fonts.medium}
                        color={'white'}
                        style={[focused ? {
                          top: DeviceHelper.isIos() ? -2  : -3,
                          color: 'white',
                        } :  {
                          marginTop: Platform.OS === 'ios' ? 0 : -3,
                          top : DeviceHelper.isIos() ? 12 : 0,
                        }]}>
                        {item.menuName}
                      </Text>
                    ),
                  }}
                />
              ))}
            </Tab.Navigator>
        </SideDrawerMenu>
      </Box>

    </Screen>
  );
};
