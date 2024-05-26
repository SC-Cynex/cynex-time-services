import { Injectable } from "@nestjs/common";
import { PointRepository } from "./point.repository";
import { Prisma } from "@prisma/client";
import { PointEv } from '@prisma/client';


@Injectable()
export class PointService {
  constructor(private readonly pointRepository: PointRepository) {}

  async create(createPointDto: Prisma.PointEvCreateInput) {
    try {
      return await this.pointRepository.createPoint(createPointDto);
    } catch (error) {
      throw new Error(`Service Error: ${error.message}`);
    }
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

  async findLastEightPointsByUserId(userId: number): Promise<PointEv[]> {
    try {
      // Chame o método correspondente do repositório para buscar os últimos 8 registros de ponto
      return await this.pointRepository.findLastEightPointsByUserId(userId);
    } catch (error) {
      throw new Error(`Service Error: ${error.message}`);
    }
  }
  
}
