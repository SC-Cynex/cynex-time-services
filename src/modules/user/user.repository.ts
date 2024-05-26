import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";

const prisma = new PrismaService();

export class UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        try {
            return prisma.user.create({ data });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUsers(): Promise<User[]> {
        try {
            let users = await prisma.user.findMany();
            debugger
            return users;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            return prisma.user.findUnique({ where: { email } });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            return prisma.user.findUnique({ where: { id } });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateUser(
        id: number,
        data: Prisma.UserUpdateInput
    ): Promise<User | null> {
        return prisma.user.update({ where: { id }, data });
    }

    async deleteUser(id: number): Promise<User | null> {
        return prisma.user.delete({ where: { id } });
    }
}
