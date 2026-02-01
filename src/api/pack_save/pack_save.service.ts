import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackSave } from 'src/core/entity/pack_save.entity';
import { BaseService } from 'src/infrastructure/baseService';
import { CreatePackSaveDto } from './dto/create-pack_save.dto';
import { UpdatePackSaveDto } from './dto/update-pack_save.dto';

@Injectable()
export class PackSaveService {
  private readonly baseService: BaseService<CreatePackSaveDto, PackSave>;

  constructor(
    @InjectRepository(PackSave)
    private readonly packSaveRepository: Repository<PackSave>,
  ) {
    this.baseService = new BaseService<CreatePackSaveDto, PackSave>(
      this.packSaveRepository,
    );
  }

  private mapCreate(dto: CreatePackSaveDto) {
    return {
      pack: { id: dto.pack_id },
      question: { id: dto.question_id },
      added_at: dto.added_at ? new Date(dto.added_at) : undefined,
    } as any;
  }

  private mapUpdate(dto: UpdatePackSaveDto) {
    const data: any = { ...dto };
    if (dto.pack_id) {
      data.pack = { id: dto.pack_id };
      delete data.pack_id;
    }
    if (dto.question_id) {
      data.question = { id: dto.question_id };
      delete data.question_id;
    }
    if (dto.added_at) {
      data.added_at = new Date(dto.added_at);
    }
    return data;
  }

  create(createPackSaveDto: CreatePackSaveDto) {
    return this.baseService.create(this.mapCreate(createPackSaveDto));
  }

  findAll() {
    return this.baseService.findAll({ relations: ['pack', 'question'] });
  }

  findOne(id: string) {
    return this.baseService.findOneById(id, { relations: ['pack', 'question'] });
  }

  update(id: string, updatePackSaveDto: UpdatePackSaveDto) {
    return this.baseService.update(id, this.mapUpdate(updatePackSaveDto));
  }

  remove(id: string) {
    return this.baseService.delete(id);
  }
}
