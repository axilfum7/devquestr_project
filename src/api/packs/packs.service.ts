import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pack } from 'src/core/entity/packs.entity';
import { BaseService } from 'src/infrastructure/baseService';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';

@Injectable()
export class PacksService {
  private readonly baseService: BaseService<CreatePackDto, Pack>;

  constructor(
    @InjectRepository(Pack)
    private readonly packRepository: Repository<Pack>,
  ) {
    this.baseService = new BaseService<CreatePackDto, Pack>(
      this.packRepository,
    );
  }

  private mapCreate(dto: CreatePackDto) {
    return {
      user: { id: dto.user_id },
      name: dto.name,
      description: dto.description,
      status: dto.status,
    } as any;
  }

  private mapUpdate(dto: UpdatePackDto) {
    const data: any = { ...dto };
    if (dto.user_id) {
      data.user = { id: dto.user_id };
      delete data.user_id;
    }
    return data;
  }

  create(createPackDto: CreatePackDto) {
    return this.baseService.create(this.mapCreate(createPackDto));
  }

  findAll() {
    return this.baseService.findAll({ relations: ['user'] });
  }

  findOne(id: string) {
    return this.baseService.findOneById(id, { relations: ['user'] });
  }

  update(id: string, updatePackDto: UpdatePackDto) {
    return this.baseService.update(id, this.mapUpdate(updatePackDto));
  }

  remove(id: string) {
    return this.baseService.delete(id);
  }
}
