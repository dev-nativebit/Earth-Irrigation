import {Model} from '@/model/core';
import {EmployeeDetailDto} from '@/dtos';

export class EmployeeDetailModel extends Model<EmployeeDetailDto>{
  constructor(dto:EmployeeDetailDto) {
    super(dto);
  }
  get id(): string{
    return this.dto?.id ?? ''
  }
  get emp_role(): string{
    return this.dto?.emp_role ?? ''
  }
  get emp_code(): string{
    return this.dto?.emp_code ?? ''
  }
  get emp_name(): string{
    return this.dto?.emp_name ?? ''
  }
  get emp_contact(): string{
    return this.dto?.emp_contact ?? ''
  }
  get emp_email(): string{
    return this.dto?.emp_email ?? ''
  }
  get emp_birthdate(): string{
    return this.dto?.emp_birthdate ?? ''
  }
  get emp_gender(): string{
    return this.dto?.emp_gender ?? ''
  }
  get joining_date(): string{
    return this.dto?.joining_date ?? ''
  }
  get emp_address(): string{
    return this.dto?.emp_address ?? ''
  }
  get emp_designation(): string{
    return this.dto?.emp_designation ?? ''
  }
  get attendance_status(): string{
    return this.dto?.attendance_status ?? ''
  }
  get is_se(): string{
    return this.dto?.is_se ?? ''
  }
  get zone_id(): string{
    return this.dto?.zone_id ?? ''
  }
  get auth_id(): string{
    return this.dto?.auth_id ?? ''
  }
  get super_auth_id(): string{
    return this.dto?.super_auth_id ?? ''
  }
  get quarter_id(): string{
    return this.dto?.quarter_id ?? ''
  }
  get emp_dept_id(): string{
    return this.dto?.emp_dept_id ?? ''
  }
  get emp_profile(): string{
    return this.dto?.emp_profile ?? ''
  }
  get aadhar_no(): string{
    return this.dto?.aadhar_no ?? ''
  }
  get pan_no(): string{
    return this.dto?.pan_no ?? ''
  }
  get is_active(): string{
    return this.dto?.is_active ?? ''
  }
  get created_by(): string{
    return this.dto?.created_by ?? ''
  }
  get created_at(): string{
    return this.dto?.created_at ?? ''
  }
  get updated_by(): string{
    return this.dto?.updated_by ?? ''
  }
  get updated_at(): string{
    return this.dto?.updated_at ?? ''
  }
  get is_delete(): string{
    return this.dto?.is_delete ?? ''
  }
  get cm_id(): string{
    return this.dto?.cm_id ?? ''
  }
  get designation_name(): string{
    return this.dto?.designation_name ?? ''
  }
  get hq_location(): string{
    return this.dto?.hq_location ?? ''
  }
  get hq_add(): string{
    return this.dto?.hq_add ?? ''
  }
  get hq_name(): string{
    return this.dto?.hq_name ?? ''
  }
  get department_name(): string{
    return this.dto?.department_name ?? ''
  }

}
