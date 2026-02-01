import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePackDto {
  @IsUUID()
  user_id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
