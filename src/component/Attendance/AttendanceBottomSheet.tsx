import React from 'react'
import {Box, Button, Pressable, Text} from '@/component';
import Modal from 'react-native-modal';

export interface AttendanceBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onChooseFilePress: () => void;
  onAddPress: () => void;
  fileName: string;
}

export const AttendanceBottomSheet:React.FC<AttendanceBottomSheetProps> = ({
  onClose,
  isVisible,
  onChooseFilePress,
  onAddPress,
  fileName,
  }:AttendanceBottomSheetProps) => {
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
      swipeDirection={['down']}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
    >
      <Box flex={1}>
        <Pressable onPress={onClose} flex={0.75} />
        <Box
          flex={0.25}
          backgroundColor={'white'}
          borderTopLeftRadius={15}
          borderTopRightRadius={15}
        >

          <Pressable
            onPress={onChooseFilePress}
            flexDirection={'row'}
            marginTop={'l'}
            marginHorizontal={'r'}
            borderWidth={1}
            borderRadius={5}
            borderColor={'grey'}
            alignItems={'center'}
            overflow={'hidden'}
          >
            <Box
              paddingHorizontal={'s'}
              borderRightWidth={1}
              paddingVertical={'ssr'}
              borderRightColor={'grey'}
            >
              <Text
                variant={'medium14'}
                color={'primaryColor1'}
              >
                {"Choose file"}
              </Text>
            </Box>
            <Text
              variant={'medium15'}
              color={'dark'}
              numberOfLines={1}
              paddingHorizontal={'s'}
            >
              {fileName ? fileName : "No File chosen"}
            </Text>
          </Pressable>

          <Box
            marginHorizontal={'r'}
            marginTop={'l'}
          >
            <Button
              label={'Add'}
              onPress={onAddPress}
              backgroundColor={'success'}
            />
          </Box>
        </Box>
      </Box>
      </Modal>
  )
}