import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from 'src/core/entity/like.entity';
import { BaseService } from 'src/infrastructure/baseService';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikeService {
  private readonly baseService: BaseService<CreateLikeDto, Like>;

  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {
    this.baseService = new BaseService<CreateLikeDto, Like>(
      this.likeRepository,
    );
  }

  private mapCreate(dto: CreateLikeDto) {
    return {
      user: { id: dto.user_id },
      question: { id: dto.question_id },
      liked_at: dto.liked_at ? new Date(dto.liked_at) : undefined,
    } as any;
  }

  private mapUpdate(dto: UpdateLikeDto) {
    const data: any = { ...dto };
    if (dto.user_id) {
      data.user = { id: dto.user_id };
      delete data.user_id;
    }
    if (dto.question_id) {
      data.question = { id: dto.question_id };
      delete data.question_id;
    }
    if (dto.liked_at) {
      data.liked_at = new Date(dto.liked_at);
    }
    return data;
  }

  create(createLikeDto: CreateLikeDto) {
    return this.baseService.create(this.mapCreate(createLikeDto));
  }

  findAll() {
    return this.baseService.findAll({ relations: ['user', 'question'] });
  }

  findOne(id: string) {
    return this.baseService.findOneById(id, { relations: ['user', 'question'] });
  }

  update(id: string, updateLikeDto: UpdateLikeDto) {
    return this.baseService.update(id, this.mapUpdate(updateLikeDto));
  }

  remove(id: string) {
    return this.baseService.delete(id);
  }
}
