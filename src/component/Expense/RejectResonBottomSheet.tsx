import React, { useState } from 'react';
import {AuthInput, Box, Button, CustomKeyboardAwareScrollView, Image, Pressable, Text} from '@/component';
import Modal from 'react-native-modal';
import { CustomFormFieldType } from '@/dtos';
import { Keyboard } from 'react-native';


export interface RejectResonBottomSheetProps {
  isVisible:boolean;
  onRejectPress: () =>void
  onClose:()=>void;
  onChnage:(text:string) =>void
  value:string
}


export const RejectResonBottomSheet:React.FC<RejectResonBottomSheetProps> = ({
  onClose,
  isVisible,
  onRejectPress,
  onChnage,
  value,
}:RejectResonBottomSheetProps) => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardVisible(true);
          },
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardVisible(false);
          },
        );
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);


  return (
    <Modal
      testID="modal"
      isVisible={isVisible} 
      avoidKeyboard={true}
    >
        <Pressable 
        onPress={onClose} 
        justifyContent={'center'}
        flex={1} >
        
            <Box
                flex={keyboardVisible ? 0.38 :0.25}
                backgroundColor={'white'}
                borderRadius={10} 
                paddingHorizontal={'sr'}
                justifyContent={'center'}
            >
            <AuthInput					
				placeholder={'Reason'}
				fieldType={CustomFormFieldType.textInput}
				label={'Reason'}
				value={value}
				onChangeText={onChnage}
				hasError={false}
				errorType={''}
				placeholderLabel={''}
				error={''}
				isRequired={false}
				isShowLabel={false}
				isBottomBorder={false}
			/>

            <Button label={'Reject'} onPress={onRejectPress}/>
        </Box>
    
        </Pressable>
    </Modal>
  )
}