import React, {useState} from 'react';
import {Box, Image, Pressable, Text} from '@/component';
import {Images} from '@/assets';
import {DeviceHelper} from '@/helper';
import {GetVisitListModel} from '@/model';
import moment from 'moment/moment';

export interface VisitCardProps {
item:GetVisitListModel
onEndPress?:()=>void;
}

export const VisitCard:React.FC<VisitCardProps> = ({item,onEndPress}:VisitCardProps) =>{
  return (
    <Box
      backgroundColor={'white'}
      paddingVertical={'s'}
      marginTop={'srr'}
      marginHorizontal={'srr'}
      borderRadius={10}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
    >
      <Box
        flexDirection={'row'}
        marginHorizontal={'s'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Text
          variant={'bold16'}
          style={{
            flex:1,
            marginEnd:10,
          }}
        >
          {item.party_name}
        </Text>
        {
          item.end_at ? (
            <Box
              backgroundColor={'gray3'}
              borderRadius={20}
            >
              <Text
                variant={'semiBold14'}
                paddingVertical={'s'}
                paddingHorizontal={'ssr'}
              >
                {`${item.duration.toFixed(2)} MIN`}
              </Text>
            </Box>
          ):(
            <Pressable
              onPress={onEndPress}
              backgroundColor={'golden2'}
              borderRadius={8}
            >
              <Text
                variant={'semiBold14'}
                paddingVertical={'s'}
                color={'golden'}
                paddingHorizontal={'sr'}
              >
                {'End'}
              </Text>
            </Pressable>
          )
        }

      </Box>

      {/*Dr name*/}
      <Box
        flexDirection={'row'}
        paddingHorizontal={'s'}
        marginTop={'es'}
        alignItems={'center'}
      >
        <Image
          source={Images.person}
          height={DeviceHelper.calculateHeightRatio(22)}
          width={DeviceHelper.calculateHeightRatio(22)}
          resizeMode={'contain'}
        />
        <Text
          variant={'medium14'}
          paddingStart={'ssr'}
          color={'primaryColor1'}
        >
          {item.contact_person}
        </Text>
      </Box>

      <Box
        flexDirection={'row'}
        paddingHorizontal={'s'}
        marginTop={'ssr'}
        alignItems={'center'}
      >
        <Image
          source={Images.clock}
          height={DeviceHelper.calculateHeightRatio(20)}
          width={DeviceHelper.calculateHeightRatio(20)}
          resizeMode={'contain'}
        />
        <Text
          variant={'medium14'}
          paddingStart={'ssr'}
          color={'primaryColor1'}
        >
          {moment(item.start_at).format('DD MMM YYYY hh:mm:ss')}
        </Text>
      </Box>

      <Box
        flexDirection={'row'}
        paddingHorizontal={'s'}
        marginTop={'ssr'}
        alignItems={'center'}
      >
        {/*<Image*/}
        {/*  source={Images.info}*/}
        {/*  height={DeviceHelper.calculateHeightRatio(22)}*/}
        {/*  width={DeviceHelper.calculateHeightRatio(22)}*/}
        {/*  resizeMode={'contain'}*/}
        {/*/>*/}
        <Text
          variant={'medium14'}
          paddingStart={'e6'}
          color={'richBlue'}
        >
          {item.purpose}
        </Text>
      </Box>
      <Text
          variant={'medium14'}
          paddingStart={'r'}
          color={'gray'}
      >
        {item.visit_type}
      </Text>
      {
          item.discussion_points && (
              <Text
                  variant={'medium14'}
                  paddingStart={'r'}
                  color={'gray'}
              >
                {item.discussion_points}
              </Text>
          )
      }
    </Box>
  )
}
