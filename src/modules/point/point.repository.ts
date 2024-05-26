import { Prisma, PointEv } from "@prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";

export class PointRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async createPoint(data: Prisma.PointEvCreateInput): Promise<PointEv> {
        try {
            return this.prisma.pointEv.create({ data });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getPoints(): Promise<PointEv[]> {
        try {
            return this.prisma.pointEv.findMany();
        } catch (error) {
            throw new Error(error);
        }
    }

    async getPointById(id: number): Promise<PointEv | null> {
        try {
            return this.prisma.pointEv.findUnique({ where: { id } });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updatePoint(id: number, data: Prisma.PointEvUpdateInput): Promise<PointEv | null> {
        try {
            return this.prisma.pointEv.update({ where: { id }, data });
        } catch (error) {
            throw new Error(error);
        }
    }

    async deletePoint(id: number): Promise<PointEv | null> {
        try {
            return this.prisma.pointEv.delete({ where: { id } });
        } catch (error) {
            throw new Error(error);
        }
    }
}