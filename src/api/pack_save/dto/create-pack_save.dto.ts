import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreatePackSaveDto {
  @IsUUID()
  pack_id: string;

  @IsUUID()
  question_id: string;

  @IsOptional()
  @IsDateString()
  added_at?: string;
}
