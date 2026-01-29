import { Module } from '@nestjs/common';
import { PackSaveService } from './pack_save.service';
import { PackSaveController } from './pack_save.controller';

@Module({
  controllers: [PackSaveController],
  providers: [PackSaveService],
})
export class PackSaveModule {}
