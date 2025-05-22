import React, {useEffect, useMemo} from 'react';
import {Box, Button, Forms, Screen, ScreenHeader, StatusBarType} from "@/component";
import {useForm} from "react-hook-form";
import {ScrollView, ToastAndroid} from "react-native";
import {DeviceHelper} from "@/helper";
import {AddLeaveIDs, customFormGenerator} from "@/customFormGenerator";
import {actions, RootState, useAppSelector} from "@/redux/root.store";
import {GetLeaveListApiParams, SaveLeaveParams} from "@/api";
import {goBack} from "@/navigation/AppNavigation";

export const AddLeaveScreen:React.FC = () =>{

    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        reset,
        watch,
        formState: {errors},
    } = useForm();




    const form = useMemo(() => customFormGenerator.generateAddLeaveForm(), []);


    /**
     * Handles the submit functionality for saving a leave request.
     * Constructs parameters required for the save leave API call, triggers the save leave operation, and updates the leave list upon successful save.
     *
     * Action flow:
     * 1. Constructs parameters from form values and user details.
     * 2. Resets the form.
     * 3. Initiates a save leave API call.
     * 4. If the save operation is successful:
     *    - Navigates back to the previous view.
     *    - Triggers a refresh of the leave list with specified parameters.
     */
    const submit = () =>{
        if (getValues()[AddLeaveIDs.startDate] > getValues()[AddLeaveIDs.endDate]){
            return ToastAndroid.show(`Start date can not be before the end date`, ToastAndroid.LONG,);
        }
        const params:SaveLeaveParams = {
            end_date: getValues()[AddLeaveIDs.endDate],
            id: '',
            leave_reason: getValues()[AddLeaveIDs.reason],
            start_date: getValues()[AddLeaveIDs.startDate],
            end_section: getValues()[AddLeaveIDs.EndSection],
            start_section: getValues()[AddLeaveIDs.startSection],

        };
        reset();
        actions.saveLeaveThunkCallActions(params)
            .then(async (res) =>{
                if(res.isSuccess){
                    console.log(res)
                    goBack()
                    // refresh leave list after save leave
                    const params:GetLeaveListApiParams={
                        auth_by: "",
                        emp_id: "",
                        from_date: "",
                        id: "",
                        to_date: "",
                        status: '1',
                        length: 10,
                        search: '',
                        start: 0,

                    }
                    await actions.getLeaveListThunkCallActions(params)
                }
            })
    }

    const handelOnSave = () => {
      handleSubmit(submit)();
    }


    return (
        <Screen backgroundColor={'white'} statusBarType={StatusBarType.Light}>
            <Box flex={1}>
                <ScreenHeader title={'Add Leave'} />
                <ScrollView>
                    <Box marginTop={'sr'} paddingBottom={DeviceHelper.ios() ? 'lll' : 'se'}>
                        <Forms
                            fieldArray={form}
                            control={control}
                            errors={errors}
                            setValue={setValue}
                        />

                        <Box marginHorizontal={'r'} marginTop={'m'}>
                            <Button
                                label={'Save'}
                                onPress={handelOnSave}
                            />
                        </Box>
                    </Box>
                </ScrollView>
            </Box>
        </Screen>
    );
}
