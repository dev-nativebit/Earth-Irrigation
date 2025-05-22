import React from 'react'
import {Box} from '@/component/Box';
import {SvgIcon} from '@/assets/SvgIcon';
import {DeviceHelper} from '@/helper';
import {DropDownMenu, Image, Pressable, Text, TopTabEnum} from '@/component';
import {fonts, Theme} from '@/style';
import {Images} from '@/assets';
import {useTheme} from "@shopify/restyle";

export interface HeaderProps {
  onDrawerPress: () => void;
  title: string;
  onUserPress?: () => void;
  isShowAttention?: boolean;
  isLead?: boolean;
  leadType:string
  onSelect:(key:string)=>void;
}

export const Header:React.FC<HeaderProps> = ({
  onDrawerPress,
  onUserPress,
  title,
  isShowAttention = false,
  isLead = false,
  onSelect
}:HeaderProps) =>{
  const {colors} = useTheme<Theme>()
  return (
    <Box
      flexDirection={'row'}
      height={DeviceHelper.calculateHeightRatio(60)}
      paddingHorizontal={'r'}
      borderBottomWidth={1}
      justifyContent={'space-between'}
      borderBottomColor={'grey'}
      alignItems={'center'}
      backgroundColor={title === TopTabEnum.Home ? 'white' : 'header'}
    >
      <Box flexDirection={'row'} alignItems={'center'}>

        <SvgIcon
          name={'drawer'}
          height={DeviceHelper.calculateWidthRatio(33)}
          width={DeviceHelper.calculateWidthRatio(33)}
          onPress={onDrawerPress}
          pressableProps={{
            style:{
              zIndex:1
            }
          }}
          fill={'primary'}
        />

        <Text
          color={'primary'}
          fontSize={20}
          fontFamily={fonts.semiBold}
          fontWeight={'800'}
          paddingStart={'s'}
        >
          {title === TopTabEnum.Home ? 'Dashboard' : title}
        </Text>
      </Box>

      {
        isShowAttention && (
          <Pressable
            onPress={onUserPress}
            height={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            width={DeviceHelper.calculateWidthRatio(40)}
          >
            <Image
              source={Images.checkUser}
              height={DeviceHelper.calculateWidthRatio(25)}
              width={DeviceHelper.calculateWidthRatio(25)}
              tintColor={colors.primary}
            />
          </Pressable>
        )
      }
      {
        isLead && (
            <DropDownMenu
                  onSelect={onSelect}
                  items={[
                    {
                      key: '1',
                      title: 'Edit',
                      icon: 'yes.circle',
                      iconAndroid: '',
                    },
                    {
                      key: '2',
                      title: 'Change Password',
                      icon: 'close.circle',
                      iconAndroid: '',
                    }
                  ]}
            />
        )
      }
    </Box>
  )
}
