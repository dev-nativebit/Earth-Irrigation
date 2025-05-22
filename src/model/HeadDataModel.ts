import {Entity, Model} from '@/model/core';
import {HeadDataDto} from '@/dtos/AddNewLeadDto';

export class HeadDataModel extends Model<HeadDataDto>{
  constructor(dto:HeadDataDto) {
    super(dto);
  }
 get pageTitle(): string{
    return this.dto?.pageTitle ?? ''
 }
 get pageUrl(): string{
    return this.dto?.pageUrl ?? ''
 }
 get base_url(): string{
    return this.dto?.base_url ?? ''
 }
}