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
      return await this.pointRepository.findLastEightPointsByUserId(userId);
    } catch (error) {
      throw new Error(`Service Error: ${error.message}`);
    }
  }

  async findHistoricByUserId(userId: number, month: string): Promise<{ historic: PointEv[], bankHours: number }> {
    try {
      const historic = await this.pointRepository.findHistoricByUserId(userId, month);
      const bankHours = Math.round(this.calculateBankHours(historic));
      return { historic, bankHours };
    } catch (error) {
      throw new Error(`Service Error: ${error.message}`);
    }
  }

  private calculateBankHours(historic: PointEv[]): number {
    const expectedDailyHours = 8; // Por exemplo, 8 horas por dia de trabalho

    const workedHoursByDay = historic.reduce((acc, record) => {
      const date = record.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(record.hour);
      return acc;
    }, {});

    const totalWorkedHours = Object.values(workedHoursByDay).reduce((total, hours) => {
      const dailyWorkedHours = this.calculateDailyWorkedHours(hours);
      return total as number + dailyWorkedHours;
    }, 0);

    const totalDays = Object.keys(workedHoursByDay).length;
    const expectedHours = totalDays * expectedDailyHours;

    const bankHours = Number(totalWorkedHours) - Number(expectedHours);
    return bankHours;
  }

  private calculateDailyWorkedHours(hours: any): number {
    let totalHours = 0;

    for (let i = 0; i < hours.length; i += 2) {
      if (i + 1 < hours.length) {
        const startTime = this.convertTimeStringToHours(hours[i]);
        const endTime = this.convertTimeStringToHours(hours[i + 1]);
        totalHours += endTime - startTime;
      }
    }

    return totalHours;
  }

  private convertTimeStringToHours(time: string): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours + minutes / 60 + seconds / 3600;
  }
}