import React from 'react';
import {Box} from '@/component/Box';
import {DeviceHelper} from '@/helper';
import {SvgIcon} from '@/assets/SvgIcon';
import {Text} from '@/component/Text';
import {fonts, Theme} from '@/style';
import {Pressable} from '@/component/Pressable';
import {Image} from '@/component/Image';
import {Images} from '@/assets';
import {goBack} from '@/navigation/AppNavigation';
import {useTheme} from "@shopify/restyle";
import {ImageSourcePropType} from "react-native";

export interface ScreenHeaderProps {
  onBackPress?: () => void;
  title: string;
  isProfile?:boolean
  isTerms?:boolean
  onResetPassword?: () => void;
  onTermsPress?: () => void;
  onTextPress?: () => void;
  isShowThreeDot?: boolean
  onThreeDotPress?: () => void;
  subTitle?:string
  isAddButton?:boolean,
  onAddPress?:() => void,
  fontSize?:number
  buttonTitle?:string
  source?: ImageSourcePropType
}


export const ScreenHeader:React.FC<ScreenHeaderProps> = ({
  onBackPress,
  title,
  isProfile = false,
  isTerms = false,
  isShowThreeDot = false,
  onResetPassword,
  onTermsPress,
  onTextPress,
  onThreeDotPress,
  subTitle,
  isAddButton,
  onAddPress,
  fontSize = 20,
  buttonTitle = '+ Add',
  source = Images.termsAndConditions,
}:ScreenHeaderProps) =>{
  const {colors} = useTheme<Theme>()
  const handelOnBackPress =() =>{
    if (onBackPress){
      onBackPress();
    }else {
      goBack()
    }

  }

  const handleOnTextPress = () => {
    if (onTextPress){
      onTextPress();
    }
  }

  const handleOnThreeDotPress = () => {
    if (onThreeDotPress){
      onThreeDotPress();
    }
  }

  return(
    <Box>
      <Box
        flexDirection={'row'}
        height={DeviceHelper.calculateHeightRatio(60)}
        borderBottomWidth={1}
        justifyContent={'space-between'}
        borderBottomColor={'grey'}
        alignItems={'center'}
        backgroundColor={'header'}
      >
        <Box flexDirection={'row'} alignItems={'center'}>

          <Pressable
            onPress={handelOnBackPress}
            height={DeviceHelper.calculateHeightRatio(60)}
            justifyContent={'center'}
            alignItems={'center'}
            width={DeviceHelper.calculateWidthRatio(50)}
          >
            <Image
              source={Images.leftArrow}
              height={DeviceHelper.calculateWidthRatio(25)}
              width={DeviceHelper.calculateWidthRatio(25)}
              tintColor={colors.primary}
            />
          </Pressable>

          <Pressable
            onPress={handleOnTextPress}
            paddingVertical={'e6'}
          >
            <Text
                color={'primary'}
                fontSize={fontSize}
                fontFamily={fonts.semiBold}
                fontWeight={'800'}
                paddingStart={'s'}
            >
              {title}
            </Text>
            {
              subTitle && (
                    <Text
                        color={'gray'}
                        fontSize={12}
                        fontFamily={fonts.semiBold}
                        fontWeight={'800'}
                        paddingStart={'s'}
                    >
                      {subTitle}
                    </Text>
                )
            }
          </Pressable>

        </Box>

        {
          isProfile && (
            <Pressable
              onPress={onResetPassword}
              height={'100%'}
              marginEnd={'s'}
              alignItems={'center'}
              justifyContent={'center'}
              width={DeviceHelper.calculateWidthRatio(40)}
            >
              <Image
                source={Images.key}
                height={DeviceHelper.calculateWidthRatio(25)}
                width={DeviceHelper.calculateWidthRatio(25)}
              />
            </Pressable>
          )
        }
        {
          isTerms && (
            <Pressable
              onPress={onTermsPress}
              height={'100%'}
              marginEnd={'s'}
              alignItems={'center'}
              justifyContent={'center'}
              width={DeviceHelper.calculateWidthRatio(40)}
            >
              <Image
                source={source}
                height={DeviceHelper.calculateWidthRatio(25)}
                width={DeviceHelper.calculateWidthRatio(25)}
                tintColor={colors.primary}
              />
            </Pressable>
          )
        }
        {
        isShowThreeDot && (
            <Pressable
              onPress={handleOnThreeDotPress}
              height={'100%'}
              marginEnd={'s'}
              alignItems={'center'}
              justifyContent={'center'}
              width={DeviceHelper.calculateWidthRatio(40)}
            >
              <SvgIcon
                name={'threeDot'}
                height={DeviceHelper.calculateWidthRatio(25)}
                width={DeviceHelper.calculateWidthRatio(25)}
                fill={'primary'}
              />
            </Pressable>
          )
        }
        {
          isAddButton && (
            <Pressable
              onPress={onAddPress}
              height={'100%'}
              marginEnd={'s'}
              alignItems={'center'}
              justifyContent={'center'}
              width={DeviceHelper.calculateWidthRatio(50)}
            >
              <Text
                fontSize={19}
                fontFamily={fonts.semiBold}
                color={'primary'}
              >
                {buttonTitle}
              </Text>
            </Pressable>
          )
        }
      </Box>
    </Box>
  )
}
