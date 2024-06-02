import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";

const prisma = new PrismaService();

export class UserRepository {
  constructor(
  ) { }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return prisma.user.create({ data });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUsersWithNullTeamId(): Promise<User[]> {
    try {
      return await prisma.user.findMany({
        where: { teamId: null },
        include: {
          address: true,
          team: true,
          hour: true,
          Role: true,
          Department: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUsersByTeamId(teamId: number): Promise<User[]> {
    try {
      return await prisma.user.findMany({
        where: { teamId },
        include: {
          address: true,
          team: true,
          hour: true,
          Role: true,
          Department: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      let users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const user = await prisma.user.findUnique({ where: { email } });
            resolve(user);
          } catch (error) {
            reject(error);
          }
        }, 1500);
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      return prisma.user.findUnique({
        where: { id },
        include: {
          address: true,
          team: true,
          hour: true,
          Role: true,
          Department: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    try {
      return prisma.user.update({
        where: { id },
        data: {
          name: data.name,
          email: data.email,
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  

  async deleteUser(id: number): Promise<User | null> {
    return prisma.user.delete({ where: { id } });
  }
}
