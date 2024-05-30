import { Prisma, Hour } from "@prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";

const prisma = new PrismaService();

export class HourRepository {
    constructor(
    ) { }

    async createHour(data: Prisma.HourCreateInput): Promise<Hour> {
        try {
            return await prisma.hour.create({ data });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getHours(): Promise<Hour[]> {
        try {
            return await prisma.hour.findMany();
        } catch (error) {
            throw new Error(error);
        }
    }

    async getHourById(id: number): Promise<Hour | null> {
        try {
            return await prisma.hour.findUnique({ where: { id } });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateHour(id: number, data: Prisma.HourUpdateInput): Promise<Hour | null> {
        try {
            return await prisma.hour.update({ where: { id }, data });
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteHour(id: number): Promise<Hour | null> {
        try {
            return await prisma.hour.delete({ where: { id } });
        } catch (error) {
            throw new Error(error);
        }
    }
}
