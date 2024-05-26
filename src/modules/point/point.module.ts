import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { PointRepository } from './point.repository';

@Module({
  controllers: [PointController],
  providers: [
    PointService,
    PrismaService,
    PointRepository
  ],
})
export class PointModule {}
