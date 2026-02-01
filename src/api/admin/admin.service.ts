import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Admin } from 'src/core/entity/admin.entity';
import { BaseService } from 'src/infrastructure/baseService';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  private readonly baseService: BaseService<CreateAdminDto, Admin>;

  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {
    this.baseService = new BaseService<CreateAdminDto, Admin>(
      this.adminRepository,
    );
  }

  private async mapCreate(dto: CreateAdminDto) {
    return {
      username: dto.username,
      phone_number: dto.phone_number,
      hashed_password: await bcrypt.hash(dto.password, 10),
      role: dto.role,
    } as any;
  }

  private async mapUpdate(dto: UpdateAdminDto) {
    const data: any = { ...dto };
    if (dto.password) {
      data.hashed_password = await bcrypt.hash(dto.password, 10);
      delete data.password;
    }
    return data;
  }

  async create(createAdminDto: CreateAdminDto) {
    return this.baseService.create(await this.mapCreate(createAdminDto));
  }

  findAll() {
    return this.baseService.findAll();
  }

  findOne(id: string) {
    return this.baseService.findOneById(id);
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.baseService.update(id, await this.mapUpdate(updateAdminDto));
  }

  remove(id: string) {
    return this.baseService.delete(id);
  }
}
