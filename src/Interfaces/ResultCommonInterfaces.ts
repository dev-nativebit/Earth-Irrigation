import {
  AddLeaveDto,
  AddVisitDto,
  AppointmentDataDto,
  AppointmentDto, AttendanceListDto,
  DashboardDto, EditExpenseDto,
  EmployeeDataDto,
  GetExpenseListDto, GetHeadQuarterListDto, GetRequestListDto,
  GetVisitListDto, LeaveListDto,
  LoginDto,
  UserPermissionDto,
} from '@/dtos';
import {ExTypeModel} from '@/model/ExpTypeModel';
export interface ResultCommonInterfaces {
  message: string;
  success: number | boolean;
  data: LoginDto |
    UserPermissionDto |
    AddVisitDto |
    GetVisitListDto[] |
    ExTypeModel |
    GetExpenseListDto[] |
    DashboardDto |
    EmployeeDataDto |
    AppointmentDto [] |
    AppointmentDataDto |
      AttendanceListDto[] |
      LeaveListDto[] |
      AddLeaveDto[] |
      GetRequestListDto[] |
      GetHeadQuarterListDto[] |
      EditExpenseDto
  ;
  // current_page: number;
  // total_pages: number;
  // per_page_record: number;
  // total_record: number;
  // total_rat:number;
  // based_on:number;
  // user_name:string;
  // profile_image:string;
  // commited_earning:number;
  // tabs_count: NonNullable<unknown>;
}
