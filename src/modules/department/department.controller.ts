import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
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
        message: "Departamento registrado com sucesso",
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: Prisma.DepartmentUpdateInput) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
