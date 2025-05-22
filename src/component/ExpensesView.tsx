import React from 'react';
import {Box} from "@/component/Box";
import {Pressable} from "@/component/Pressable";
import {DeviceHelper} from "@/helper";
import {Text} from "@/component/Text";
import {fonts} from "@/style";
import {Image} from "@/component/Image";
import {Images} from "@/assets";
import {CollapsableContainer} from "@/component/CollapsableContainer";
import {totalAmountData} from "@/screens";

export interface ExpensesViewProps{
    onPress: () => void;
    isVisibleAmounts:boolean
    billingAmount:totalAmountData
}


export const ExpensesView:React.FC<ExpensesViewProps> =({
   onPress,
   isVisibleAmounts,
   billingAmount
}:ExpensesViewProps) =>{
    return(
        <Box>
            <Pressable
                onPress={onPress}
                flexDirection={'row'}
                borderTopWidth={1}
                borderStyle={'dashed'}
                width={'100%'}
                backgroundColor={'white'}
                paddingBottom={'r'}
                borderTopColor={'gray'}
                paddingTop={'s'}
            >
                <Box
                    height={DeviceHelper.calculateWidthRatio(50)}
                    width={DeviceHelper.calculateWidthRatio(50)}
                    borderRadius={DeviceHelper.calculateWidthRatio(25)}
                    backgroundColor={'primary'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Text
                        fontSize={26}
                        color={'white'}
                    >
                        {'₹'}
                    </Text>
                </Box>

                <Box
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    width={'86%'}>
                    <Box>
                        <Text
                            fontSize={16}
                            color={'black'}
                            marginLeft={'r'}
                            fontFamily={fonts.bold}
                        >
                            {'Net Amount'}
                        </Text>
                        <Text
                            fontSize={16}
                            color={'black'}
                            marginLeft={'r'}
                            fontFamily={fonts.semiBold}
                        >
                            {billingAmount.netAmounts.toFixed(2)}
                        </Text>
                    </Box>

                    <Image
                        source={Images.downArrow}
                        width={DeviceHelper.calculateWidthRatio(20)}
                        height={DeviceHelper.calculateWidthRatio(20)}
                        resizeMode={'contain'}
                        marginTop={'s'}
                        marginLeft={'r'}
                        tintColor={'black'}
                    />
                </Box>
            </Pressable>
            <CollapsableContainer expanded={isVisibleAmounts}>
                <Box flexDirection={'row'} justifyContent={'space-between'} width={'100%'}>
                    <Text
                        color={'darkGray'}
                        fontSize={16}
                        fontFamily={fonts.medium}
                    >
                        {'Sub Total'}
                    </Text>
                    <Text
                        color={'darkGray'}
                        fontSize={16}
                        fontFamily={fonts.medium}
                    >
                        {billingAmount.subTotal.toFixed(2)}
                    </Text>
                </Box>
                <Box flexDirection={'row'} justifyContent={'space-between'} width={'100%'} marginTop={'ss'} >
                    <Text
                        color={'darkGray'}
                        fontSize={16}
                        fontFamily={fonts.medium}
                    >
                        {'Discount'}
                    </Text>
                    <Text
                        color={'darkGray'}
                        fontSize={16}
                        fontFamily={fonts.medium}
                    >
                        {billingAmount.discount.toFixed(2)}
                    </Text>
                </Box >
                <Box flexDirection={'row'} justifyContent={'space-between'} width={'100%'} marginTop={'ss'}>
                    <Text
                        color={'darkGray'}
                        fontSize={16}
                        fontFamily={fonts.medium}
                    >
                        {'Additional Discount'}
                    </Text>
                    <Text
                        color={'darkGray'}
                        fontSize={16}
                        fontFamily={fonts.medium}
                    >
                        {billingAmount.additionalDiscount.toFixed(2)}
                    </Text>
                </Box>
                <Box flexDirection={'row'} justifyContent={'space-between'} width={'100%'} marginTop={'ss'}>
                    <Text
                        color={'darkGray'}
                        fontSize={16}
                        fontFamily={fonts.medium}
                    >
                        {'Taxable Amount'}
                    </Text>
                    <Text
                        color={'darkGray'}
                        fontSize={16}
                        fontFamily={fonts.medium}
                    >
                        {billingAmount.taxable.toFixed(2)}
                    </Text>
                </Box>
                <Box flexDirection={'row'} justifyContent={'space-between'} width={'100%'} marginTop={'ss'}>
                    <Text
                        color={'darkGray'}
                        fontSize={16}
                        fontFamily={fonts.medium}
                    >
                        {'GST'}
                    </Text>
                    <Text
                        color={'darkGray'}
                        fontSize={16}
                        fontFamily={fonts.medium}
                    >
                        {billingAmount.gst.toFixed(2)}
                    </Text>
                </Box>
                <Box flexDirection={'row'} justifyContent={'space-between'} width={'100%'} marginTop={'ss'} marginBottom={'s'}>
                    <Text
                        color={'black'}
                        fontSize={18}
                        fontFamily={fonts.medium}
                    >
                        {'Net Amount'}
                    </Text>
                    <Text
                        color={'black'}
                        fontSize={18}
                        fontFamily={fonts.medium}
                    >
                        {billingAmount.netAmounts.toFixed(2)}
                    </Text>
                </Box>
            </CollapsableContainer>
        </Box>
    )
}
