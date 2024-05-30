import { Module } from '@nestjs/common';
import { HourService } from './hour.service';
import { HourController } from './hour.controller';
import { HourRepository } from './hour.repository';

@Module({
  controllers: [HourController],
  providers: [
    HourService,
    HourRepository,
  ],
})
export class HourModule {}
