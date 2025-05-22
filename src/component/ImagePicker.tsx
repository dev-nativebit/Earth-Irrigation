import React from 'react'
import {Pressable} from '@/component/Pressable';
import {Box} from '@/component/Box';
import Modal from 'react-native-modal';
import {SvgIcon} from '../assets/SvgIcon';
import {DeviceHelper} from '../helper';

export interface ImagePickerProps {
  isVisible: boolean;
  onClose: () => void;
  onCamaraPress:() => void;
  onGalleryPress:() => void;
}


export const ImagePicker: React.FC<ImagePickerProps> = ({
  isVisible,
  onClose,
  onGalleryPress,
  onCamaraPress,
}:ImagePickerProps) =>{
  return (
    <Modal
      testID="modal"
      isVisible={isVisible}
      onModalHide={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      animationInTiming={500}
      animationOutTiming={700}
      animationIn="slideInUp"
      backdropTransitionOutTiming={0}
      statusBarTranslucent={true}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
    >
      <Box flex={1}>
        <Pressable onPress={onClose} flex={0.80} />
        <Box
          flex={0.20}
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
          <Box
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            flex={1}
          >
            <Pressable
              flex={0.5}
              onPress={onCamaraPress}
            >
              <SvgIcon
                name={'camera'}
                height={DeviceHelper.calculateWidthRatio(100)}
                width={DeviceHelper.calculateWidthRatio(100)}
              />
            </Pressable>
            <Box height={80} width={1} backgroundColor={'grey'}/>
            <Pressable
              flex={0.5}
              onPress={onGalleryPress}
            >
              <SvgIcon
                name={'gallery'}
                height={DeviceHelper.calculateWidthRatio(90)}
                width={DeviceHelper.calculateWidthRatio(90)}
              />
            </Pressable>
          </Box>


         </Box>
      </Box>
    </Modal>
  )
}