import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Direction } from 'src/core/entity/direction.entity';
import { BaseService } from 'src/infrastructure/baseService';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';

@Injectable()
export class DirectionService {
  private readonly baseService: BaseService<CreateDirectionDto, Direction>;

  constructor(
    @InjectRepository(Direction)
    private readonly directionRepository: Repository<Direction>,
  ) {
    this.baseService = new BaseService<CreateDirectionDto, Direction>(
      this.directionRepository,
    );
  }

  create(createDirectionDto: CreateDirectionDto) {
    return this.baseService.create(createDirectionDto);
  }

  findAll() {
    return this.baseService.findAll();
  }

  findOne(id: string) {
    return this.baseService.findOneById(id);
  }

  update(id: string, updateDirectionDto: UpdateDirectionDto) {
    return this.baseService.update(id, updateDirectionDto);
  }

  remove(id: string) {
    return this.baseService.delete(id);
  }
}
