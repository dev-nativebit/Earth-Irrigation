import React, {useMemo} from 'react';
import {Box, ImageSlider, Pressable, Text} from '@/component';
import {DeviceHelper} from '@/helper';
import {SvgIcon} from '@/assets/SvgIcon';
import {fonts, Theme} from '@/style';
import {actions, RootState, useAppSelector} from '@/redux/root.store';
import {DashboardModel} from '@/model';
import {DashboardDto} from '@/dtos';
import {RefreshControl, ScrollView} from 'react-native';
import {useTheme} from "@shopify/restyle";


export const Home:React.FC = () =>{
  const {colors} = useTheme<Theme>()
  const dashboardResult = useAppSelector((state:RootState) => state.loginDetail.dashboardResult);
  const [refreshing, setRefreshing] = React.useState(false);
  const dashboardDetail = useMemo(() => {
    if (dashboardResult?.isSuccess){
      return dashboardResult.getValue()
    }
    return new DashboardModel({} as DashboardDto)
  }, [dashboardResult]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await actions.dashboardThunkCallActions()
    await actions.userPermissionThunkCallActions()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  return (
    <Box flex={1} backgroundColor={'white'} flexDirection={'column'}>
      <ScrollView
          refreshControl={
          <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={colors.primary}
              colors={[colors.white]}
              progressViewOffset={40}
          />
        }
      >
      <ImageSlider images={dashboardDetail.baners}/>
      <Box
          marginHorizontal={'r'}
          backgroundColor={'white'}
          borderRadius={10}
          paddingVertical={'m'}
          marginBottom={'s'}
          paddingHorizontal={'sr'}
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
      >
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Pressable
              onPress={async () => {
              }}
              paddingVertical={'r'}
              width={'47%'}
              backgroundColor={'secondaryColor'}
              borderRadius={10}
              borderWidth={1}
              borderColor={'gray2'}
              alignItems={'center'}
          >
            <Box
                height={DeviceHelper.calculateWidthRatio(65)}
                width={DeviceHelper.calculateWidthRatio(65)}
                backgroundColor={'green2'}
                borderRadius={12}
                alignItems={'center'}
                justifyContent={'center'}
            >
              <SvgIcon
                  name={'lead'}
                  fill={'white'}
                  height={DeviceHelper.calculateWidthRatio(40)}
                  width={DeviceHelper.calculateWidthRatio(40)}
              />
            </Box>

            <Text
                textAlign={'center'}
                fontSize={15}
                fontFamily={fonts.medium}
                color={'dark2'}
                paddingVertical={'sr'}
            >
              {'Attendance'}
            </Text>
            <Text
                textAlign={'center'}
                fontSize={18}
                fontFamily={fonts.bold}
                color={'dark2'}
            >
              {dashboardDetail.present}
            </Text>
          </Pressable>
          <Pressable
              onPress={async () => {
              }}
              paddingVertical={'r'}
              width={'47%'}
              backgroundColor={'lightPink'}
              borderRadius={10}
              borderWidth={1}
              borderColor={'gray2'}
              alignItems={'center'}
          >
            <Box
                height={DeviceHelper.calculateWidthRatio(65)}
                width={DeviceHelper.calculateWidthRatio(65)}
                backgroundColor={'pink'}
                borderRadius={12}
                alignItems={'center'}
                justifyContent={'center'}
            >
              <SvgIcon
                  name={'visit'}
                  fill={'white'}
                  height={DeviceHelper.calculateWidthRatio(35)}
                  width={DeviceHelper.calculateWidthRatio(35)}
              />
            </Box>

            <Text
                textAlign={'center'}
                fontSize={15}
                fontFamily={fonts.medium}
                color={'dark2'}
                paddingVertical={'sr'}
            >
              {'Visits'}
            </Text>
            <Text
                textAlign={'center'}
                fontSize={18}
                fontFamily={fonts.bold}
                color={'dark2'}
            >
              {dashboardDetail.visits}
            </Text>
          </Pressable>
        </Box>
        <Box
            flexDirection={'row'}
            justifyContent={'space-between'}
            marginTop={'r'}
        >
          <Pressable
              onPress={() => {
              }}
              paddingVertical={'r'}
              width={'47%'}
              backgroundColor={'lightBlue'}
              borderRadius={10}
              borderWidth={1}
              borderColor={'gray2'}
              alignItems={'center'}
          >
            <Box
                height={DeviceHelper.calculateWidthRatio(65)}
                width={DeviceHelper.calculateWidthRatio(65)}
                backgroundColor={'blue2'}
                borderRadius={12}
                alignItems={'center'}
                justifyContent={'center'}
            >
              <SvgIcon
                  name={'expense'}
                  fill={'white'}
                  height={DeviceHelper.calculateWidthRatio(40)}
                  width={DeviceHelper.calculateWidthRatio(40)}
              />
            </Box>

            <Text
                textAlign={'center'}
                fontSize={15}
                fontFamily={fonts.medium}
                color={'dark2'}
                paddingVertical={'sr'}
            >
              {'Approved Expense'}
            </Text>
            <Text
                textAlign={'center'}
                fontSize={18}
                fontFamily={fonts.bold}
                color={'dark2'}
            >
              {dashboardDetail.approved_Expense}
            </Text>
          </Pressable>
          <Pressable
              onPress={() => {
              }}
              paddingVertical={'r'}
              width={'47%'}
              backgroundColor={'lightOrange'}
              borderRadius={10}
              borderWidth={1}
              borderColor={'gray2'}
              alignItems={'center'}
          >
            <Box
                height={DeviceHelper.calculateWidthRatio(65)}
                width={DeviceHelper.calculateWidthRatio(65)}
                backgroundColor={'yellow'}
                borderRadius={12}
                alignItems={'center'}
                justifyContent={'center'}
            >
              <SvgIcon
                  name={'expense'}
                  fill={'white'}
                  height={DeviceHelper.calculateWidthRatio(40)}
                  width={DeviceHelper.calculateWidthRatio(40)}
              />
            </Box>

            <Text
                textAlign={'center'}
                fontSize={15}
                fontFamily={fonts.medium}
                color={'dark2'}
                paddingVertical={'sr'}
            >
              {'Unapproved Expense'}
            </Text>
            <Text
                textAlign={'center'}
                fontSize={18}
                fontFamily={fonts.bold}
                color={'dark2'}
            >
              {dashboardDetail.unapproved_Expense}
            </Text>
          </Pressable>
        </Box>
      </Box>
      </ScrollView>
    </Box>
  )
}
