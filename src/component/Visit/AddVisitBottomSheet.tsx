import React from 'react'
import Modal from 'react-native-modal';
import {Box, Button, CustomKeyboardAwareScrollView, Forms, Pressable} from '@/component';
import {DeviceHelper} from '@/helper';
import {ScrollView} from 'react-native';
import {CustomFormFieldList} from '@/model';
import {Control, FieldErrors, FieldValues} from 'react-hook-form';
import {UseFormSetValue} from 'react-hook-form/dist/types/form';

export interface AddVisitBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  fieldArray:CustomFormFieldList
  control:Control<FieldValues>
  errors:FieldErrors<FieldValues>
  setValue?: UseFormSetValue<any>
  onAddVisitPress: () =>void
}


export const AddVisitBottomSheet:React.FC<AddVisitBottomSheetProps> = ({
  isVisible,
  onClose,
  setValue,
  control,
  errors,
  fieldArray,
  onAddVisitPress
}:AddVisitBottomSheetProps) =>{

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
      swipeDirection={['down']}
      statusBarTranslucent={true}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
    >
      <Box flex={1}>
        <Pressable onPress={onClose} flex={0.4} />
        <Box
          flex={0.6}
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
              <Forms
                fieldArray={fieldArray}
                control={control}
                errors={errors}
                setValue={setValue}
              />
              <Box marginHorizontal={'r'} marginTop={'m'}>
                <Button
                  label={'Add Visit'}
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
}
