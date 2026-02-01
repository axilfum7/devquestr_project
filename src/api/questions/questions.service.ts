import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from 'src/core/entity/questions.entity';
import { BaseService } from 'src/infrastructure/baseService';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  private readonly baseService: BaseService<CreateQuestionDto, Question>;

  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {
    this.baseService = new BaseService<CreateQuestionDto, Question>(
      this.questionRepository,
    );
  }

  private mapCreate(dto: CreateQuestionDto) {
    return {
      title: dto.title,
      answer: dto.answer,
      direction: { id: dto.direction_id },
      level: { id: dto.level_id },
    } as any;
  }

  private mapUpdate(dto: UpdateQuestionDto) {
    const data: any = { ...dto };
    if (dto.direction_id) {
      data.direction = { id: dto.direction_id };
      delete data.direction_id;
    }
    if (dto.level_id) {
      data.level = { id: dto.level_id };
      delete data.level_id;
    }
    return data;
  }

  create(createQuestionDto: CreateQuestionDto) {
    return this.baseService.create(this.mapCreate(createQuestionDto));
  }

  findAll() {
    return this.baseService.findAll({ relations: ['direction', 'level'] });
  }

  findOne(id: string) {
    return this.baseService.findOneById(id, { relations: ['direction', 'level'] });
  }

  update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return this.baseService.update(id, this.mapUpdate(updateQuestionDto));
  }

  remove(id: string) {
    return this.baseService.delete(id);
  }
}
