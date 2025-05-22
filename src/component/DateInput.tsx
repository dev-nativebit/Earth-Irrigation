import React, { useMemo, useState } from 'react';
import {Box, CalenderBottomSheet, FieldError, FieldErrorProps, Pressable, Text} from '@/component';
import { DeviceHelper } from '@/helper';
import { DateData } from 'react-native-calendars/src/types';
import {ResponsiveValue} from '@shopify/restyle';
import {fonts, Theme} from '@/style';

export interface DateInputProps extends FieldErrorProps {
	label: string;
	placeholder?: string;
	isLabelShow?: boolean;
	handleDateChange:(date: DateData) => void;
	selectedDate:string
	isRequired:boolean
	hasError: boolean;
	isViewOnly?:boolean
}

export const DateInput:React.FC<DateInputProps> = (props:DateInputProps)=>{
	const {
		label,
		placeholder,
		isLabelShow = true,
		selectedDate,
		handleDateChange,
		isRequired,
		hasError,
		isViewOnly =false,
	} = props;
	const fieldErrorProps = props as FieldErrorProps;
	const [isVisibleCalender, setIsVisibleCalender] = useState(false);
	const [selectedDateValue, setSelectedDateValue] = useState(selectedDate);

	useMemo(() => {
		setSelectedDateValue(selectedDate);
	}, [selectedDate]);

	const handleOnClose = () => {
		setIsVisibleCalender(false);
	};

	const borderColor = ():ResponsiveValue<keyof Theme['colors'], Theme['breakpoints']> => {
		if (hasError) {
			return 'red';
		}
		if (selectedDate) {
			return 'header';
		}
		return 'gray';
	};
	return (
		<Box marginBottom={'s'}>
			<Box>
				{isLabelShow && (
					<Text
						fontSize={14}
						fontFamily={fonts.bold}
						lineHeight={16}
						paddingBottom={'e6'}
						marginTop={'s'}
						color={'slateGray'}
						letterSpacing={0.15}
						fontWeight={'500'}
					>
						{label}
						{isRequired && (
							<Text
								color={'red'}
							>
								{'*'}
							</Text>
						)}
					</Text>
				)}
					<Pressable
						justifyContent={'center'}
						borderColor={borderColor()}
						borderWidth={1.5}
						height={DeviceHelper.isIos() ?  48 : 48}
						borderRadius={DeviceHelper.calculateWidthRatio(8)}
						backgroundColor={isViewOnly ? 'grey' : 'white'}
						onPress={()=>{
							if (!isViewOnly){
								setIsVisibleCalender(true);
							}
						}}
					>
						<Box
							flexDirection={'row'}
							alignItems={'center'}
							justifyContent={'space-between'}
							padding={'ssr'}
						>
							<Text
								variant={'semiBold16'}
								color={selectedDateValue ? 'dark' : 'slateGray'}
							>
								{selectedDateValue ===  '' ? placeholder : selectedDateValue}
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
			<Box alignSelf="flex-start">
				<FieldError {...fieldErrorProps} />
			</Box>
			<CalenderBottomSheet
				setDate={() => {
					setIsVisibleCalender(false);
				}}
				handleDateChange={handleDateChange}
				isVisible={isVisibleCalender}
				onClose={handleOnClose}
				selectedDate={selectedDateValue}
				handleOnClen={()=>{
					setSelectedDateValue('');
					setIsVisibleCalender(false);
				}}
				minDate={''}
			/>
		</Box>
	);
};
