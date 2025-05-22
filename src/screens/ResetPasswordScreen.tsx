import React, {useMemo} from 'react';
import {
  Box,
  Button,
  CustomKeyboardAwareScrollView,
  Forms, hideFullScreenProgress,
  Screen,
  ScreenHeader,
  showFullScreenProgress,
  StatusBarType
} from '@/component';
import {SvgIcon} from '@/assets/SvgIcon';
import {DeviceHelper} from '@/helper';
import {customFormGenerator, resetPasswordFormIDs} from '@/customFormGenerator';
import {useForm} from 'react-hook-form';
import {ChangePasswordApiParams} from "@/api";
import {actions} from "@/redux/root.store";
import {goBack} from "@/navigation/AppNavigation";

export const ResetPasswordScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const form = useMemo(() => customFormGenerator.generatePasswordForm(), []);

  const submit = () =>{
    const params:ChangePasswordApiParams={
      cpassword:getValues()[resetPasswordFormIDs.confirmPassword],
      new_password:getValues()[resetPasswordFormIDs.newPassword],
      old_password:getValues()[resetPasswordFormIDs.oldPassword]
    }
    showFullScreenProgress()
    actions.changePasswordThunkCallActions(params).then(res=>{
      if (res.isSuccess){
        goBack()
      }
      hideFullScreenProgress()
    })
  }

  const onResetPasswordPress = () => {
    handleSubmit(submit)()
  }

  return (
    <Screen
      backgroundColor={'white'}
      statusBarType={StatusBarType.Light}
      isDefaultIOSPaddingFromTop={false}
    >
      {/*<Box f1lex={}>*/}
          <ScreenHeader title={'Reset Password'} />
      <Box flex={1}>
        <CustomKeyboardAwareScrollView
          contentContainerStyle={{flex:1, paddingBottom:300}}>
          <Box>
            <SvgIcon
              name={'resetPassword'}
              height={'65%'}
              width={'100%'}
              pressableProps={{
                style:{
                  top:DeviceHelper.calculateHeightRatio(-80)
                }
              }}
            />
            <Box top={DeviceHelper.calculateHeightRatio(-140)}>
              <Forms
                fieldArray={form}
                control={control}
                errors={errors} />

              <Box marginHorizontal={'r'} marginTop={'m'}>
                <Button label={'Reset'} onPress={onResetPasswordPress}/>
              </Box>
            </Box>

          </Box>
        </CustomKeyboardAwareScrollView>
      </Box>
    </Screen>
  );
};
