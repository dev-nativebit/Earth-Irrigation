import {
	AddVisitModel,
	CustomFieldValidator,
	CustomFormField,
	CustomFormFieldList, GetHeadQuarterList,
} from '@/model';
import { CustomFieldValidatorDto, CustomFormFieldDto, CustomFormFieldType } from '@/dtos';
import {ExTypeModel} from '@/model/ExpTypeModel';
import {AddLeaveList} from "@/model/AddLeaveList";
import {LabelValuePair} from "@/component";

export enum LoginFormIDs {
	userId = 'userId',
	password = 'password',
}
export enum resetPasswordFormIDs {
	oldPassword = 'oldPassword',
	newPassword = 'newPassword',
	confirmPassword = 'confirmPassword',
}
export enum AddVisitFormIds{
	partyName ='partyName',
	contactPerson ='contactPerson',
	visitType= 'visitType',
	purpose ='purpose'
}
export enum ExpenseIds{
	expenseDate='expenseDate',
	notes = 'notes',
	expenseNo='expenseNo',
	expenseTypeAmount='expenseTypeAmount',
	fileUpload ='fileUpload'
}
export enum EndVisitIDs{
	discussionPoints='discussionPoints',
	LeadStage='leadStage',
	nextVisit = 'nextVisit',
	date = 'date',
	time ='time',
	notes = 'notes'

}
export enum AddLeaveIDs{
	startDate = 'Start Date',
	endDate = 'End Date',
	reason  = 'Reason',
	startSection  = 'startSection',
	EndSection  = 'EndSection',
}
export enum RejectNotesIDs{
	notes = 'notes'
}
export enum EditProfileIDs{
	email = 'email',
	contact = 'contact',
	aadhar = 'aadhar',
	panNo = 'panNo'
}

class CustomFormGenerator {
	// eslint-disable-next-line class-methods-use-this
	private generateField(customFormFieldDto: CustomFormFieldDto): CustomFormField {
		return new CustomFormField(customFormFieldDto);
	}

	// eslint-disable-next-line class-methods-use-this
	private generateValidator(customFileValidator: CustomFieldValidatorDto): CustomFieldValidator {
		return new CustomFieldValidator(customFileValidator);
	}


