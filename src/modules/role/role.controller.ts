import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { Prisma } from '@prisma/client';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(
    @Body() createRoleDto: Prisma.RoleCreateInput
  ): Promise<{ status: string; message: string; statusCode: number }> {
    try {
      await this.roleService.create(createRoleDto);
      return {        
        status: "success",
        message: "Cargo registrado com sucesso!",
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        status: "error",
        message: "Erro ao registrar o cargo!",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateRoleDto: Prisma.RoleUpdateInput
  ): Promise<{ status: string; message: string; statusCode: number }> {
    try {
      await this.roleService.update(+id, updateRoleDto);
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
      await this.roleService.remove(+id);
      return {
        status: "success",
        message: "Cargo deletado com sucesso!",
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        status: "error",
        message: "Erro ao deletar o cargo!",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
