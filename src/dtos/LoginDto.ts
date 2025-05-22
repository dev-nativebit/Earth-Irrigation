export interface LoginDto {
  sign: string
  authToken: string
  userDetail: UserDetailDto
}

export interface UserDetailDto {
  loginId: string
  role: string
  roleName: string
  user_name: string
  superAuth: string
  authId: string
  zoneId: string
  leadRights: string
  user_code: string
  empId: string
}
