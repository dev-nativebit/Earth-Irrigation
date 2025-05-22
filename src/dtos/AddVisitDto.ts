import {HeadDataDto} from '@/dtos/AddNewLeadDto';

export interface AddVisitDto{
  headData: HeadDataDto
  visitTypeList: VisitPartyListDto[]
  startVisit: any
}

export interface VisitPartyListDto {
  id: string
  label:string
}
