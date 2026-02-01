import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from 'src/core/entity/reviews.entity';
import { BaseService } from 'src/infrastructure/baseService';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  private readonly baseService: BaseService<CreateReviewDto, Review>;

  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {
    this.baseService = new BaseService<CreateReviewDto, Review>(
      this.reviewRepository,
    );
  }

  private mapCreate(dto: CreateReviewDto) {
    return {
      user: { id: dto.user_id },
      question: { id: dto.question_id },
      viewed_at: dto.viewed_at ? new Date(dto.viewed_at) : undefined,
    } as any;
  }

  private mapUpdate(dto: UpdateReviewDto) {
    const data: any = { ...dto };
    if (dto.user_id) {
      data.user = { id: dto.user_id };
      delete data.user_id;
    }
    if (dto.question_id) {
      data.question = { id: dto.question_id };
      delete data.question_id;
    }
    if (dto.viewed_at) {
      data.viewed_at = new Date(dto.viewed_at);
    }
    return data;
  }

  create(createReviewDto: CreateReviewDto) {
    return this.baseService.create(this.mapCreate(createReviewDto));
  }

  findAll() {
    return this.baseService.findAll({ relations: ['user', 'question'] });
  }

  findOne(id: string) {
    return this.baseService.findOneById(id, { relations: ['user', 'question'] });
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.baseService.update(id, this.mapUpdate(updateReviewDto));
  }

  remove(id: string) {
    return this.baseService.delete(id);
  }
}
