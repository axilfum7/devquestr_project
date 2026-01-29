import { PartialType } from '@nestjs/mapped-types';
import { CreatePackSaveDto } from './create-pack_save.dto';

export class UpdatePackSaveDto extends PartialType(CreatePackSaveDto) {}
