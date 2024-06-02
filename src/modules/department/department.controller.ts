import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Put } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Prisma } from '@prisma/client';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(
    @Body() createDepartmentDto: Prisma.DepartmentCreateInput
  ): Promise<{ status: string; message: string; statusCode: number }> {
    try {
      await this.departmentService.create(createDepartmentDto);
      return {        
        status: "success",
        message: "Departamento registrado com sucesso!",
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        status: "error",
        message: "Erro ao registrar o departamento!",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateDepartmentDto: Prisma.DepartmentUpdateInput
  ): Promise<{ status: string; message: string; statusCode: number }> {
    try {
      await this.departmentService.update(+id, updateDepartmentDto);
      return {
        status: "success",
        message: "Departamento atualizado com sucesso!",
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return{
        status: "error",
        message: "Erro ao atualizar o departamento!",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ status: string; message: string; statusCode: number }> {
    try {
      await this.departmentService.remove(+id);
      return {
        status: "success",
        message: "Departamento deletado com sucesso!",
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        status: "error",
        message: "Erro ao deletar o departamento!",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
