import React from 'react';
import {observer} from 'mobx-react-lite';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {Box} from '@/component/Box';
import {Text} from '@/component/Text';
import {fonts} from '@/style';
import {ScrollView} from 'react-native';
import {Image} from '@/component/Image';
import {DeviceHelper} from '@/helper';
import {Pressable} from '@/component/Pressable';
import {SvgIcon} from '@/assets/SvgIcon';
import {FieldError, FieldErrorProps} from '@/component/FieldError';
import {navigate, Routes} from '@/navigation/AppNavigation';

export interface UploadTractorAttachmentProps extends FieldErrorProps {
  title: string;
  images: Asset[];
  onImageSelect: (images: Asset[]) => void;
  onDeletePress: (url: string) => void;
  isViewOnly: boolean;
}

export const MultiImageAttachment: React.FC<UploadTractorAttachmentProps> =
  observer((props: UploadTractorAttachmentProps) => {
    const {title, images, onImageSelect,onDeletePress,isViewOnly} = props;
    const fieldErrorProps = props as FieldErrorProps;
    const handleOnPressAttachment = async () => {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality:0.4,
        selectionLimit:3,
      });
      if (result) {
        const newImages = [...images];
        newImages.push(...(result.assets as Asset[]));
        onImageSelect(newImages);
      }
    };

    return (
      <Box  marginBottom={'r'}  marginHorizontal={'r'}>
        <Text
            fontSize={14}
            fontFamily={fonts.bold}
            lineHeight={16}
            paddingBottom={'e6'}
            color={'slateGray'}
            letterSpacing={0.15}
            fontWeight={'500'}>
          {title}
        </Text>
          <Box>
              <ScrollView  showsHorizontalScrollIndicator={false}>
                  <Box flexDirection={'row'} flexWrap={'wrap'}>
                      {images.map((image, index) => (
                          <Box marginEnd={'r'} key={index} height={DeviceHelper.calculateWidthRatio(80)}>
                              <Pressable onPress={() =>{
                                  navigate({
                                      screenName:Routes.Images,
                                      params: {
                                          ImageList: images,
                                          index: index
                                      }
                                  })
                              }}>
                                  <Image
                                      width={DeviceHelper.calculateWidthRatio(90)}
                                      borderRadius={4}
                                      marginTop={'sr'}
                                      height={DeviceHelper.calculateWidthRatio(51)}
                                      source={{uri: image?.uri}}
                                  />
                              </Pressable>

                              {
                                  !isViewOnly && (
                                      <Pressable
                                          onPress={() =>{
                                              onDeletePress(image.uri ?? '')
                                          }}
                                          height={DeviceHelper.calculateWidthRatio(24)}
                                          width={DeviceHelper.calculateWidthRatio(24)}
                                          borderRadius={11}
                                          backgroundColor={'red'}
                                          position={'absolute'}
                                          justifyContent={'center'}
                                          right={-10}
                                          zIndex={1}
                                          top={5}
                                      >
                                          <SvgIcon
                                              name={'closeWhite'}
                                              height={DeviceHelper.calculateWidthRatio(10)}
                                              width={DeviceHelper.calculateWidthRatio(10)}
                                          />
                                      </Pressable>
                                  )
                              }

                          </Box>
                      ))}
                      {
                          !isViewOnly && (
                              <Pressable
                                  onPress={handleOnPressAttachment}
                                  width={DeviceHelper.calculateWidthRatio(90)}
                                  borderRadius={4}
                                  marginTop={'sr'}
                                  backgroundColor={'primary'}
                                  justifyContent={'center'}
                                  alignItems={'center'}
                                  height={DeviceHelper.calculateWidthRatio(51)}>
                                  <SvgIcon name={'plus'} fill={'white'}/>
                              </Pressable>
                          )
                      }

                  </Box>
              </ScrollView>
          </Box>

        <Box alignItems={'flex-end'}>
          <FieldError {...fieldErrorProps} />
        </Box>
      </Box>
    );
  });
