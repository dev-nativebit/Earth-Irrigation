import React from  'react';
import { DeviceHelper } from '@/helper';
import { SvgIcon } from '@/assets/SvgIcon';
import { Pressable, Box, Image } from '@/component';
import RNFS from 'react-native-fs';
import { Images } from '@/assets';

export interface ImagePikerProps {
	onPress?:() =>void
	isShowCameraIcon?:boolean
	image:string
}

export const ImagePiker:React.FC<ImagePikerProps> = ({
	image,
	onPress,
	isShowCameraIcon = false,
}:ImagePikerProps) =>{


	return (
		<Box
			style={{
				height:DeviceHelper.calculateWidthRatio(130),
				width:DeviceHelper.calculateWidthRatio(130),
				borderRadius:DeviceHelper.calculateWidthRatio(65),
			}}
		>
				<Pressable
					onPress={onPress}
					height={'100%'}
					width={'100%'}
				>
					<Box
						backgroundColor={'white'}
						height={'100%'}
						width={'100%'}
						alignItems={'center'}
						justifyContent={'center'}
						borderRadius={DeviceHelper.calculateWidthRatio(75)}
					>
						{
							image ? (
								<Image
									height={'100%'}
									width={'100%'}
									borderRadius={DeviceHelper.calculateWidthRatio(75)}
									source={{ uri: image }}
								/>
							) : (
								<Image
									source={{uri:'https://bhumi.nativebittechnologies.in/assets/uploads/emp_profile/user_default.png'}}
									height={DeviceHelper.calculateWidthRatio(130)}
									width={DeviceHelper.calculateWidthRatio(130)}
								/>
							)
						}

					</Box>
				</Pressable>
			{
				isShowCameraIcon && (
					<Pressable
						position={'absolute'}
						right={-6}
						top={DeviceHelper.calculateWidthRatio(80)}
					>
						<Image
							source={Images.capture}
							height={DeviceHelper.calculateWidthRatio(45)}
							width={DeviceHelper.calculateWidthRatio(45)}/>
					</Pressable>
				)
			}
		</Box>
	);
};
