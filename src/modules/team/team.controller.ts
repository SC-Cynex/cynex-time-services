import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Put } from '@nestjs/common';
import { TeamService } from './team.service';
import { Prisma, Team } from '@prisma/client';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(
    @Body() createTeamDto: Prisma.TeamCreateInput
  ): Promise<{ status: string; message: string; statusCode: number }> {
    try {
      await this.teamService.create(createTeamDto);
      return {        
        status: "success",
        message: "Equipe registrada com sucesso!",
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        status: "error",
        message: "Erro ao registrar a equipe!",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get()
  async findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Team | null> {
    return this.teamService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTeamDto: Prisma.TeamUpdateInput
  ): Promise<{ status: string; message: string; statusCode: number }> {
    try {
      await this.teamService.update(+id, updateTeamDto);
      return {
        status: "success",
        message: "Equipe atualizado com sucesso!",
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return{
        status: "error",
        message: "Erro ao atualizar o equipe!",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ status: string; message: string; statusCode: number }> {
    try {
      await this.teamService.remove(+id);
      return {
        status: "success",
        message: "Equipe deletada com sucesso!",
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        status: "error",
        message: "Erro ao deletar a equipe!",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
