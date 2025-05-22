import {Model} from '@/model/core';
import {EmployeeDataDto} from '@/dtos';
import {EmployeeDetailModel} from '@/model/EmployeeDetailModel';

export class EmployeeDataModel extends Model<EmployeeDataDto>{
  constructor(dto:EmployeeDataDto) {
    super(dto);
  }

  get employeeDetail ():EmployeeDetailModel{
    return new EmployeeDetailModel(this.dto?.empData);
  }
}
