import { Injectable } from '@nestjs/common';
import { CreatePackSaveDto } from './dto/create-pack_save.dto';
import { UpdatePackSaveDto } from './dto/update-pack_save.dto';

@Injectable()
export class PackSaveService {
  create(createPackSaveDto: CreatePackSaveDto) {
    return 'This action adds a new packSave';
  }

  findAll() {
    return `This action returns all packSave`;
  }

  findOne(id: number) {
    return `This action returns a #${id} packSave`;
  }

  update(id: number, updatePackSaveDto: UpdatePackSaveDto) {
    return `This action updates a #${id} packSave`;
  }

  remove(id: number) {
    return `This action removes a #${id} packSave`;
  }
}
