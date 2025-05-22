import React from 'react';
import {Pressable} from '@/component/Pressable';
import {DeviceHelper} from '@/helper';
import {Image} from '@/component/Image';
import {Images} from '@/assets';

export interface FloatingButtonProps {
  onPress: () => void;
  bottom?: number
}

export const FloatingButton:React.FC<FloatingButtonProps> = ({
  onPress,
  bottom = 120
}:FloatingButtonProps) =>{
  return (
    <Pressable
      onPress={onPress}
      position={'absolute'}
      backgroundColor={'primary'}
      height={DeviceHelper.calculateWidthRatio(60)}
      width={DeviceHelper.calculateWidthRatio(60)}
      bottom={DeviceHelper.calculateHeightRatio(bottom)}
      borderRadius={DeviceHelper.calculateWidthRatio(35)}
      right={DeviceHelper.calculateWidthRatio(15)}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Image
        source={Images.add}
        height={DeviceHelper.calculateWidthRatio(28)}
        width={DeviceHelper.calculateWidthRatio(28)}/>
    </Pressable>
  )
}