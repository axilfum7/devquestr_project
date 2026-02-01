import { IsString } from 'class-validator';

export class CreateDirectionDto {
  @IsString()
  name: string;
}
