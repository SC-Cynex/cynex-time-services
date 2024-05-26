import { Prisma, Role } from "@prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";

export class RoleRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async createRole(data: Prisma.RoleCreateInput): Promise<Role> {
        try {
            return this.prisma.role.create({ data });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getRoles(): Promise<Role[]> {
        try {
            let roles = await this.prisma.role.findMany();
            return roles;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getRoleById(id: number): Promise<Role | null> {
        try {
            return this.prisma.role.findUnique({ where: { id } });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateRole(id: number, data: Prisma.RoleUpdateInput): Promise<Role | null> {
        return this.prisma.role.update({ where: { id }, data });
    }

    async deleteRole(id: number): Promise<Role | null> {
        return this.prisma.role.delete({ where: { id } });
    }
}