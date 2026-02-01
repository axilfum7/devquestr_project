import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateLikeDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  question_id: string;

  @IsOptional()
  @IsDateString()
  liked_at?: string;
}