	generateLoginForm(): CustomFormFieldList {
		const fields: CustomFormFieldList = new CustomFormFieldList([]);
		fields.addItem(this.generateField({
			id: LoginFormIDs.userId,
			type: CustomFormFieldType.textInput,
			label: "User ID",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'none',
			},
		}));
		fields.addItem(this.generateField({
			id: LoginFormIDs.password,
			type: CustomFormFieldType.password,
			label: "Password",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				secureTextEntry: true,
				autoCapitalize: 'none',
			},
		}));
		return fields;
	}

	generatePasswordForm(): CustomFormFieldList {
		const fields: CustomFormFieldList = new CustomFormFieldList([]);
		fields.addItem(this.generateField({
			id: resetPasswordFormIDs.oldPassword,
			type: CustomFormFieldType.password,
			label: "Old Password",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				secureTextEntry: true,
				autoCapitalize: 'none',
			},
		}));
		fields.addItem(this.generateField({
			id: resetPasswordFormIDs.newPassword,
			type: CustomFormFieldType.password,
			label: "New Password",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				secureTextEntry: true,
				autoCapitalize: 'none',
			},
		}));
		fields.addItem(this.generateField({
			id: resetPasswordFormIDs.confirmPassword,
			type: CustomFormFieldType.password,
			label: "Confirm Password",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				secureTextEntry: true,
				autoCapitalize: 'none',
			},
		}));
		return fields;
	}

	generateAddVisitForm(option: AddVisitModel): CustomFormFieldList {
		const fields: CustomFormFieldList = new CustomFormFieldList([]);
		fields.addItem(this.generateField({
			id: AddVisitFormIds.contactPerson,
			type: CustomFormFieldType.textInput,
			label: "Contact Person",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'none',
			},
		}));
		fields.addItem(this.generateField({
			id: AddVisitFormIds.partyName,
			type: CustomFormFieldType.textInput,
			label: "Party Name",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'none',
			},
		}));
		fields.addItem(this.generateField({
			id: AddVisitFormIds.visitType,
			type: CustomFormFieldType.dropdown,
			label: "Visit Type",
			options: option.visitTypeList.getLabelValuePair(),
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'none',
			},
		}));
		fields.addItem(this.generateField({
			id: AddVisitFormIds.purpose,
			type: CustomFormFieldType.textArea,
			label: "Purpose",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'none',
			},
		}));
		return fields
	}

	generateExpenseForm(option: LabelValuePair[]): CustomFormFieldList {
		const fields: CustomFormFieldList = new CustomFormFieldList([]);

		fields.addItem(this.generateField({
			id: ExpenseIds.expenseDate,
			type: CustomFormFieldType.date,
			label: "Expense Date",
			isHidden:true,
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'none',
			},
		}));
		fields.addItem(this.generateField({
			id: ExpenseIds.expenseTypeAmount,
			type: CustomFormFieldType.expenseType,
			label: "expenseTypeAmount",
			isHidden:true,
			options: option,
			validator: this.generateValidator({
				required: false,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'none',
			},
		}));
		fields.addItem(this.generateField({
			id: ExpenseIds.notes,
			type: CustomFormFieldType.textArea,
			label: "Notes",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'none',
			},
		}));
		return fields
	}

	generateVisitForm(): CustomFormFieldList {
		const fields: CustomFormFieldList = new CustomFormFieldList([]);
		fields.addItem(this.generateField({
			id: EndVisitIDs.discussionPoints,
			type: CustomFormFieldType.textArea,
			label: "Discussion Points",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'none',
			},
		}));
		return fields
	}

	generateAddLeaveForm(): CustomFormFieldList {
		const fields: CustomFormFieldList = new CustomFormFieldList([]);
		fields.addItem(this.generateField({
			id: AddLeaveIDs.startDate,
			type: CustomFormFieldType.date,
			label: "Start Date",
			isHidden:true,
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'none',
			},
		}));
		fields.addItem(this.generateField({
			id: AddLeaveIDs.startSection,
			type: CustomFormFieldType.radioButton,
			label: "Start Section",
			value:'F',
			options:[
				{
					label:'Full Day',
					value:'F'
				},
				{
					label:'Haf Day',
					value:'H'
				},
			],
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'none',
			},
		}));
		fields.addItem(this.generateField({
			id: AddLeaveIDs.endDate,
			type: CustomFormFieldType.date,
			label: "End Date",
			isHidden:true,
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'none',
			},
		}));
		fields.addItem(this.generateField({
			id: AddLeaveIDs.EndSection,
			type: CustomFormFieldType.radioButton,
			label: "End Section",
			options:[
				{
					label:'Full Day',
					value:'F'
				},
				{
					label:'Haf Day',
					value:'H'
				},
			],
			value:'F',
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'none',
			},
		}));
		fields.addItem(this.generateField({
			id: AddLeaveIDs.reason,
			type: CustomFormFieldType.textArea,
			label: "Reason",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'none',
			},
		}));
		return fields
	}

	generateRejectNotesForm(): CustomFormFieldList {
		const fields: CustomFormFieldList = new CustomFormFieldList([]);
		fields.addItem(this.generateField({
			id: RejectNotesIDs.notes,
			type: CustomFormFieldType.textArea,
			label: "Notes",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'none',
			},
		}));
		return fields
	}

	generateEditProfileForm(): CustomFormFieldList {
		const fields: CustomFormFieldList = new CustomFormFieldList([]);
		fields.addItem(this.generateField({
			id: EditProfileIDs.email,
			type: CustomFormFieldType.textInput,
			label: "Employee Email",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'email-address',
				autoCapitalize: 'none',
			},
		}));
		fields.addItem(this.generateField({
			id: EditProfileIDs.contact,
			type: CustomFormFieldType.textInput,
			label: "Contact Person ",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'decimal-pad',
				autoCapitalize: 'none',
			},
		}));
		fields.addItem(this.generateField({
			id: EditProfileIDs.aadhar,
			type: CustomFormFieldType.textInput,
			label: "Aadhar No.",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'numeric',
				autoCapitalize: 'none',
			},
		}));
		fields.addItem(this.generateField({
			id: EditProfileIDs.panNo,
			type: CustomFormFieldType.textInput,
			label: "Pan No.",
			validator: this.generateValidator({
				required: true,
			}),
			textInputProps: {
				keyboardType: 'default',
				autoCapitalize: 'characters',
			},
		}));
		return fields
	}

	generateChangeHeadQuarterForm(option:GetHeadQuarterList): CustomFormFieldList {
		const fields: CustomFormFieldList = new CustomFormFieldList([]);
		fields.addItem(this.generateField({
			id: 'headQuarter',
			type: CustomFormFieldType.dropdown,
			label: "Change Head Quarter",
			validator: this.generateValidator({
				required: true,
			}),
			options:option.getLabelValuePair(),
			textInputProps: {
				keyboardType: 'email-address',
				autoCapitalize: 'none',
			},
		}));
		return fields
	}

}

export const customFormGenerator = new CustomFormGenerator();
