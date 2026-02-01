import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacksService } from './packs.service';
import { PacksController } from './packs.controller';
import { Pack } from 'src/core/entity/packs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pack])],
  controllers: [PacksController],
  providers: [PacksService],
})
export class PacksModule {}
