import React from 'react';
import {Box, DropDownMenu, Image, Text} from "@/component";
import {DeviceHelper} from "@/helper";
import {Images} from "@/assets";
import {fonts} from "@/style";
import {LeaveListModel} from "@/model";

export interface LeaveCardProps{
    item:LeaveListModel
    isBordered:boolean
    isShowMenu?:boolean
    onMenuPress?:(key:string)=>void
}

export const LeaveCard:React.FC<LeaveCardProps> =({item,isBordered,isShowMenu= false,onMenuPress}:LeaveCardProps) =>{

    const handelOnMenuPress =(key:string) =>{
        if(onMenuPress){
            onMenuPress(key)
        }
    }

    return (
        <Box marginTop={'sr'}>
            <Box
                flexDirection={'row'}
                paddingBottom={'es'}
                marginHorizontal={'sr'}
            >
                <Box flex={0.2} alignItems={'center'}>
                    <Box
                        height={DeviceHelper.calculateWidthRatio(45)}
                        width={DeviceHelper.calculateWidthRatio(45)}
                        marginTop={'ss'}
                        borderRadius={DeviceHelper.calculateWidthRatio(25)}
                        backgroundColor={'primary'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Image
                            source={Images.userFill}
                            height={DeviceHelper.calculateWidthRatio(20)}
                            width={DeviceHelper.calculateWidthRatio(20)}
                            tintColor={'white'}
                        />
                    </Box>
                </Box>
                <Box flex={0.8}>
                    <Text
                        fontFamily={fonts.semiBold}
                        fontSize={16}
                        color={'dark2'}
                    >
                        {`[${item.emp_code}] ${item.emp_name}`}
                    </Text>
                    <Text
                        fontFamily={fonts.medium}
                        fontSize={14}
                        color={'gray'}
                        paddingTop={'s'}
                    >
                        {`${item.start_date} to ${item.end_date}`}
                    </Text>
                    <Text
                        fontFamily={fonts.medium}
                        fontSize={14}
                        color={'gray'}
                        paddingTop={'ss'}
                    >
                        {`${item.total_days} ${parseInt(item.total_days) > 1 ?'Days' : 'Day'}`}
                    </Text>
                    <Text
                        fontFamily={fonts.regular}
                        fontSize={14}
                        color={'gray'}
                        paddingTop={'ss'}
                    >
                        {item.leave_reason}
                    </Text>
                </Box>
            </Box>
            {
                isShowMenu && (
                    <Box position={'absolute'} right={10} top={3}>
                        <DropDownMenu
                            onSelect={handelOnMenuPress}
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
                )
            }
            {
                isBordered && (
                    <Box
                        backgroundColor={'gray2'}
                        height={1}
                        marginTop={'s'}
                    />
                )
            }
        </Box>
    );
}
