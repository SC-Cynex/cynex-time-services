// src/seed/seed.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { RoleNames } from '@prisma/client';

const prisma = new PrismaService();

@Injectable()
export class SeedService implements OnModuleInit {
    constructor() { }

    async onModuleInit() {
        await this.seedRoles();
        await this.seedDepartments();
        await this.seedTeams();
    }

    async seedRoles() {
        const roles: RoleNames[] = [RoleNames.EMPLOYEE, RoleNames.MANAGER, RoleNames.ADMIN];
        for (const roleName of roles) {
            // Verificar se a role já existe antes de criar
            const existingRole = await prisma.role.findFirst({ where: { name: roleName } });
            if (!existingRole) {
                await prisma.role.create({
                    data: { name: roleName }
                });
            }
        }
    }

    async seedDepartments() {
        const departments = ['HR', 'Engineering', 'Sales'];
        for (const departmentName of departments) {
            // Verificar se o departamento já existe antes de criar
            const existingDepartment = await prisma.department.findFirst({ where: { name: departmentName } });
            if (!existingDepartment) {
                await prisma.department.create({
                    data: { name: departmentName }
                });
            }
        }
    }

    async seedTeams() {
        const teams = ['Alpha', 'Beta', 'Gamma'];
        for (const teamName of teams) {
            // Verificar se o time já existe antes de criar
            const existingTeam = await prisma.team.findFirst({ where: { name: teamName } });
            if (!existingTeam) {
                await prisma.team.create({
                    data: { name: teamName }
                });
            }
        }
    }
}