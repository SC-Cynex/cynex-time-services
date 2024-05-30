import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { HourService } from './hour.service';
import { Prisma } from '@prisma/client';

@Controller('hour')
export class HourController {
  constructor(private readonly hourService: HourService) {}

  @Post()
  async create(
    @Body() createHourDto: Prisma.HourCreateInput
  ): Promise<{ status: string; message: string; statusCode: number }> {
    try {
      await this.hourService.create(createHourDto);
      return {        
        status: "success",
        message: "Hora registrada com sucesso",
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        status: "error",
        message: "Erro ao registrar a hora!",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get()
  findAll() {
    return this.hourService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hourService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHourDto: Prisma.HourUpdateInput) {
    return this.hourService.update(+id, updateHourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hourService.remove(+id);
  }
}
