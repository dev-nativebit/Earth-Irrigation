import React, {useEffect, useMemo, useState} from 'react';
import {
    Box,
    Button,
    Forms, hideFullScreenProgress,
    ImagePicker,
    Screen,
    ScreenHeader,
    showFullScreenProgress,
    StatusBarType
} from "@/component";
import {ScrollView} from "react-native";
import {DeviceHelper} from "@/helper";
import {useForm} from "react-hook-form";
import {customFormGenerator, EditProfileIDs} from "@/customFormGenerator";
import {ImagePiker} from "@/component/ImagePiker";
import {Asset, launchCamera, launchImageLibrary} from "react-native-image-picker";
import {UpdateProfileApiParams} from "@/api";
import {actions, RootState, useAppSelector} from "@/redux/root.store";
import {goBack} from "@/navigation/AppNavigation";
import {EmployeeDetailModel} from "@/model";
import {EmployeeDetailDto} from "@/dtos";


export const EditProfileScreen:React.FC = () =>{
    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        reset,
        formState: {errors},
    } = useForm();
    const [isVisibleImagePicker, setIsVisibleImagePicker] = useState(false);
    const [images, setImages] = useState<Asset[]>([]);
    const [fileUrl, setFileUrl] = useState('');
    const employeeDetailResult = useAppSelector((state:RootState) => state.userDetail.employeeDetail);

    const employeeDetail:EmployeeDetailModel = useMemo(() => {
        if (employeeDetailResult?.isSuccess){
            return employeeDetailResult.getValue().employeeDetail
        }
        return new EmployeeDetailModel({} as EmployeeDetailDto)
    }, []);

    useEffect(() => {
        setValue(EditProfileIDs.panNo,employeeDetail.pan_no)
        setValue(EditProfileIDs.email,employeeDetail.emp_email)
        setValue(EditProfileIDs.aadhar,employeeDetail.aadhar_no)
        setValue(EditProfileIDs.contact,employeeDetail.emp_contact)
        setFileUrl(employeeDetail.emp_profile)
    }, []);

    const form = useMemo(() => customFormGenerator.generateEditProfileForm(), []);

    const handelOnCamaraPress = async () =>{
        setIsVisibleImagePicker(false)
        const response = await launchCamera({
            mediaType: 'photo',
            cameraType:'front',
            quality:0.3,
        })
        if (response.assets){
            setFileUrl(response.assets[0]?.uri ?? '')
            setImages(response.assets)
        }
    }

    const handelOnGalleryPress = async () =>{
        setIsVisibleImagePicker(false)
        const response = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit:1,
            quality:0.3
        })
        if (response.assets){
            setFileUrl(response.assets[0]?.uri ?? '')
            setImages(response.assets)
        }
    }

    const submit = () => {
        showFullScreenProgress()
        const formData = new FormData()
        const params:UpdateProfileApiParams={
            aadhar_no:getValues()[EditProfileIDs.aadhar],
            emp_contact:getValues()[EditProfileIDs.contact],
            emp_email:getValues()[EditProfileIDs.email],
            id:employeeDetail.id,
            pan_no:getValues()[EditProfileIDs.panNo],
        }
        if (images.length > 0){
            formData.append('emp_profile', {
                uri: images[0]?.uri,
                type: images[0]?.type ?? '',
                name:images[0]?.fileName,
            })
        }
        actions.updateProfileThunkCallActions(params,formData)
            .then(async value => {
                if (value.isSuccess){
                   await actions.getEmployeeDetailThunkCallActions()
                     goBack()
                }
                hideFullScreenProgress()
            })
    }
    const handleOnSavePress = () =>{
        handleSubmit(submit)()
    }

    return(
        <Screen backgroundColor={'white'} statusBarType={StatusBarType.Light}>
            <Box flex={1}>
                <ScreenHeader title={'Edit Profile'} />

                <ScrollView>
                    <Box marginTop={'sr'} paddingBottom={DeviceHelper.ios() ? 'lll' : 'se'}>
                        <Box alignItems={'center'}>
                            <ImagePiker
                                image={fileUrl}
                                onPress={()=>{
                                   setIsVisibleImagePicker(true)
                                }}
                                isShowCameraIcon={true}
                            />
                        </Box>

                        <Forms
                            fieldArray={form}
                            control={control}
                            errors={errors}
                            setValue={setValue}
                        />

                        <Box marginHorizontal={'r'} marginTop={'m'}>
                            <Button
                                label={'Save'}
                                onPress={handleOnSavePress}
                            />
                        </Box>
                    </Box>
                </ScrollView>
            </Box>
            <ImagePicker
                onClose={() =>{
                    setIsVisibleImagePicker(false)
                }}
                onGalleryPress={handelOnGalleryPress}
                onCamaraPress={handelOnCamaraPress}
                isVisible={isVisibleImagePicker}
            />
        </Screen>
    )
}
