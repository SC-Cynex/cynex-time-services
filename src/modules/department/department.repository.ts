import { Prisma, Department } from "@prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";

export class DepartmentRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async createDepartment(data: Prisma.DepartmentCreateInput): Promise<Department> {
        try {
            return this.prisma.department.create({ data });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getDepartments(): Promise<Department[]> {
        try {
            let departments = await this.prisma.department.findMany();
            return departments;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getDepartmentById(id: number): Promise<Department | null> {
        try {
            return this.prisma.department.findUnique({ where: { id } });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateDepartment(id: number, data: Prisma.DepartmentUpdateInput): Promise<Department | null> {
        return this.prisma.department.update({ where: { id }, data });
    }

    async deleteDepartment(id: number): Promise<Department | null> {
        return this.prisma.department.delete({ where: { id } });
    }
}