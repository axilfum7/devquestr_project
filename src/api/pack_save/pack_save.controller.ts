import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackSaveService } from './pack_save.service';
import { CreatePackSaveDto } from './dto/create-pack_save.dto';
import { UpdatePackSaveDto } from './dto/update-pack_save.dto';

@Controller('pack-save')
export class PackSaveController {
  constructor(private readonly packSaveService: PackSaveService) {}

  @Post()
  create(@Body() createPackSaveDto: CreatePackSaveDto) {
    return this.packSaveService.create(createPackSaveDto);
  }

  @Get()
  findAll() {
    return this.packSaveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packSaveService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackSaveDto: UpdatePackSaveDto) {
    return this.packSaveService.update(id, updatePackSaveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packSaveService.remove(id);
  }
}
