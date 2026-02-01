import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProgressService } from './user_progress.service';
import { UserProgressController } from './user_progress.controller';
import { UserProgress } from 'src/core/entity/user_progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProgress])],
  controllers: [UserProgressController],
  providers: [UserProgressService],
})
export class UserProgressModule {}
