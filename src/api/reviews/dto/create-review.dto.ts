import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  question_id: string;

  @IsOptional()
  @IsDateString()
  viewed_at?: string;
}
