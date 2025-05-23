import React, {useEffect, useMemo, useState} from 'react';
import {
  AttendanceBottomSheet,
  Box,
  Button,
  hideFullScreenProgress,
  Pressable,
  Screen,
  ScreenHeader,
  showFullScreenProgress,
  StatusBarType,
  Text,
} from '@/component';
import {SvgIcon} from '@/assets/SvgIcon';
import {Asset, launchCamera} from 'react-native-image-picker';
import {AttendanceApiParams, GetAttendanceListApiParams} from '@/api';
import {actions, RootState, useAppSelector} from '@/redux/root.store';
import {goBack} from '@/navigation/AppNavigation';
import {AttendanceList, MenuModel, MenuPositionModel} from '@/model';
import {MenuDto, MenuPositionDto} from '@/dtos';
import {showErrorMessage} from '@/core';
import Geolocation from '@react-native-community/geolocation';
import {utils} from '@/utils/Utils';
import {DeviceHelper} from '@/helper';
import {FlatList} from 'react-native';
import {fonts, Theme} from '@/style';
import moment from 'moment';
import {useTheme} from '@shopify/restyle';
import FastImage from 'react-native-fast-image';

export const AttendanceScreen: React.FC = () => {
  const [isVisibleBottomSheet, setIsVisibleBottomSheet] = useState(false);
  const [fileName, setFileName] = useState('');
  const [afterImages, setAfterImages] = useState<Asset[]>([]);
  const userPermissionResult = useAppSelector((state:RootState) => state.userDetail.userPermissionResult);
  const attendanceListResult = useAppSelector((state:RootState) => state.userDetail.attendanceList);
  const {colors} = useTheme<Theme>()


  const getAttendanceListApiCall = async () =>{
    const params:GetAttendanceListApiParams ={
      length:'65',
      search:'',
      start:'0',
      self_punch:'1'
    }
    await actions.getAttendanceListThunkCallActions(params)
  }

  useEffect(() => {
    getAttendanceListApiCall()
  }, []);

  const attendanceList = useMemo(() => {
    if (attendanceListResult?.isSuccess){
      return attendanceListResult.getValue()
    }
    return new AttendanceList()
  }, [attendanceListResult]);

  const toDayPunch = useMemo(() => {
    const toDayData =  moment(new Date()).format('DD-MM-YYYY')
    return attendanceList.items.filter(item => item.punch_date.slice(0,10) === toDayData).length
  }, [attendanceList]);


  const handelOnCamaraPress = async () =>{
    const response = await launchCamera({
      mediaType: 'photo',
      cameraType:'front',
      quality:0.2,
    })
    if (response.assets){
      console.log(response.assets)
      setAfterImages(response.assets)
      setFileName(response.assets[0]?.fileName ?? '')

    }
  }

  const handelOnSavaCall = () =>{
    setIsVisibleBottomSheet(false);


    Geolocation.getCurrentPosition(async position => {
          const params:AttendanceApiParams = {
            type:'',
            id:'0',
            s_lat:position.coords.latitude.toString(),
            s_lon:position.coords.longitude.toString()
          }
          let formData = new FormData();

          if (afterImages.length > 0) {
            formData.append('img_file', {
              // @ts-ignore
              uri: afterImages[0]?.uri,
              name: afterImages[0]?.fileName,
              type: afterImages[0]?.type ?? '',
            })
          } else {
            showErrorMessage('Not image selected.');
            return;
          }
      showFullScreenProgress()
      actions.attendanceThunkCallActions(params,formData).then(async response =>{
        if (response.isSuccess){
          await getAttendanceListApiCall()
          goBack()
        }
        hideFullScreenProgress()
      })
    },
    async error => {
      hideFullScreenProgress()
      showErrorMessage(error.message)
      await utils.handleEnabledPressed()
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

  const buttonLabel = () =>{
    const parchData = attendanceList.items[0]?.punch_date.split(" ")[0]
    const todayDate = moment(new Date()).format('DD-MM-YYYY')
    if (attendanceList.items.length > 0 && parchData === todayDate){
      if (attendanceList.items[0].type.toUpperCase() === 'IN'){
        return 'OUT'
      }else {
        return 'IN'
      }
    }else {
      return 'IN'
    }
  }


  return (
    <Screen backgroundColor={'white'} statusBarType={StatusBarType.Light}>
      <Box flex={1}>
        <ScreenHeader title={'Attendance'} />

        <FlatList
            data={attendanceList.items}
            onMomentumScrollBegin={() => {}}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item,index }) => {
              const currentDate = item.punch_date.split(" ")[0]; // Extract the date part
              const nextDate =
                  index < attendanceList.items.length - 1 ? attendanceList.items[index + 1].punch_date.split(" ")[0] : null;
              const isLastOfGroup = currentDate !== nextDate
              return(
              <Pressable
                    onPress={() =>{}}
                    backgroundColor={'white'}
                    paddingVertical={'e6'}
                    marginTop={'s'}
                >
                  <Box marginHorizontal={'srr'} flexDirection={'row'} >
                    <Box flex={0.16}>
                      <Pressable
                          onPress={() =>{}}
                          height={DeviceHelper.calculateHeightRatio(40)}
                          width={DeviceHelper.calculateHeightRatio(40)}
                          borderRadius={26}
                          marginTop={'s'}
                          justifyContent={'center'}
                          alignItems={'center'}
                          backgroundColor={'white'}>
                        <FastImage
                            style={{
                              width: DeviceHelper.calculateWidthRatio(44),
                              height: DeviceHelper.calculateWidthRatio(44),
                              borderRadius:DeviceHelper.calculateWidthRatio(44) }}
                            source={{
                              uri: item.img_file_path,
                              priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                      </Pressable>
                    </Box>

                    <Box  flex={0.84} justifyContent={'center'}>
                      <Box  flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Text
                            color={'golden'}
                            fontSize={18}
                            fontFamily={fonts.semiBold}
                        >
                          {item.punch_date}
                        </Text>
                        <Text
                            color={'golden'}
                            fontSize={18}
                            fontFamily={fonts.semiBold}
                            paddingEnd={'s'}
                        >
                          {item.type.toUpperCase()}
                        </Text>
                      </Box>
                      <Box  flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Text
                            color={'black'}
                            fontSize={14}
                            fontFamily={fonts.medium}
                            style={{
                              textDecorationLine:item.distance > 1 ? 'line-through' : 'none',
                            }}
                        >
                          {item.hq_name}
                        </Text>

                      </Box>
                      {
                        item.loc_add && (
                          <Text
                            color={'black'}
                            fontSize={14}
                            fontFamily={fonts.regular}
                            paddingEnd={'s'}
                            numberOfLines={2}
                          >
                            {item.loc_add}
                          </Text>
                        )
                      }

                    </Box>
                  </Box>
                {
                    isLastOfGroup && (index + 1) < attendanceList.items.length && (
                        <Box
                            backgroundColor={'gray2'}
                            height={1.5}
                            marginTop={'srr'}
                        />
                    )
                }
              </Pressable>
            )}}
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
                </Box>
            )}
        />

        <Box
            marginHorizontal={'r'}
            position={'absolute'}
            bottom={10}
            backgroundColor={'white'}
            width={'93%'}
        >
          {
            permissions?.isWrite === '1' && toDayPunch < 2 && (
                  <Button
                      label={'Attendance'}
                      onPress={async () =>{
                        await utils.handleEnabledPressed()
                        setIsVisibleBottomSheet(true)
                      }}
                  />
            )
          }

        </Box>

        <AttendanceBottomSheet
          isVisible={isVisibleBottomSheet}
          fileName={fileName}
          onClose={() =>{setIsVisibleBottomSheet(false)}}
          onAddPress={handelOnSavaCall}
          onChooseFilePress={handelOnCamaraPress}
        />
      </Box>
    </Screen>
  );
};
