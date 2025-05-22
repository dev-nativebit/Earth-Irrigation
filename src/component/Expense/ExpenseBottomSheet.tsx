import React from 'react';
import {Box, Image, Pressable, Text} from '@/component';
import Modal from 'react-native-modal';
import {Images} from '@/assets';
import {DeviceHelper} from '@/helper';
import {MenuModel} from '@/model';


export interface ExpenseBottomSheetProps {
  isVisible:boolean;
  onClose:()=>void;
  onApprov:()=>void;
  onReject:() =>void
  onDelete:()=>void;
  onEditPress: () =>void
  onViewPress: () =>void
  permissions:MenuModel
  isMenuButtonShow:boolean
}


export const ExpenseBottomSheet:React.FC<ExpenseBottomSheetProps> = ({
  onClose,
  isVisible,
  onApprov,
  onDelete,
  onReject,
  onEditPress,
  onViewPress,
  permissions,
  isMenuButtonShow
}:ExpenseBottomSheetProps) => {

  const bottomSheetArray = [
    {
      name:'Approve',
      icon:Images.checkmark,
      onPress:() =>{
        onApprov()
        onClose()
      },
      isShow:permissions?.isApprove === '1' && isMenuButtonShow,
    },
    {
        name:'Reject',
        icon:Images.reject,
        onPress:() =>{
          onReject()
          onClose()
        },
      isShow:permissions?.isApprove === '1' && isMenuButtonShow,
    },
    {
        name:'Edit',
        icon:Images.edit,
        onPress:() =>{
          onEditPress()
          onClose()
        },
      isShow:permissions?.isModify === '1'&& isMenuButtonShow,
    },
    {
        name:'View',
        icon:Images.read_only,
        onPress:() =>{
          onViewPress()
          onClose()
        },
      isShow:permissions?.isRead === '1',
    },
    {
      name:'Delete',
      icon:Images.delete,
      onPress:() =>{
        onDelete()
        onClose()
      },
      isShow:permissions?.isRemove === '1'&& isMenuButtonShow,
    },
  ];

  const bottomSheetHeight = () =>{
    return bottomSheetArray.filter(item => item.isShow).length
  }

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
        <Pressable onPress={onClose} flex={10 - bottomSheetHeight()} />
        <Box
          flex={bottomSheetHeight()}
          backgroundColor={'white'}
          borderTopLeftRadius={15}
          borderTopRightRadius={15}
        >
          <Box marginTop={'es'}>
            {
              bottomSheetArray.map((value, index) => {
                return (
                  value.isShow && (
                      <Pressable
                          onPress={value.onPress}
                          key={value.name}
                          marginTop={'r'}
                      >
                        <Box
                            flexDirection={'row'}
                            alignItems={'center'}
                            paddingHorizontal={'srr'}
                        >
                          <Image
                              source={value.icon}
                              height={DeviceHelper.calculateWidthRatio(20)}
                              width={DeviceHelper.calculateWidthRatio(20)}
                              tintColor={'#6D898F'}
                          />

                          <Text
                              variant={'medium15'}
                              paddingStart={'ssr'}
                              color={value.name === 'delete' ? 'red' : 'primaryColor1'}
                          >
                            {value.name}
                          </Text>
                        </Box>
                        {
                            (index + 1) < bottomSheetArray.length && (
                                <Box
                                    backgroundColor={'gray2'}
                                    height={1}
                                    marginTop={'srr'}
                                />
                            )
                        }

                      </Pressable>
                  )
                );
              })
            }
          </Box>
        </Box>
        <Pressable/>
      </Box>
    </Modal>
  )
}
