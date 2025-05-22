export interface  UserPermissionDto{
  headData: string
  userPermission: UserMenuDto
}

export interface UserMenuDto {
  sidebarMenus: MenuDto[]
  bottomMenus: MenuDto[]
  menuPosition: MenuPositionDto
}

export interface MenuDto {
  menu_name: string
  menu_icon: string
  base_url: string
  is_read: string
  is_write: string
  is_modify: string
  is_remove: string
  is_approve: string
}

export interface MenuPositionDto {
  Home: number
  Attendance: number
  Lead: number
  Sales_Order: number
  Visit: number
  Expense: number
  Profile: number
  Logout: number
}
