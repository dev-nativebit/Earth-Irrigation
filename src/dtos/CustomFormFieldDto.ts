import { TextInputProps } from 'react-native';
import { LabelValuePair } from '@/component';

export enum CustomFormFieldType {
	textInput = 'textInput',
	gender = 'gender',
	dropdown = 'dropdown',
	textArea = 'textArea',
	password = 'password',
	none = 'none',
	disableInput = 'disableInput',
	date = 'date',
	expenseType = 'expenseType',
	time = 'time',
	image='image',
	radioButton='radioButton'

}

export interface CustomFieldValidatorDto {
	required?: boolean;
	regX?: RegExp,
	errorMessage?:string
}

export type TypeCustomValidation = Record<string, (value: any) => string | undefined>;

export interface CustomFormFieldDto {
	id: string,
	label?: string,
	value?: string,
	isHorizontal?:boolean
	placeholder?:string
	options?: Array<string> | LabelValuePair[],
	type: CustomFormFieldType,
	secureTextEntry?: boolean,
	isRightComponent?: boolean,
	isHidden?: boolean,
	validator?: CustomFieldValidatorDto,
	textInputProps? : TextInputProps
	isDependent?: boolean
}
