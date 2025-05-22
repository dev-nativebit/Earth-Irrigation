import {Entity} from '@/model/core';
import {GetVisitListDto} from '@/dtos/GetVisitListDto';

export class GetVisitListModel extends Entity<GetVisitListDto>{
  constructor(dto:GetVisitListDto) {
    super(dto,'id');
  }

  get visitId(): string{
    return this.dto?.id ?? ''
  }
  get party_id(): string{
    return this.dto?.party_id ?? ''
  }
  get party_name(): string{
    return this.dto?.party_name ?? ''
  }
  get contact_person(): string{
    return this.dto?.contact_person ?? ''
  }
  get purpose(): string{
    return this.dto?.purpose ?? ''
  }
  get start_at(): string{
    return this.dto?.start_at ?? ''
  }
  get end_at(): string{
    return this.dto?.end_at ?? ''
  }
  get lead_stage(): string{
    return this.dto?.lead_stage ?? ''
  }
  get duration(): number{
    return this.dto?.duration ?? ''
  }
  get voice_notes(): string{
    return this.dto?.voice_notes ?? ''
  }
  get discussion_points():string{
    return this.dto?.discussion_points ?? ''
  }
  get visit_type():string{
    return this.dto?.visit_type ?? ''
  }

}
