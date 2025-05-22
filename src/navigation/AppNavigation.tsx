import React, { useEffect, useState } from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import {
  CommonActions,
  createNavigationContainerRef,
  NavigationContainer,
  StackActions
} from "@react-navigation/native";
import { Storage } from '@/core/Storage';
import RNSplashScreen from "react-native-splash-screen";
import {
  AttendanceScreen,
  DashboardScreen,
  LoginScreen,
  ExpenseScreen,
  ProfileScreen,
  ResetPasswordScreen,
  AddExpenseScreen,
  DueAppointmentScreen,
  LeaveScreen,
  AddLeaveScreen,
  ApproveLeaveScreen,
  HeadQuarterChangeScreen,
  ApproveAttendanceScreen, EditProfileScreen, ImagesScreen,
} from '@/screens';
import {actions} from '@/redux/root.store';
import { GetExpenseListModel } from "@/model";
import Toast from 'react-native-toast-message';
import {Asset} from "react-native-image-picker";


export type StackParamList = {
  HomeScreen:undefined
  LoginScreen:undefined
  DashboardScreen:undefined
  AttendanceScreen:undefined
  ExpenseScreen:undefined
  ProfileScreen:undefined
  ResetPasswordScreen:undefined
  AddExpenseScreen:{
    isEdit:boolean
    isViewOnly:boolean
    selectedItem?:GetExpenseListModel
  }
  DueAppointmentScreen:undefined
  LeaveScreen:undefined
  AddLeaveScreen:undefined
  ApproveLeaveScreen:undefined
  HeadQuarterChangeScreen:undefined
  ApproveAttendanceScreen:undefined
  EditProfileScreen:undefined
  ImagesScreen:{
    ImageList:Asset[]
    index:number
  }
};

const navigationRef = createNavigationContainerRef<StackParamList>();


/**
 *  Right To Left Screen Open Animation
 **/
export const horizontalAnimation = {
  // @ts-ignore
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export enum Routes {
  Login = 'LoginScreen',
  Dashboard = 'DashboardScreen',
  Attendance = 'AttendanceScreen',
  Expense = 'ExpenseScreen',
  Profile = 'ProfileScreen',
  ResetPassword = 'ResetPasswordScreen',
  AddExpense = 'AddExpenseScreen',
  DueAppointment = 'DueAppointmentScreen',
  Leave = 'LeaveScreen',
  AddLeave = 'AddLeaveScreen',
  ApproveLeave = 'ApproveLeaveScreen',
  HeadQuarterChange = 'HeadQuarterChangeScreen',
  ApproveAttendance = 'ApproveAttendanceScreen',
  EditProfile = 'EditProfileScreen',
  Images = 'ImagesScreen',


}
export interface NavigationProps {
  screenName: Routes;
  params?: any;
}

export function navigate({screenName, params}: NavigationProps) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screenName, params);
  }
}

export function replace({screenName, params}: NavigationProps) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch({
      ...StackActions.replace(screenName, params),
    });
  }
}

export function reset({screenName, params}: NavigationProps) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: screenName, params}],
      }),
    );
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    if (navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  }
}

export const safeNavigate = (route: Routes, params?: Record<string, any>) => {
  navigate({screenName: route, params});
};

export interface AppNavigationProps {
  onRouteChange: (route: string) => void;
}
// @ts-ignore
export const AppNavigator: React.FunctionComponent<AppNavigationProps> = ({
  onRouteChange,
}) => {
  const Stack = createStackNavigator();
  const [loadNavigator, setLoadNavigator] = useState(false);
  const [initRouteName, setInitRouteName] = useState<Routes>();
  const [isLoginDone, setIsLoginDone] = useState(false);

  const loginAgain = async () => {
    try {
      const response = await Storage.getItemAsync(Storage.keys.login);
      if (response !== null){

        await actions.LoginAgainThunkCallActions()
        await actions.userPermissionThunkCallActions()
        setInitRouteName(Routes.Dashboard)
      }else {
        setInitRouteName(Routes.Login)
      }
    }catch (e) {
      console.log(e);
    }

  };

  /***
   * Added this patch to Update
   * the session with the latest token everytime
   * app comes to for ground
   */

  const init = async () => {
    // console.warn('islogin->',accountStore)
    Promise.all([await loginAgain()])
      .then(async () => {

        setLoadNavigator(() => true);
        setTimeout(() => {
          RNSplashScreen.hide();
        }, 500);
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const navigator = (
    <>
      <NavigationContainer
        ref={navigationRef}
        independent={true}
        // linking={linking}
        onStateChange={() => {
          // console.log('SCREEN_NAME', navigationRef.getCurrentRoute()?.name);
        }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forScaleFromCenterAndroid,
            transitionSpec: {
              open: {animation: 'timing', config: {duration: 400}},
              close: {animation: 'timing', config: {duration: 450}},
            },
          }}
          initialRouteName={initRouteName as Routes}>
            <Stack.Screen name={Routes.Login} component={LoginScreen} options={horizontalAnimation} />
            <Stack.Screen name={Routes.Dashboard} component={DashboardScreen} options={horizontalAnimation} />
            <Stack.Screen name={Routes.Attendance} component={AttendanceScreen} options={horizontalAnimation} />
            <Stack.Screen name={Routes.Expense} component={ExpenseScreen} options={horizontalAnimation} />
            <Stack.Screen name={Routes.Profile} component={ProfileScreen} options={horizontalAnimation} />
            <Stack.Screen name={Routes.ResetPassword} component={ResetPasswordScreen} options={horizontalAnimation} />
            <Stack.Screen name={Routes.AddExpense} component={AddExpenseScreen} options={horizontalAnimation} />
            <Stack.Screen name={Routes.DueAppointment} component={DueAppointmentScreen} options={horizontalAnimation} />
            <Stack.Screen name={Routes.Leave} component={LeaveScreen} options={horizontalAnimation} />
            <Stack.Screen name={Routes.AddLeave} component={AddLeaveScreen} options={horizontalAnimation} />
            <Stack.Screen name={Routes.ApproveLeave} component={ApproveLeaveScreen} options={horizontalAnimation} />
            <Stack.Screen name={Routes.HeadQuarterChange} component={HeadQuarterChangeScreen} options={horizontalAnimation} />
            <Stack.Screen name={Routes.ApproveAttendance} component={ApproveAttendanceScreen} options={horizontalAnimation} />
            <Stack.Screen name={Routes.EditProfile} component={EditProfileScreen} options={horizontalAnimation} />
            <Stack.Screen name={Routes.Images} component={ImagesScreen} options={horizontalAnimation} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );

  return loadNavigator && navigator;
};
