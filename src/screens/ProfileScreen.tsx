import React, {useEffect, useMemo} from 'react';
import {
  Box,
  Image,
  Screen,
  StatusBarType,
  Text,
} from '@/component';
import {Images} from '@/assets';
import {DeviceHelper} from '@/helper';
import {actions, RootState, useAppSelector} from "@/redux/root.store";
import {EmployeeDetailModel} from "@/model";
import {EmployeeDetailDto} from "@/dtos";
import {ImageSourcePropType, ScrollView} from "react-native";

export const ProfileScreen = () => {
  const employeeDetailResult = useAppSelector((state:RootState) => state.userDetail.employeeDetail);

  const employeeDetail:EmployeeDetailModel = useMemo(() => {
    if (employeeDetailResult?.isSuccess){
      return employeeDetailResult.getValue().employeeDetail
    }
    return new EmployeeDetailModel({} as EmployeeDetailDto)
  }, [employeeDetailResult]);

  useEffect(() => {
    actions.getEmployeeDetailThunkCallActions()
  }, []);

  const renderUI = (
      icon:ImageSourcePropType,
      value: string,
      title: string,
  ) => {
    return(
        <Box
            flexDirection={'row'}
            marginHorizontal={'r'}
            marginTop={'m'}
            alignItems={'center'}
            paddingBottom={'m'}
            borderBottomColor={'grey'}
            borderBottomWidth={1}>
          <Image
              source={icon}
              height={DeviceHelper.calculateHeightRatio(22)}
              width={DeviceHelper.calculateHeightRatio(22)}
              resizeMode={'contain'}
          />
          <Box paddingStart={'ssr'}>
            <Text variant={'bold18'} >
              {value}
            </Text>
            <Text variant={'medium14'} color={'gray'}>
              {title}
            </Text>
          </Box>
        </Box>
    )
  }

  return (
    <Screen backgroundColor={'white'} statusBarType={StatusBarType.Light}>
      <Box flex={1} backgroundColor={'white'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box marginBottom={'ll'}>
            <Box
              alignItems={'center'}
              marginHorizontal={'r'}
              marginTop={'l'}
              borderBottomColor={'grey'}
              borderBottomWidth={1.5}
              paddingBottom={'m'}
              borderStyle={'dashed'}
            >
            <Image
                source={{uri:employeeDetail.emp_profile}}
                height={DeviceHelper.calculateWidthRatio(150)}
                width={DeviceHelper.calculateWidthRatio(150)}
            />
              <Text variant={'bold18'} marginTop={'sr'}>
                {employeeDetail.emp_code}
              </Text>
          </Box>

          {renderUI(
              Images.userFill,
              employeeDetail.emp_name,
              'Employee Name'
          )}
          {renderUI(
              Images.arroba,
              employeeDetail.emp_email,
              'E-mail'
          )}
          {renderUI(
              Images.phoneCall,
              employeeDetail.emp_contact,
              'Mobile Number'
          )}
          {renderUI(
              Images.group,
              employeeDetail.designation_name,
              'Designation-Designation'
          )}
          {renderUI(
              Images.identityCard,
              employeeDetail.aadhar_no,
              'Aadhar No'
          )}
          {renderUI(
              Images.identityCard,
              employeeDetail.pan_no,
              'pan No'
          )}
          {renderUI(
              Images.identityCard,
              employeeDetail.joining_date,
              'Joining Date'
          )}
          {renderUI(
              Images.identityCard,
              employeeDetail.hq_name,
              'Head Quarter'
          )}
          </Box>
        </ScrollView>
      </Box>
    </Screen>
  );
};
