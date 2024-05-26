import { Prisma, Team } from "@prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";

const prisma = new PrismaService();

export class TeamRepository {
    constructor() { }

    async createTeam(data: Prisma.TeamCreateInput): Promise<Team> {
        try {
            return prisma.team.create({ data });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTeams(): Promise<Team[]> {
        try {
            let teams = await prisma.team.findMany();
            return teams;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTeamById(id: number): Promise<Team | null> {
        try {
            return prisma.team.findUnique({ where: { id } });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateTeam(id: number, data: Prisma.TeamUpdateInput): Promise<Team | null> {
        return prisma.team.update({ where: { id }, data });
    }

    async deleteTeam(id: number): Promise<Team | null> {
        return prisma.team.delete({ where: { id } });
    }
}