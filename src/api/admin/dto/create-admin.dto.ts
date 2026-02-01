import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AdminRoles } from 'src/core/entity/admin.entity';

export class CreateAdminDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  phone_number: string;

  @IsOptional()
  @IsEnum(AdminRoles)
  role?: AdminRoles;
}
