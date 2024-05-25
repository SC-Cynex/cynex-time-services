import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

export class UserRepository {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        try {
            return this.prisma.user.create({ data });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUsers(): Promise<User[]> {
        try {
            return this.prisma.user.findMany();
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            return this.prisma.user.findUnique({ where: { email } });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            return this.prisma.user.findUnique({ where: { id } });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User | null> {
        return this.prisma.user.update({ where: { id }, data });
    }

    async deleteUser(id: number): Promise<User | null> {
        return this.prisma.user.delete({ where: { id } });
    }
}