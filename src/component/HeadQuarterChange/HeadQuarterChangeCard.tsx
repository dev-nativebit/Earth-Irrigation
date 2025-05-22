import React from 'react';
import {Box, Image, Text} from "@/component";
import {DeviceHelper} from "@/helper";
import {Images} from "@/assets";
import {fonts} from "@/style";
import {GetRequestModel} from "@/model";

export interface HeadQuarterChangeCardProps{
    item:GetRequestModel
    isBordered:boolean
}

export const HeadQuarterChangeCard:React.FC<HeadQuarterChangeCardProps> = ({item,isBordered}:HeadQuarterChangeCardProps) =>{
    return(
        <Box
            marginTop={'sr'}
        >
            <Box
                flexDirection={'row'}
                paddingBottom={'es'}
                marginHorizontal={'sr'}
            >
                <Box flex={0.15} alignItems={'center'}>
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
                <Box flex={0.85} paddingStart={'s'}>
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
                        paddingTop={'ss'}
                    >
                        {`${item.department_name} - ${item.designation_name}`}
                    </Text>
                    <Text
                        fontFamily={fonts.medium}
                        fontSize={14}
                        color={'gray'}
                        paddingTop={'ss'}
                    >
                        {item.hq_name}
                    </Text>
                    <Text
                        fontFamily={fonts.medium}
                        fontSize={14}
                        color={'gray'}
                        paddingTop={'ss'}
                    >
                        {item.new_hq_name}
                    </Text>
                </Box>
            </Box>
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
    )
}
