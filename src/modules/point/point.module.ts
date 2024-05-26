import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { PointRepository } from './point.repository';

@Module({
  controllers: [PointController],
  providers: [
    PointService,
    PointRepository
  ],
})
export class PointModule {}
