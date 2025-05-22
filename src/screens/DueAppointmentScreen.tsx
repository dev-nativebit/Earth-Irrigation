import React, {useEffect, useMemo} from 'react';
import {Box, Screen, ScreenHeader, StatusBarType, Text} from "@/component";
import {FlatList} from "react-native";
import {fonts} from "@/style";
import moment from "moment/moment";
import {SvgIcon} from "@/assets/SvgIcon";
import {DeviceHelper} from "@/helper";
import {AppointmentDataModel} from "@/model";
import {actions, RootState, useAppSelector} from "@/redux/root.store";
import {GetAppointmentsApiParams} from "@/api";
import {goBack} from "@/navigation/AppNavigation";
import {AppointmentDataDto} from "@/dtos";

export const DueAppointmentScreen:React.FC = () =>{
    const appointmentListResult = useAppSelector((state:RootState) => state.leadDetail.getAppointmentList);
    const toDayDate = moment(new Date()).format('YYYY-MM-DD')
    const appointmentApiCall = async (status:string) =>{
        const params: GetAppointmentsApiParams ={
            list_type: "M",
            ref_date: toDayDate,
            status:status
        }
        await actions.getAppointmentListThunkCallActions(params)
    }

    useEffect(() => {
        appointmentApiCall('2');
    }, []);

    const appointmentData = useMemo(() => {
        if (appointmentListResult?.isSuccess){
            return appointmentListResult.getValue()
        }
        return new AppointmentDataModel({} as AppointmentDataDto)
    }, [appointmentListResult]);


    return(
        <Screen backgroundColor={'white'} statusBarType={StatusBarType.Light}>
            <Box flex={1}>
                <ScreenHeader
                    title={'Due Appointment'}
                    onBackPress={async () =>{
                        await appointmentApiCall('0')
                        goBack()
                    }}
                />
                    <FlatList
                        data={appointmentData.appointmentList.items}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => (
                            <Box
                                backgroundColor={'white'}
                                height={80}
                                marginTop={'r'}
                                elevation={1}
                                flexDirection={'row'}
                                marginHorizontal={'r'}>
                                <Box height={80} width={2.5} backgroundColor={'primary'} />
                                <Box flexDirection={'row'} marginStart={'s'}>
                                    <Box justifyContent={'center'}>
                                        <Text
                                            fontSize={22}
                                            paddingHorizontal={'sr'}
                                            fontFamily={fonts.bold}
                                            color={'black'}>
                                            {moment(item.ref_date).format('DD')}
                                        </Text>
                                        <Text
                                            fontSize={16}
                                            paddingHorizontal={'sr'}
                                            fontFamily={fonts.semiBold}
                                            color={'gray'}>
                                            {moment(item.ref_date).format('MMM')}
                                        </Text>
                                    </Box>
                                    <Box
                                        height={60}
                                        width={2}
                                        alignSelf={'center'}
                                        backgroundColor={'gray2'}
                                    />
                                    <Box justifyContent={'center'} paddingStart={'s'}>
                                        <Text
                                            fontSize={18}
                                            paddingHorizontal={'sr'}
                                            fontFamily={fonts.semiBold}
                                            color={'black'}>
                                            {item.notes}
                                        </Text>
                                        <Text
                                            fontSize={14}
                                            paddingHorizontal={'sr'}
                                            paddingTop={'ss'}
                                            fontFamily={fonts.regular}
                                            color={'gray'}>
                                            {`${item.mode} | ${item.remark}`}
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                        onEndReachedThreshold={0.1}
                        ListEmptyComponent={
                            <SvgIcon
                                name={'noData'}
                                height={DeviceHelper.calculateWidthRatio(300)}
                                width={DeviceHelper.calculateWidthRatio(200)}
                                pressableProps={{
                                    style: {
                                        marginTop:150,
                                        height: '100%',
                                    },
                                }}
                            />
                        }
                        ListFooterComponent={
                            <Box height={DeviceHelper.calculateHeightRatio(40)} />
                        }
                    />
            </Box>
        </Screen>
    )
}
