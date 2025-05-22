import React, {useMemo} from 'react';
import {
  Box,
  Button,
  CustomKeyboardAwareScrollView,
  Forms,
  hideFullScreenProgress,
  Image,
  Screen,
  showFullScreenProgress,
  StatusBarType,
  Text,
} from '@/component';
import {Images} from '@/assets';
import {DeviceHelper} from '@/helper';
import {fonts} from '@/style';
import {customFormGenerator, LoginFormIDs} from '@/customFormGenerator';
import {useForm} from 'react-hook-form';
import {SvgIcon} from '@/assets/SvgIcon';
import { LoginApiParams} from '@/api';
import {actions} from '@/redux/root.store';
import {reset, Routes} from '@/navigation/AppNavigation';

export const LoginScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors},
  } = useForm();
  const form = useMemo(() => customFormGenerator.generateLoginForm(), []);

  const submit = async () => {
    const params: LoginApiParams = {
      user_name: getValues()[LoginFormIDs.userId],
      user_psw: getValues()[LoginFormIDs.password],
    };
    let formData: FormData = new FormData();
    showFullScreenProgress();
    actions.LoginThunkCallActions(formData,params).then(async response => {
      if (response.isSuccess) {
        await actions.userPermissionThunkCallActions()
        reset({
          screenName: Routes.Dashboard,
        });
      }
      hideFullScreenProgress();
    });

  };

  const handelOnSignInPress = () => {
    handleSubmit(submit)();
  };

  return (
    <Screen
      backgroundColor={'white'}
      statusBarType={StatusBarType.Light}
      statusBarColor={'white'}>
      <Box flex={1} backgroundColor={'white'} alignItems={'center'}>
        <CustomKeyboardAwareScrollView>
          <Box flex={1} alignItems={'center'}>
            <Image
              source={Images.logo}
              marginTop={'mes'}
              resizeMode={'contain'}
              height={DeviceHelper.calculateWidthRatio(150)}
              width={DeviceHelper.calculateWidthRatio(300)}
            />
            <Box
              backgroundColor={'primary'}
              width={'100%'}
              alignItems={'center'}
              paddingVertical={'s'}
              marginTop={'m'}>
              <Text color={'white'} fontSize={16} fontFamily={fonts.semiBold}>
                {'JUST AUTOMIZING ROUTINE ACTIVITIES'}
              </Text>
            </Box>

            <Box
              backgroundColor={'primary'}
              height={DeviceHelper.calculateWidthRatio(296)}
              width={'87%'}
              marginTop={'l'}
              borderRadius={10}
            />
            <Box
              backgroundColor={'white'}
              height={DeviceHelper.calculateWidthRatio(300)}
              position={'absolute'}
              borderWidth={2}
              borderColor={'header'}
              top={DeviceHelper.calculateHeightRatio(279)}
              width={'88.8%'}
              left={14}
              borderRadius={15}>
              <Text
                color={'dark2'}
                fontSize={20}
                fontFamily={fonts.bold}
                lineHeight={26.6}
                marginTop={'r'}
                textAlign={'center'}>
                {'Please Login to your account'}
              </Text>
              <Forms
                fieldArray={form}
                control={control}
                errors={errors}
                isShowLabel={false}
                isBottomBorder={true}
              />

              <Box marginHorizontal={'r'} marginTop={'sr'}>
                <Button
                  label={'SIGN IN'}
                  onPress={handelOnSignInPress}
                />
              </Box>
            </Box>
            <Box>
              <SvgIcon
                name={'login'}
                height={DeviceHelper.calculateWidthRatio(250)}
                width={DeviceHelper.calculateWidthRatio(400)}
              />
            </Box>
          </Box>
        </CustomKeyboardAwareScrollView>
      </Box>
    </Screen>
  );
};
