import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from 'src/core/entity/level.entity';
import { BaseService } from 'src/infrastructure/baseService';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';

@Injectable()
export class LevelService {
  private readonly baseService: BaseService<CreateLevelDto, Level>;

  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {
    this.baseService = new BaseService<CreateLevelDto, Level>(
      this.levelRepository,
    );
  }

  create(createLevelDto: CreateLevelDto) {
    return this.baseService.create(createLevelDto);
  }

  findAll() {
    return this.baseService.findAll();
  }

  findOne(id: string) {
    return this.baseService.findOneById(id);
  }

  update(id: string, updateLevelDto: UpdateLevelDto) {
    return this.baseService.update(id, updateLevelDto);
  }

  remove(id: string) {
    return this.baseService.delete(id);
  }
}
