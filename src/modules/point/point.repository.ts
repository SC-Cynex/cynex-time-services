import { Prisma, PointEv } from "@prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";

const prisma = new PrismaService();

export class PointRepository {
  constructor() { }

  async createPoint(data: Prisma.PointEvCreateInput): Promise<PointEv> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const pointEv = await prisma.pointEv.create({ data });
          resolve(pointEv);
        } catch (error) {
          console.error(error);
        }
      }, 1000);
    });
  }

  async getPoints(): Promise<PointEv[]> {
    try {
      return await prisma.pointEv.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPointById(id: number): Promise<PointEv | null> {
    try {
      return await prisma.pointEv.findUnique({ where: { id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePoint(
    id: number,
    data: Prisma.PointEvUpdateInput
  ): Promise<PointEv | null> {
    try {
      return await prisma.pointEv.update({ where: { id }, data });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletePoint(id: number): Promise<PointEv | null> {
    try {
      return await prisma.pointEv.delete({ where: { id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findLastEightPointsByUserId(userId: number): Promise<PointEv[]> {
    try {
      return await prisma.pointEv.findMany({
        where: {
          userId: userId
        },
        take: 8,
        orderBy: {
          createdAt: 'desc'
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findHistoricByUserId(userId: number, month: string): Promise<PointEv[]> {
    try {
      const startDate = new Date(new Date().getFullYear(), parseInt(month) - 1, 1);
      const endDate = new Date(new Date().getFullYear(), parseInt(month), 0, 23, 59, 59);
  
      return await prisma.pointEv.findMany({
        where: {
          userId: userId,
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}