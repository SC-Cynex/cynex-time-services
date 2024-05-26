import { Prisma, Role } from "@prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";

const prisma = new PrismaService();

export class RoleRepository {
    constructor(
    ) { }

    async createRole(data: Prisma.RoleCreateInput): Promise<Role> {
        try {
            return await prisma.role.create({ data });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getRoles(): Promise<Role[]> {
        try {
            return await prisma.role.findMany();;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getRoleById(id: number): Promise<Role | null> {
        try {
            return await prisma.role.findUnique({ where: { id } });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateRole(id: number, data: Prisma.RoleUpdateInput): Promise<Role | null> {
        return await prisma.role.update({ where: { id }, data });
    }

    async deleteRole(id: number): Promise<Role | null> {
        return await prisma.role.delete({ where: { id } });
    }
}