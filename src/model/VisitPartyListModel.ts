import {Entity} from '@/model/core';
import {VisitPartyListDto} from '@/dtos';

export class VisitPartyListModel extends Entity<VisitPartyListDto>{
  constructor(dto: VisitPartyListDto) {
    super(dto,'id');
  }

  get visitPartyId(): string{
    return this.dto?.id ?? ''
  }
  get label(): string{
    return this.dto?.label ?? ''
  }

}
