import React from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { CustomFormFieldList } from '@/model/CustomFormFieldList';
import { CustomFormFieldType } from '@/dtos';
import {
	AuthDropDown,
	AuthInput,
	Box,
	DateInput,
	ExpenseType,
	FormRadioButton,
	LabelValuePair,
	TimePicker
} from '@/component';
import {UseFormGetValues, UseFormSetValue} from 'react-hook-form/dist/types/form';
import {ExTypeModel} from "@/model/ExpTypeModel";


export interface FormsProps {
	fieldArray:CustomFormFieldList
	control:Control<FieldValues>
	errors:FieldErrors<FieldValues>
	setValue?: UseFormSetValue<any>
	getValues?: UseFormGetValues<any>
	isShowLabel?:boolean;
	isBottomBorder?: boolean;
	onInputPress?:() => void;
	isFieldDisabled?:(id:string) =>boolean
	dependentItem?: LabelValuePair[]
	onTravelBy?:(value:string) =>void
	travelValue?:string
	isEdit?:boolean
	isViewOnly?:boolean
}


export const Forms:React.FC<FormsProps> = ({
	fieldArray,
	control,
	errors,
	setValue,
	isShowLabel = true,
	isBottomBorder = false,
	onInputPress,
	isFieldDisabled,
	dependentItem,
	travelValue,
	onTravelBy,
	isEdit,
	isViewOnly = false,

}:FormsProps) =>{

	const handleInputPress = () => {
        if (onInputPress) {
            onInputPress();
        }
    };

	const handleIsFieldDisabled = (id: string) => {
        if (isFieldDisabled){
			return isFieldDisabled(id);
		}else{
			return false;
		}
    };

	const handleTravelChange = (value:string) => {
		if (onTravelBy){
			onTravelBy(value)

		}
	}


	return (
		<Box marginHorizontal={'r'}>
			{
				fieldArray.map((formField) => (
					<Controller
						key={formField.id}
						control={control}
						defaultValue={formField.value}
						name={formField.name}
						rules={{
							...formField.rules(),
						}}
						render={({ field: { value, onChange } }) => (
							<>
								{ (
									formField.type === CustomFormFieldType.textInput || formField.type === CustomFormFieldType.password) && (
									<AuthInput
										{...formField.textInputProps}
										placeholder={formField.label}
										fieldType={formField.type}
										label={formField.label}
										value={value}
										onChangeText={onChange}
										hasError={!!errors[`${formField.id}`]}
										errorType={String(errors[`${formField.id}`]?.type)}
										placeholderLabel={formField.label}
										error={errors[`${formField.id}`]}
										isRequired={formField.isRequired()}
										isShowLabel={isShowLabel}
										isBottomBorder={isBottomBorder}
										onPress={() => {}}
									/>
								)}
								{
									formField.type === CustomFormFieldType.dropdown && !formField.isHidden &&  (
										<AuthDropDown
											onLayout={()=>{}}
											placeholder={formField.label}
											label={formField.label}
											formItems={formField.options as LabelValuePair[]}
											onSelect={(dropdownValue)=>{
												if (setValue) {
													setValue(formField.name, dropdownValue, {
														shouldValidate: true,
													});
												}
											}}
											selectedValue={value}
											hasError={!!errors[`${formField.name}`]}
											errorType={String(errors[`${formField.name}`]?.type)}
											placeholderLabel={formField.label}
											error={errors[`${formField.name}`]}
											isRequired={formField.isRequired()}
											onPress={() =>{}}
											disabled={handleIsFieldDisabled(formField.name)}
											isDependentItem={formField.isDependent}
											dependentItem={dependentItem}
										/>
									)
								}
								{
									formField.type === CustomFormFieldType.date &&  formField.isHidden  &&(
										<DateInput
											label={formField.label}
											placeholder={formField.label}
											selectedDate={value}
											handleDateChange={(date)=>{
												onChange(date.dateString);
											}}
											hasError={!!errors[`${formField.name}`]}
											errorType={String(errors[`${formField.name}`]?.type)}
											placeholderLabel={formField.label}
											error={errors[`${formField.name}`]}
											isRequired={formField.isRequired()}
											isViewOnly={isViewOnly}
										/>
									)
								}
								{
									formField.type === CustomFormFieldType.expenseType && (
										<ExpenseType
											onChange={onChange}
											option={formField.options}
											travelValue={travelValue ?? ''}
											onTravelBy={handleTravelChange}
											isEdit={isEdit}
											isViewOnly={isViewOnly}
										/>
									)
								}
								{
									formField.type === CustomFormFieldType.time && formField.isHidden  && (
										<TimePicker
											label={formField.label}
											placeholder={formField.label}
											selectedDate={value}
											handleDateChange={(date)=>{
												onChange(date?.toString());
											}}
										/>
									)}
								{
									formField.type === CustomFormFieldType.textArea  && !formField.isHidden  && (
									<AuthInput
										{...formField.textInputProps}
										placeholder={formField.label}
										fieldType={formField.type}
										label={formField.label}
										value={value}
										multiline={true}
										height={90}
										editable={!isViewOnly}
										onChangeText={onChange}
										hasError={!!errors[`${formField.id}`]}
										errorType={String(errors[`${formField.id}`]?.type)}
										placeholderLabel={formField.label}
										error={errors[`${formField.id}`]}
										isRequired={formField.isRequired()}
										isShowLabel={true}
										onPress={() => {}}
										disable={isViewOnly}

									/>
								)}
								{
									formField.type === CustomFormFieldType.disableInput  && (
									<AuthInput
										{...formField.textInputProps}
										placeholder={formField.label}
										fieldType={formField.type}
										label={formField.label}
										value={value}
										editable={false}
										onChangeText={onChange}
										hasError={!!errors[`${formField.id}`]}
										errorType={String(errors[`${formField.id}`]?.type)}
										placeholderLabel={formField.label}
										error={errors[`${formField.id}`]}
										isRequired={formField.isRequired()}
										isShowLabel={true}
										onPress={handleInputPress}

									/>
								)}
								{formField.type === CustomFormFieldType.radioButton && (
									<FormRadioButton
										onPress={onChange}
										selected={value}
										option={formField.options as LabelValuePair[]}
										label={formField.label}
										isRequired={formField.isRequired()}
									/>
								)}
							</>
						)}
					/>
				))
			}
		</Box>
	);
};
