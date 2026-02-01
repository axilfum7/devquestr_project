import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/core/entity/users.entity';
import { BaseService } from 'src/infrastructure/baseService';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly baseService: BaseService<CreateUserDto, User>;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.baseService = new BaseService<CreateUserDto, User>(
      this.userRepository,
    );
  }

  private async mapCreate(dto: CreateUserDto) {
    return {
      full_name: dto.full_name,
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
      role: dto.role,
    } as any;
  }

  private async mapUpdate(dto: UpdateUserDto) {
    const data: any = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }
    return data;
  }

  async create(createUserDto: CreateUserDto) {
    return this.baseService.create(await this.mapCreate(createUserDto));
  }

  findAll() {
    return this.baseService.findAll();
  }

  findOne(id: string) {
    return this.baseService.findOneById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.baseService.update(id, await this.mapUpdate(updateUserDto));
  }

  remove(id: string) {
    return this.baseService.delete(id);
  }
}
