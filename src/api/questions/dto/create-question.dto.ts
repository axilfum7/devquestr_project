import { IsString, IsUUID } from 'class-validator';

export class CreateQuestionDto {
  @IsUUID()
  direction_id: string;

  @IsUUID()
  level_id: string;

  @IsString()
  title: string;

  @IsString()
  answer: string;
}
