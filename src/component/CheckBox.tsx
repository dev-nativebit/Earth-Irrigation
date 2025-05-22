import React from 'react';
import { Box } from './Box';
import { Pressable } from './Pressable';
import { DeviceHelper } from '@/helper/DeviceHelper';
import { fonts, Theme } from '@/style';
import { Text } from './Text';
import { ResponsiveValue } from '@shopify/restyle';

export interface CheckBoxProps {
	label: string;
	onSelected: () => void;
	isSelect: boolean;
	onPressLabel2?: () => void;
	marginTop?: ResponsiveValue<keyof Theme['spacing'], Theme['breakpoints']>
}
export const CheckBox: React.FC<CheckBoxProps> = ({
	label,
	onSelected,
	isSelect,
	marginTop = 'r',
}: CheckBoxProps) => {
	return (
		<Pressable
			onPress={onSelected}
			flexDirection={'row'}
			marginTop={marginTop}
			alignItems={'center'}
			flexWrap={'wrap'}>
			<Box
				width={DeviceHelper.calculateWidthRatio(28)}
				height={DeviceHelper.calculateWidthRatio(28)}
				borderRadius={15}
				backgroundColor={'black'}
				borderColor={'cadetGray'}
				alignItems={'center'}
				justifyContent={'center'}
				borderWidth={1.5}>
				{isSelect && (
					<Box
						width={DeviceHelper.calculateWidthRatio(14)}
						height={DeviceHelper.calculateWidthRatio(14)}
						backgroundColor={'cadetGray'}
						borderRadius={DeviceHelper.calculateWidthRatio(7)}
					/>
				)}
			</Box>
			<Box alignItems={'center'}>
				<Text
					marginStart={'s'}
					color={isSelect ? 'cadetGray' : 'gray'}
					fontFamily={fonts.regular}
					opacity={isSelect ? 1 : 0.6}
					fontSize={14}>
					{label}
				</Text>
			</Box>
		</Pressable>
	);
};
