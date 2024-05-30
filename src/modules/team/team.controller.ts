import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
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
        message: "Equipe registrada com sucesso",
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTeamDto: Prisma.TeamUpdateInput): Promise<Team | null> {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Team | null> {
    return this.teamService.remove(+id);
  }
}
