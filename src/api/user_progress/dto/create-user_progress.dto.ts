import { IsBoolean, IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateUserProgressDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  question_id: string;

  @IsOptional()
  @IsBoolean()
  learned?: boolean;

  @IsOptional()
  @IsDateString()
  learned_at?: string;
}
