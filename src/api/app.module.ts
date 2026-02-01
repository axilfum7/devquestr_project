import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { config } from '../config/index';
import { AdminModule} from './admin/admin.module'
import { DirectionModule} from './direction/direction.module'
import { LevelModule } from './level/level.module';
import { LikeModule } from './like/like.module';
import { PackSaveModule } from './pack_save/pack_save.module';
import { PacksModule } from './packs/packs.module';
import { QuestionsModule } from './questions/questions.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UserModule } from './user/user.module';
import { UserProgressModule } from './user_progress/user_progress.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guard/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: config.ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: config.ACCESS_TOKEN_TIME as StringValue },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DB_HOST,
      port: +config.DB_PORT,
      username: config.DB_USER,
      password: config.DB_PASS,
      database: config.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: ['dist/core/entity/*.entity{.ts,.js}'],
    }),
    AdminModule,
    DirectionModule,
    LevelModule,
    LikeModule,
    PackSaveModule,
    PacksModule, 
    QuestionsModule,
    ReviewsModule,
    UserModule,
    UserProgressModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
