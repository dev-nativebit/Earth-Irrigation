import React, {useEffect, useMemo, useState} from 'react';
import {AuthDropDown, AuthInput, Box} from '@/component';
import {CustomFormFieldType} from '@/dtos';
import {ExTypeModel} from '@/model/ExpTypeModel';
import {ExpTypeDto} from '@/dtos/ExpTypeListDto';
import {RootState, useAppSelector} from '@/redux/root.store';

export interface DropDownAndInputProps {
	value:string
	onChange: (value: string) => void;
	isViewOnly?:boolean
	isEdit?:boolean
}

export const DropDownAndInput: React.FC<DropDownAndInputProps> = ({
	value,
	onChange,
	isViewOnly =false,
	isEdit =false
}:DropDownAndInputProps) =>{
	const [selectedDropdownValue, setSelectedDropdownValue] = useState('');
	const [inputValue, setInputValue] = useState('');
	const getAddVisitResult = useAppSelector((state:RootState) => state.visitDetail.addExType);
	useEffect(() => {

		const data = {
			inputValue:inputValue,
			dropdownValue:selectedDropdownValue,
		};
		onChange(JSON.stringify(data));

	}, [inputValue, onChange, selectedDropdownValue]);

	useEffect(() => {
		if (value) {
			const selectedData = JSON.parse(value);
			setSelectedDropdownValue(selectedData.dropdownValue);
			setInputValue(selectedData.inputValue);
		}
		// don`t add value in dependency show error
	}, []);

	const getAddExpense = useMemo(() => {
		if (getAddVisitResult?.isSuccess){
			return getAddVisitResult.getValue();
		}
		return new ExTypeModel({} as ExpTypeDto)
	}, [getAddVisitResult]);

	useEffect(() => {
		if (getAddExpense?.getLabelValuePair?.length > 0 && !isEdit && !isViewOnly){
			setSelectedDropdownValue(getAddExpense.getLabelValuePair[0].label)
		}
	}, [getAddExpense]);



	return (
		<Box flexDirection={'row'} alignItems={'center'} marginTop={'s'} >
			<Box  width={'45%'} height={60}  marginStart={'r'}>
				<AuthDropDown
					onLayout={()=>{}}
					placeholder={''}
					label={'Travel By'}
					formItems={getAddExpense.getLabelValuePair}
					onSelect={setSelectedDropdownValue}
					selectedValue={selectedDropdownValue}
					hasError={false}
					height={35}
					errorType={''}
					disabled={isViewOnly}
					placeholderLabel={'Days'}
					error={''}
					isRequired={false}
					onPress={() =>{}}
					isBottomMargin={false}
				/>

			</Box>
			<Box width={10}/>
			<Box width={'45%'} height={60}  marginEnd={'r'}>
				<AuthInput
					placeholder={'00.0'}
					fieldType={CustomFormFieldType.textInput}
					label={'Distance (Km)'}
					value={inputValue}
					multiline={false}
					isShowLabel={true}
					height={35}
					onChangeText={setInputValue}
					hasError={false}
					errorType={''}
					editable={!isViewOnly}
					placeholderLabel={''}
					error={''}
					isMarginTop={false}
					isRequired={false}
					keyboardType={'numeric'}

					onPress={() =>{}}
				/>
			</Box>

		</Box>
	);
};
