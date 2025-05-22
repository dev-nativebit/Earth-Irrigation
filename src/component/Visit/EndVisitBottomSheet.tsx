import React, { forwardRef, useState } from 'react';
import {Box, Button, CustomKeyboardAwareScrollView, Forms, Pressable, Text} from '@/component';
import {DeviceHelper} from '@/helper';
import Modal from 'react-native-modal';
import {CustomFormFieldList} from '@/model';
import {Control, FieldErrors, FieldValues} from 'react-hook-form';
import {UseFormSetValue} from 'react-hook-form/dist/types/form';
import { IWaveformRef, RecorderState, Waveform } from '@simform_solutions/react-native-audio-waveform';

export interface EndVisitBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  fieldArray:CustomFormFieldList
  control:Control<FieldValues>
  errors:FieldErrors<FieldValues>
  setValue?: UseFormSetValue<any>
  onAddVisitPress: () =>void
  onRecorderStateChange:(recorderState: RecorderState) => void
  onPressOut:() =>void
  onLongPress:() =>void
  path:string
}


export const EndVisitBottomSheet= forwardRef<IWaveformRef,EndVisitBottomSheetProps> ((props, ref) =>{
  const {control,errors,fieldArray,isVisible,onAddVisitPress,onClose,setValue} = props

  return (
    <Modal
      testID="modal"
      isVisible={isVisible}
      onModalHide={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      statusBarTranslucent={true}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
    >
      <Box flex={1}>
        <Pressable onPress={onClose} flex={0.64} />
        <Box
          flex={0.36}
          backgroundColor={'white'}
          borderTopLeftRadius={15}
          borderTopRightRadius={15}
        >
          <Box
            height={5}
            width={30}
            backgroundColor={'gray4'}
            marginTop={'s'}
            alignSelf={'center'}
            borderRadius={10}
          />
          <CustomKeyboardAwareScrollView >
            <Box
              marginTop={'m'}
              paddingBottom={DeviceHelper.ios() ? 'lll' : 'lll'}
            >
               {/*<Text*/}
               {/*     fontSize={14}*/}
               {/*     fontFamily={fonts.bold}*/}
               {/*     lineHeight={16}*/}
               {/*     paddingBottom={'s'}*/}
               {/*     color={'slateGray'}*/}
               {/*     marginHorizontal={'r'}*/}
               {/*     letterSpacing={0.15}*/}
               {/*     fontWeight={'500'}*/}
				{/*	>*/}
				{/*		        {'Voces Note'}*/}
				{/*	      </Text>*/}
               {/* <Box*/}
               {/*     paddingHorizontal={'r'}*/}
               {/*     marginBottom={'s'}*/}
               {/*     flexDirection={'row'}*/}
               {/*     alignItems={'center'}*/}
               {/*   >*/}
               {/*       <Box*/}
               {/*         borderRadius={10}*/}
               {/*         borderWidth={1.2}*/}
               {/*         flex={0.90}*/}
               {/*         height={DeviceHelper.calculateHeightRatio(50)}*/}
               {/*         backgroundColor={'white'}*/}
               {/*     >*/}
               {/*       {*/}
               {/*         path && !isLogPress ? (*/}
               {/*          <AudioWave*/}
               {/*           currentPlaybackSpeed={1}*/}
               {/*           currentPlaying={currentPlaying}*/}
               {/*           item={path}*/}
               {/*           setCurrentPlaying={setCurrentPlaying}*/}
               {/*           changeSpeed={() =>{}}*/}
               {/*           onPanStateChange={() =>{}}*/}
               {/*       />*/}
               {/*         ):(*/}
               {/*           <Waveform*/}
               {/*           mode="live"*/}
               {/*           ref={ref}*/}
               {/*           candleSpace={2}*/}
               {/*           candleWidth={4}*/}
               {/*           waveColor={'#000'}*/}
               {/*           onRecorderStateChange={onRecorderStateChange}*/}
               {/*         />*/}
               {/*         )*/}
               {/*       }*/}
               {/*       */}
               {/*     </Box>*/}
               {/*     <Box*/}
               {/*       flex={0.15}*/}
               {/*       marginStart={'s'}*/}
               {/*     >*/}
               {/*         <Pressable*/}
               {/*           onLongPress={(event) =>{*/}
               {/*               onLongPress()*/}
               {/*               setIsLogPress(true);*/}
               {/*             }*/}

               {/*           }*/}
               {/*           onPressOut={() =>{*/}
               {/*             onPressOut()*/}
               {/*             setIsLogPress(false)*/}
               {/*           }}*/}
               {/*           height={DeviceHelper.calculateWidthRatio(isLogPress ? 90 :48)}*/}
               {/*           width={DeviceHelper.calculateWidthRatio(isLogPress ? 90 : 48)}*/}
               {/*           borderRadius={DeviceHelper.calculateWidthRatio(isLogPress ? 50:30)}*/}
               {/*           alignItems={'center'}*/}
               {/*           justifyContent={'center'}*/}
               {/*           backgroundColor={'ballBlue'}*/}
               {/*         >*/}
               {/*             <SvgIcon*/}
               {/*               name={'mic'} //name={value ? 'send' :'mic'}*/}
               {/*               fill={'white'}*/}
               {/*               height={DeviceHelper.calculateWidthRatio(25)}*/}
               {/*               width={DeviceHelper.calculateWidthRatio(25)}*/}
               {/*             />*/}
               {/*         </Pressable>*/}
               {/*       </Box>*/}
               {/* </Box>*/}

              <Forms
                fieldArray={fieldArray}
                control={control}
                errors={errors}
                setValue={setValue}
              />
              <Box marginHorizontal={'r'} marginTop={'m'}>
                <Button
                  label={'End Visit'}
                  backgroundColor={'success'}
                  onPress={onAddVisitPress}
                />
              </Box>
            </Box>
          </CustomKeyboardAwareScrollView>
        </Box>
      </Box>
    </Modal>
  )
})
