import { Injectable } from '@nestjs/common';
import { PointRepository } from './point.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class PointService {
  constructor(
    private readonly pointRepository: PointRepository
  ) {}

  create(createPointDto: Prisma.PointEvCreateInput) {
    return this.pointRepository.createPoint(createPointDto);
  }

  findAll() {
    return this.pointRepository.getPoints();
  }

  findOne(id: number) {
    return this.pointRepository.getPointById(id);
  }

  update(id: number, updatePointDto: Prisma.PointEvUpdateInput) {
    return this.pointRepository.updatePoint(id, updatePointDto);
  }

  remove(id: number) {
    return this.pointRepository.deletePoint(id);
  }
}
