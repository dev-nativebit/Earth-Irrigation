import React from 'react';
import {Box, Pressable, Text} from '@/component';
import {DeviceHelper} from '@/helper';
import {SvgIcon} from '@/assets/SvgIcon';
import {GetExpenseListModel} from '@/model';
import {fonts} from "@/style";

export interface ExpenseCardProps{
  item:GetExpenseListModel
  onMenuPress:()=>void

}

export const ExpenseCard:React.FC<ExpenseCardProps> = ({
  item,
  onMenuPress
}:ExpenseCardProps) => {
  return (
    <Box
      backgroundColor={'white'}
      paddingVertical={'s'}
      marginTop={'srr'}
      marginHorizontal={'srr'}
      borderRadius={10}
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
      <Box paddingHorizontal={'s'}>
        <Text variant={'bold16'} paddingStart={'ss'}>
          {item.emp_name}
        </Text>
      </Box>
      <Text
        variant={'bold14'}
        paddingStart={'s'}
        marginTop={'e6'}
        color={'richBlue'}>
        {`${item.exp_number} | ${item.exp_date}`}
      </Text>
        {
            item.notes && (
                <Text
                    fontSize={14}
                    fontFamily={fonts.regular}
                    paddingStart={'s'}
                    marginTop={'es'}
                    color={'black'}>
                    {item.notes}
                </Text>
            )
        }


      <Box paddingHorizontal={'s'} flexDirection={'row'} marginTop={'s'}>
        <Box
          flex={0.58}
          backgroundColor={'lightBlue'}
          alignItems={'center'}
          justifyContent={'center'}
          borderTopLeftRadius={15}
          borderBottomLeftRadius={15}
          borderRightWidth={1}
          borderColor={'grey'}
          elevation={3}>
          <Text variant={'medium12'} paddingVertical={'s'}>
            {`Demand Amount : ${item.demand_amount}`}
          </Text>
        </Box>
        <Box
          flex={0.42}
          alignItems={'center'}
          justifyContent={'center'}
          borderTopRightRadius={15}
          borderBottomRightRadius={15}
          elevation={3}
          backgroundColor={'lightOrange'}>
          <Text variant={'medium12'} paddingVertical={'s'}>
            {`Approved Amount : ${item.amount}`}
          </Text>
        </Box>
      </Box>
                <Pressable
                    onPress={onMenuPress}
                    position={'absolute'}
                    right={DeviceHelper.calculateWidthRatio(8)}
                    top={DeviceHelper.calculateHeightRatio(8)}>
                    <Box
                        style={{
                            height: DeviceHelper.calculateWidthRatio(28),
                            width: DeviceHelper.calculateWidthRatio(28),
                            borderRadius: DeviceHelper.calculateWidthRatio(30),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <SvgIcon
                            name={'threeDot'}
                            height={DeviceHelper.calculateWidthRatio(15)}
                            width={DeviceHelper.calculateWidthRatio(15)}
                        />
                    </Box>
                </Pressable>

    </Box>
  );
}
