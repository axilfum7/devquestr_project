import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackSaveService } from './pack_save.service';
import { PackSaveController } from './pack_save.controller';
import { PackSave } from 'src/core/entity/pack_save.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackSave])],
  controllers: [PackSaveController],
  providers: [PackSaveService],
})
export class PackSaveModule {}
