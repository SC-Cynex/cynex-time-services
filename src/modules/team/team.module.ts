import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TeamRepository } from './team.repository';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [TeamController],
  providers: [
    TeamService,
    TeamRepository,
    PrismaService
  ],
})
export class TeamModule {}
