import React, { useMemo, useState } from 'react';
import { Box, Pressable, Text } from '@/component';
import { DeviceHelper } from '@/helper';
import {ResponsiveValue} from '@shopify/restyle';
import {Theme} from '@/style';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

export interface TimePickerProps {
  label: string;
  placeholder?: string;
  isLabelShow?: boolean;
  handleDateChange:(date?: Date) => void;
  selectedDate:string
}

export const TimePicker:React.FC<TimePickerProps> = ({
   label,
   placeholder,
   isLabelShow = true,
   selectedDate,
   handleDateChange,
}:TimePickerProps)=>{
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateValue, setSelectedDateValue] = useState(selectedDate);

  useMemo(() => {
    setSelectedDateValue(selectedDate);
  }, [selectedDate]);
  

  const borderColor = ():ResponsiveValue<keyof Theme['colors'], Theme['breakpoints']> => {
    if (selectedDate) {
      return 'header';
    }
    return 'gray';
  };
  const showDatePicker = () => {  
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date:any) => {
    handleDateChange(date)
    hideDatePicker();
  };

  return (
    <Box marginBottom={'s'}>
      <Box>
        {isLabelShow && (
          <Text variant={'medium14'} marginTop={'ssr'}>
            {label}
          </Text>
        )}
        <Pressable
          backgroundColor={'white'}
          justifyContent={'center'}
          marginTop={'s'}
          borderColor={borderColor()}
          borderWidth={1.5}
          height={DeviceHelper.isIos() ? 48 : 48}
          borderRadius={DeviceHelper.calculateWidthRatio(10)}
          onPress={() =>{
            showDatePicker()
          }}>
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            padding={'ssr'}>
            <Text
              variant={'semiBold16'}
              color={selectedDateValue ? 'dark' : 'dark'}>
              {selectedDateValue === '' ? placeholder : moment(selectedDateValue).format('hh:mm A')}
            </Text>
            {/*<SvgIcon*/}
            {/*	name={'date'}*/}
            {/*	height={DeviceHelper.calculateWidthRatio(16)}*/}
            {/*	width={DeviceHelper.calculateWidthRatio(16)}*/}
            {/*	pressableProps={{ style:{ paddingEnd: 8 } }}*/}
            {/*	fill={'white'}*/}
            {/*/>*/}
          </Box>
        </Pressable>
      </Box>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={'time'}
        is24Hour={false}
        date={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Box>
  );
};
