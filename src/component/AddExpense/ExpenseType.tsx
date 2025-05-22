import React, {useEffect, useMemo, useState} from 'react';
import {AuthInput, Box, DropDownAndInput, LabelValuePair, Text} from "@/component";
import {CustomFormFieldType, EditExpenseDto} from "@/dtos";
import {fonts} from "@/style";
import {ExTypeModel} from "@/model/ExpTypeModel";
import {RootState, useAppSelector} from "@/redux/root.store";
import {EditExpenseModel} from "@/model";

export interface ExpenseTypeProps{
    onChange:(type:LabelValuePair[]) =>void
    option:LabelValuePair[] |string[]
    onTravelBy:(value:string) =>void
    travelValue:string
    isEdit?:boolean
    isViewOnly?:boolean
}

export const ExpenseType:React.FC<ExpenseTypeProps> =({onChange,option,onTravelBy,travelValue,isEdit,isViewOnly}:ExpenseTypeProps) =>{
    const [expenseType, setExpenseType] = useState<LabelValuePair[]>(option as LabelValuePair[])
    const editExpResult = useAppSelector((state:RootState) => state.visitDetail.addEditExp);

    const editExp = useMemo(() => {
        if (editExpResult?.isSuccess){
            return editExpResult.getValue()
        }
        return new EditExpenseModel({} as EditExpenseDto)
    }, [editExpResult]);

    const handelOnChange =(amount:string,index:number) =>{
        const team = [...expenseType]
        team[index].value = amount
        onChange(team)
        setExpenseType(team)
    }

    useEffect(() => {
        if (isEdit || isViewOnly){
            const team = [...expenseType]
            editExp.expTrans.items.map((item) => {
                expenseType.find((firstItem,index) => {
                    if (item.exp_type_id === firstItem.data){
                        team[index].value = item.amount
                    }
                });
            })
            onChange(team)
            setExpenseType(team)
        }
    }, []);
    return (
        <Box flex={1} paddingBottom={'s'}>
            <Box flexDirection={'row'} marginVertical={'s'}>
                <Text
                    style={{
                        flex:0.5
                    }}
                    paddingStart={'s'}
                    fontFamily={fonts.medium}
                    fontSize={16}
                >
                    {'Expense Type'}
                </Text>
                <Text
                    style={{
                        flex:0.5
                    }}
                    paddingStart={'r'}
                    fontFamily={fonts.medium}
                    fontSize={16}
                >
                    {'Amount'}
                </Text>
            </Box>
            {
                expenseType?.map((value,index) => {
                    return(
                        <Box
                            key={value.label}
                            alignItems={'center'}
                            justifyContent={'center'}
                            height={index === 0 ? 130 :60}
                            backgroundColor={index % 2 === 0 ?'header' :'white'}
                        >
                            <Box
                                flexDirection={'row'}
                                alignItems={'center'}
                            >
                                <Text
                                    style={{
                                        flex:0.5
                                    }}
                                    paddingStart={'r'}
                                    fontFamily={fonts.medium}
                                    fontSize={16}
                                >
                                    {value.label}
                                </Text>
                                <Box
                                    flex={0.5}
                                    alignSelf={'center'}
                                    paddingEnd={'s'}
                                    height={40}
                                >
                                    <AuthInput
                                        placeholder={'0'}
                                        fieldType={CustomFormFieldType.textInput}
                                        label={'0'}
                                        value={value.value as string}
                                        onChangeText={(text) =>{
                                            handelOnChange(text,index)
                                        }}
                                        editable={!isViewOnly}
                                        keyboardType={'numeric'}
                                        hasError={false}
                                        height={40}
                                        errorType={''}
                                        placeholderLabel={''}
                                        error={''}
                                        isRequired={false}
                                        isShowLabel={false}
                                        isBottomBorder={false}
                                        disable={isViewOnly}
                                    />
                                </Box>
                            </Box>
                            {
                                index === 0 &&(
                                    <Box>
                                        <DropDownAndInput
                                            value={travelValue}
                                            onChange={onTravelBy}
                                            isViewOnly={isViewOnly}
                                            isEdit={isEdit}
                                        />
                                    </Box>
                                )
                            }



                        </Box>
                    )
                })
            }


        </Box>
    );
}
