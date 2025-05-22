import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Pressable } from './Pressable';
import { fonts, Theme } from '@/style';
import { Text } from './Text';
import { DeviceHelper } from '@/helper/DeviceHelper';
import { ResponsiveValue } from '@shopify/restyle';

export interface ButtonProps {
	label: string;
	onPress?: () => void;
	disabled?: boolean;
	isLoading?: boolean;
	marginHorizontal?: keyof Theme['spacing'];
	fontSize?: number
	height?:number,
	fontFamily?: ResponsiveValue<string | undefined, { phone: number, tablet: number }>
	backgroundColor?: ResponsiveValue<keyof Theme['colors'], Theme['breakpoints']>
}
export const Button: React.FC<ButtonProps> = ({
	label,
	onPress,
	disabled = false,
	isLoading,
	fontFamily = fonts.bold,
	fontSize = 18,
	height = 55,
	backgroundColor = 'primary',
}: ButtonProps) => {
	const isShowLoader = (): boolean => !!isLoading;
	return (
			<Pressable
				onPress={onPress}
				// disabled={isDisabled}
				// marginHorizontal={marginHorizontal ?? 'r'}
				shadowOffset={{ width: 0, height: 1 }}
				shadowOpacity={0.3}
				shadowRadius={2}
				borderRadius={10}
				paddingHorizontal={'r'}
				justifyContent="center"
				disabled={disabled}
				backgroundColor={backgroundColor}
				width="100%"
				height={DeviceHelper.calculateHeightRatio(height)}
			>
				{isShowLoader() ? (
					<ActivityIndicator size="small" color="white" />
				) : (
					<Text
						color={'white'}
						fontSize={fontSize}
						textAlign="center"
						lineHeight={22}
						fontFamily={fontFamily}
					>
						{label}
					</Text>
				)}
			</Pressable>
	);
};
