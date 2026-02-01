import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProgress } from 'src/core/entity/user_progress.entity';
import { BaseService } from 'src/infrastructure/baseService';
import { CreateUserProgressDto } from './dto/create-user_progress.dto';
import { UpdateUserProgressDto } from './dto/update-user_progress.dto';

@Injectable()
export class UserProgressService {
  private readonly baseService: BaseService<CreateUserProgressDto, UserProgress>;

  constructor(
    @InjectRepository(UserProgress)
    private readonly userProgressRepository: Repository<UserProgress>,
  ) {
    this.baseService = new BaseService<CreateUserProgressDto, UserProgress>(
      this.userProgressRepository,
    );
  }

  private mapCreate(dto: CreateUserProgressDto) {
    return {
      user: { id: dto.user_id },
      question: { id: dto.question_id },
      learned: dto.learned,
      learned_at: dto.learned_at ? new Date(dto.learned_at) : undefined,
    } as any;
  }

  private mapUpdate(dto: UpdateUserProgressDto) {
    const data: any = { ...dto };
    if (dto.user_id) {
      data.user = { id: dto.user_id };
      delete data.user_id;
    }
    if (dto.question_id) {
      data.question = { id: dto.question_id };
      delete data.question_id;
    }
    if (dto.learned_at) {
      data.learned_at = new Date(dto.learned_at);
    }
    return data;
  }

  create(createUserProgressDto: CreateUserProgressDto) {
    return this.baseService.create(this.mapCreate(createUserProgressDto));
  }

  findAll() {
    return this.baseService.findAll({ relations: ['user', 'question'] });
  }

  findOne(id: string) {
    return this.baseService.findOneById(id, { relations: ['user', 'question'] });
  }

  update(id: string, updateUserProgressDto: UpdateUserProgressDto) {
    return this.baseService.update(id, this.mapUpdate(updateUserProgressDto));
  }

  remove(id: string) {
    return this.baseService.delete(id);
  }
}
