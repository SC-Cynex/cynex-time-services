// src/seed/seed.service.ts

import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";
import { RoleNames, Address } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaService();

@Injectable()
export class SeedService implements OnModuleInit {
  constructor() {}

  async onModuleInit() {
    await this.seedRoles();
    await this.seedDepartments();
    await this.seedTeams();
    await this.seedAddress();
    await this.seedAdminUser();
  }

  async seedRoles() {
    const roles: RoleNames[] = [
      RoleNames.EMPLOYEE,
      RoleNames.MANAGER,
      RoleNames.ADMIN,
    ];
    for (const roleName of roles) {
      // Verificar se a role já existe antes de criar
      const existingRole = await prisma.role.findFirst({
        where: { name: roleName },
      });
      if (!existingRole) {
        await prisma.role.create({
          data: { name: roleName, accessLevel: roleName },
        });
      }
    }
  }

  async seedDepartments() {
    const departments = ["HR", "Engineering", "Sales"];
    for (const departmentName of departments) {
      // Verificar se o departamento já existe antes de criar
      const existingDepartment = await prisma.department.findFirst({
        where: { name: departmentName },
      });
      if (!existingDepartment) {
        await prisma.department.create({
          data: { name: departmentName },
        });
      }
    }
  }

  async seedTeams() {
    const teams = ["Alpha", "Beta", "Gamma"];
    for (const teamName of teams) {
      // Verificar se o time já existe antes de criar
      const existingTeam = await prisma.team.findFirst({
        where: { name: teamName },
      });
      if (!existingTeam) {
        await prisma.team.create({
          data: { name: teamName },
        });
      }
    }
  }

  async seedAddress() {
    // Verificar se já existe um endereço no banco de dados
    const existingAddress = await prisma.address.findFirst();
    if (!existingAddress) {
      const newAddress: Omit<Address, "id"> = {
        street: "Rua Principal 123",
        city: "Joinville",
        state: "Santa Catarina",
        zipCode: "89450-568",
        neighborhood: "Itaum",
        number: "123",
      };
      await prisma.address.create({
        data: newAddress,
      });
    }
  }

  async seedAdminUser() {
    // Verificar se já existe um usuário admin
    const existingAdmin = await prisma.user.findFirst({
      where: { email: "admin@gmail.com" },
    });
    if (!existingAdmin) {
      // Criar um novo usuário admin
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const adminRole = await prisma.role.findFirst({
        where: { name: RoleNames.ADMIN },
      });
      if (adminRole) {
        await prisma.user.create({
          data: {
            name: "Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            roleId: adminRole.id,
          },
        });
      }
    }
  }
}
