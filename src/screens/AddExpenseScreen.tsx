import React, {useEffect, useMemo, useState} from 'react';
import {
  Box,
  Button,
  Forms, hideFullScreenProgress,
 LabelValuePair,
  Screen,
  ScreenHeader,
  showFullScreenProgress,
  StatusBarType,
} from '@/component';
import {useForm} from 'react-hook-form';
import {customFormGenerator, ExpenseIds} from '@/customFormGenerator';
import {ScrollView} from 'react-native';
import {DeviceHelper} from '@/helper';
import {actions, RootState, useAppSelector} from '@/redux/root.store';
import {ExTypeModel} from '@/model/ExpTypeModel';
import {ExpTypeDto} from '@/dtos/ExpTypeListDto';
import { GetExpenseListApiParams, SaveExpenseApiParams} from '@/api';
import {Asset} from 'react-native-image-picker';
import {goBack, StackParamList} from '@/navigation/AppNavigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import {EditExpenseModel} from "@/model";
import {EditExpenseDto} from "@/dtos";
import moment from "moment";
import {MultiImageAttachment} from "@/component/MultiImageAttachment";


export const AddExpenseScreen:React.FC = () =>{
  const route = useRoute<RouteProp<StackParamList,'AddExpenseScreen'>>()
  const {isEdit,isViewOnly} = route.params
  const selectedItem = route?.params?.selectedItem
  const getAddVisitResult = useAppSelector((state:RootState) => state.visitDetail.addExType);
  const editExpResult = useAppSelector((state:RootState) => state.visitDetail.addEditExp);
  const [images, setImages] = useState<Asset[]>([]);
  const [travelValue, setTravelValue] = useState('')
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const getAddExpense = useMemo(() => {
    if (getAddVisitResult?.isSuccess){
      return getAddVisitResult.getValue()
    }
    return new ExTypeModel({} as ExpTypeDto)
  }, [getAddVisitResult]);

  const editExp = useMemo(() => {
    if (editExpResult?.isSuccess){
      return editExpResult.getValue()
    }
    return new EditExpenseModel({} as EditExpenseDto)
  }, [editExpResult]);

  const getExpenseType =() => {
    if (isEdit || isViewOnly){
      const updateExpList:LabelValuePair[] = [...getAddExpense.expTypeList.getLabelValuePair()]
      editExp.expTrans.items.map((item) => {
         getAddExpense.expTypeList.getLabelValuePair().find((firstItem,index) => {
            if (item.exp_type_id === firstItem.data){
              updateExpList[index].value = item.amount
            }
            if (item.travel_by !== ''){
              const data = {
                inputValue:item.travel_distance,
                dropdownValue:item.travel_by,
              };
              setTravelValue(JSON.stringify(data))
            }
        });
      })
      return updateExpList
    }else {
      return getAddExpense.expTypeList.getLabelValuePair()
    }
  }

  const form = useMemo(() => customFormGenerator.generateExpenseForm(getExpenseType()), []);

  useEffect(()=>{
    if(isEdit || isViewOnly){
      setValue(ExpenseIds.expenseDate,moment(editExp?.exp_date).format('YYYY-MM-DD'))
      setValue(ExpenseIds.notes,editExp?.notes)
      const assets: Asset[] = [];
      editExp?.proof_file.map(image => {
        assets.push({uri: image});
      });
      setImages(assets)
    }
  },[])

  const expTrans = () =>{
    const tamp:any[] = []
    const data = getValues()[ExpenseIds.expenseTypeAmount]
      const travel = JSON.parse(travelValue)

    Object.values(data).forEach((value,index) => {
      const obj ={
        id:0,
        exp_type_id:value.data,
        amount:value.value ? value.value : '0',
        travel_by: index === 0  ?travel.dropdownValue ?? '' : '',
        travel_distance:  index === 0  ? travel.inputValue ?? '0' : '',
      }
      tamp.push(obj)
    })
    return JSON.stringify(tamp)
  }


  const submit = async () =>{
    let formData = new FormData();
    if(images.length > 0){
      images.forEach((item, i) => {
        formData.append("proof_file[]", {
          uri: item.uri,
          type: "image/jpeg",
          name: item.fileName || `filename${i}.jpg`,
        });
      });

    }

    showFullScreenProgress()
    const params:SaveExpenseApiParams ={
      expTrans: expTrans(),
      exp_date: getValues()[ExpenseIds.expenseDate],
      id: isEdit ? selectedItem?.expenseId ?? '' : '0',
      notes: getValues()[ExpenseIds.notes]

    }
    await actions.saveExpenseThunkCallActions(params,formData).then(async response =>{
      if (response.isSuccess){
        const params:GetExpenseListApiParams = {
          length: 10,
          search: '',
          start: 0,
          status: 0
        }
        await actions.getExpenseListThunkCallActions(params)
        goBack()
      }
      hideFullScreenProgress()
    })
  }

  const handelOnSavaExpenseApiCall = () =>{
     handleSubmit(submit)()
  }

  const handelOnImageDeletePress = (url:string) =>{
    const newImages = images.filter(value => value.uri !== url);
    console.log(newImages)
    setImages(newImages);
  };


  return (
    <Screen backgroundColor={'white'} statusBarType={StatusBarType.Light} >
      <Box>
        <ScreenHeader title={isEdit ? 'Edit Expense' : isViewOnly ? 'View Expense' :'Add Expense'} />
        <ScrollView>
          <Box paddingBottom={DeviceHelper.ios() ? 'lll' : 'se'}>
            <Forms
              fieldArray={form}
              control={control}
              errors={errors}
              setValue={setValue}
              onTravelBy={setTravelValue}
              travelValue={travelValue}
              isEdit={isEdit}
              isViewOnly={isViewOnly}
            />
            <MultiImageAttachment
              images={images}
              title={'Select Image'}
              onImageSelect={setImages}
              placeholderLabel={''}
              errorType={''}
              error={''}
              onDeletePress={handelOnImageDeletePress}
              isViewOnly={isViewOnly}
            />
            {!isViewOnly && (
                <Box marginHorizontal={'r'} marginTop={'m'}>
                  <Button label={'Save'} onPress={handelOnSavaExpenseApiCall} />
                </Box>
            )}

          </Box>
        </ScrollView>
      </Box>
    </Screen>
  )
}
