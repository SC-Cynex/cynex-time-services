import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PointService } from './point.service';
import { Prisma } from '@prisma/client';

@Controller('point')
export class PointController {
  constructor(
    private readonly pointService: PointService
  ) {}

  @Post()
  create(@Body() createPointDto: Prisma.PointEvCreateInput) {
    return this.pointService.create(createPointDto);
  }

  @Get()
  findAll() {
    return this.pointService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pointService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePointDto: Prisma.PointEvUpdateInput) {
    return this.pointService.update(+id, updatePointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pointService.remove(+id);
  }
}
