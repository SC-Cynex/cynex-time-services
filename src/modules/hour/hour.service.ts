import { Injectable } from '@nestjs/common';
import { HourRepository } from './hour.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class HourService {
  constructor(
    private readonly hourRepository: HourRepository
  ) {}

  create(createHourDto: Prisma.HourCreateInput) {
    return this.hourRepository.createHour(createHourDto);
  }

  findAll() {
    return this.hourRepository.getHours();
  }

  findOne(id: number) {
    return this.hourRepository.getHourById(id);
  }

  update(id: number, updateHourDto: Prisma.HourUpdateInput) {
    return this.hourRepository.updateHour(id, updateHourDto);
  }

  remove(id: number) {
    return this.hourRepository.deleteHour(id);
  }
}
