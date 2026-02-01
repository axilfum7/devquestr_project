import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectionService } from './direction.service';
import { DirectionController } from './direction.controller';
import { Direction } from 'src/core/entity/direction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Direction])],
  controllers: [DirectionController],
  providers: [DirectionService],
})
export class DirectionModule {}
