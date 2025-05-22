import React, { useState } from 'react';
import { Box } from '../Box';
import { Text } from '../Text';

import { ResponsiveValue } from '@shopify/restyle';
import { FieldErrorProps, Input, InputProps, Pressable, Image } from '@/component';
import { CustomFormFieldType } from '@/dtos';
import { fonts, Theme } from '@/style';
import { Images } from '@/assets';
import { DeviceHelper } from '@/helper';

export interface AuthInputProps extends InputProps, FieldErrorProps {
	label: string;
	isRequired?: boolean;
	fieldType?: CustomFormFieldType;
	isShowLabel?:boolean;
	labelColor?: ResponsiveValue<keyof  Theme['colors'], Theme['breakpoints']>
	labelFontFamily?: ResponsiveValue<string | undefined, { phone: number, tablet: number }>
	isMarginTop?: boolean
}

export const AuthInput: React.FC<AuthInputProps> = (props: AuthInputProps) => {
	const inputProps = props as InputProps;
	const [isShowPassword, setIsShowPassword] = useState(true);
	const { label, isRequired = false, isShowLabel = false, fieldType, labelFontFamily = fonts.bold, labelColor = 'slateGray',isMarginTop =true } = props as AuthInputProps;
	return (
		<Box>
			{
				isShowLabel && (
					<Text
						fontSize={14}
						fontFamily={labelFontFamily}
						lineHeight={16}
						paddingBottom={'e6'}
						marginTop={isMarginTop ? 's' : 'none'}
						color={labelColor}
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
				)
			}
			<Input
				{...inputProps}
				secureTextEntry={fieldType === CustomFormFieldType.password && isShowPassword}
				rightComponent={
					(fieldType === CustomFormFieldType.password) ? (
						<Pressable
							onPress={() => {
								setIsShowPassword(!isShowPassword);
							}}
							justifyContent="center"
							alignItems="center"
							height={40}
							backgroundColor={'white'}
							width={40}
							marginEnd="ss"
						>
							<Image
								source={
									isShowPassword ? Images.eyeHide : Images.eyeShow
								}
								resizeMode={'contain'}
								width={DeviceHelper.calculateHeightRatio(25)}
								height={DeviceHelper.calculateWidthRatio(25)}
							/>
						</Pressable>
					) : (inputProps.rightComponent)
				}
			/>
		</Box>
	);
};
