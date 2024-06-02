import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Put } from '@nestjs/common';
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
        message: "Horário registrada com sucesso!",
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        status: "error",
        message: "Erro ao registrar o horário!",
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

  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateHourDto: Prisma.HourUpdateInput
  ): Promise<{ status: string; message: string; statusCode: number }> {
    try {
      await this.hourService.update(+id, updateHourDto);
      return {
        status: "success",
        message: "Horário atualizado com sucesso!",
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return{
        status: "error",
        message: "Erro ao atualizar o horário!",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ status: string; message: string; statusCode: number }> {
    try {
      await this.hourService.remove(+id);
      return {
        status: "success",
        message: "Horário deletado com sucesso!",
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        status: "error",
        message: "Erro ao deletar o horário!",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
