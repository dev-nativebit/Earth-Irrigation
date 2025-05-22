import React from 'react';
import { Box, Pressable, Text } from '@/component';
import { fonts } from '@/style';
import {DeviceHelper} from "@/helper/DeviceHelper";

export interface FilterListItemProps {
	title:string
	isSelected:boolean
	onPress: () =>void
}

export const FilterListItem:React.FC<FilterListItemProps> = ({
	title,
	isSelected,
	onPress,
}:FilterListItemProps) =>{
	return (
		<Pressable
			onPress={onPress}
			backgroundColor={isSelected ? 'white' : 'white'}
			borderRadius={10}
			width={'45%'}
			flexDirection={'row'}
			marginHorizontal={'s'}
			marginTop={'sr'}
			paddingVertical={'srr'}
			paddingHorizontal={'s'}
			justifyContent={'center'}
			borderWidth={1}
			borderColor={isSelected ? 'gray' : 'gray'}
		>
			<Text
				fontFamily={fonts.medium}
				fontSize={14}
				fontWeight={'500'}
				lineHeight={16.8}
				color={'dark2'}
				textAlign={'center'}
			>
				{title}
			</Text>
		</Pressable>
	);
};
