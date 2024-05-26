import { Injectable } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository
  ) {}

  create(createTeamDto: Prisma.TeamCreateInput) {
    return this.teamRepository.createTeam(createTeamDto);
  }

  findAll() {
    return this.teamRepository.getTeams();
  }

  findOne(id: number) {
    return this.teamRepository.getTeamById(id);
  }

  update(id: number, updateTeamDto: Prisma.TeamUpdateInput) {
    return this.teamRepository.updateTeam(id, updateTeamDto);
  }

  remove(id: number) {
    return this.teamRepository.deleteTeam(id);
  }
}
