import React, {useEffect, useMemo, useState} from 'react';
import {
    Box, DropDownMenu,
    Pressable, ResignBottomSheet,
    Screen,
    ScreenHeader,
    StatusBarType,
    Text
} from "@/component";
import {FlatList} from "react-native";
import {DeviceHelper} from "@/helper";
import {fonts} from "@/style";
import {SvgIcon} from "@/assets/SvgIcon";
import {AttendanceList} from "@/model";
import {ChangeAttendanceStatusApiParams, GetAttendanceListApiParams, LeaveApproveRejectApiParams} from "@/api";
import {actions, RootState, useAppSelector} from "@/redux/root.store";
import FastImage from "react-native-fast-image";
import {customFormGenerator, RejectNotesIDs} from "@/customFormGenerator";
import {useForm} from "react-hook-form";


export const ApproveAttendanceScreen:React.FC = () =>{
    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm();
    const [selectedID, setSelectedID] = useState('')
    const [isVisibleNote, setIsVisibleNote] = useState(false)
    const attendanceListResult = useAppSelector((state:RootState) => state.userDetail.attendanceList);
    const form = useMemo(() => customFormGenerator.generateRejectNotesForm(), []);
    useEffect(() => {
        const params:GetAttendanceListApiParams ={
            length:'65',
            search:'',
            start:'0',
            self_punch:'2'
        }
        actions.getAttendanceListThunkCallActions(params)
    }, []);

    const attendanceList = useMemo(() => {
        if (attendanceListResult?.isSuccess){
            return attendanceListResult.getValue()
        }
        return new AttendanceList()
    }, [attendanceListResult]);

    const handleOnRejectApiCall = async () =>{
        setIsVisibleNote(false)
        const params:ChangeAttendanceStatusApiParams={
            id: selectedID,
            attendance_status: '2',
            notes: getValues()[RejectNotesIDs.notes]

        }
        console.log(params)
        await actions.changeAttendanceStatusThunkCallActions(params)
    }

    const handleOnApproveApiCall = async (id:string) =>{
        const params:ChangeAttendanceStatusApiParams={
            id: selectedID,
            attendance_status: '2',
            notes: getValues()[RejectNotesIDs.notes]

        }
        console.log(params)
        await actions.changeAttendanceStatusThunkCallActions(params)
    }

    const handleOnPressNote = () => {
        handleSubmit(handleOnRejectApiCall)()
    }

    return(
        <Screen backgroundColor={'white'} statusBarType={StatusBarType.Light}>
            <Box flex={1}>
                <ScreenHeader title={'Attendance'} />

                <FlatList
                    data={attendanceList.items}
                    onMomentumScrollBegin={() => {}}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
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
                                    <Box  flexDirection={'row'} alignItems={'center'} >
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
                                            paddingStart={'srr'}
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
                            <Box position={'absolute'} right={10} top={10}>
                                <DropDownMenu
                                    onSelect={async (key) =>{
                                        setSelectedID(item.id)
                                        if (key ==='2'){
                                            setIsVisibleNote(true)
                                        }else {
                                            await handleOnApproveApiCall(item.id)
                                        }}}
                                    items={[
                                        {
                                            key: '1',
                                            title: 'Approve',
                                            icon: 'yes.circle',
                                            iconAndroid: 'ic_yse',
                                        },
                                        {
                                            key: '2',
                                            title: 'Reject',
                                            icon: 'close.circle',
                                            iconAndroid: 'close',
                                        }
                                    ]}
                                />
                            </Box>
                        </Pressable>
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
                        </Box>
                    )}
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
}
