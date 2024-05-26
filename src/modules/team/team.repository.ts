import { Prisma, Team } from "@prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";

export class TeamRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async createTeam(data: Prisma.TeamCreateInput): Promise<Team> {
        try {
            return this.prisma.team.create({ data });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTeams(): Promise<Team[]> {
        try {
            let teams = await this.prisma.team.findMany();
            return teams;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTeamById(id: number): Promise<Team | null> {
        try {
            return this.prisma.team.findUnique({ where: { id } });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateTeam(id: number, data: Prisma.TeamUpdateInput): Promise<Team | null> {
        return this.prisma.team.update({ where: { id }, data });
    }

    async deleteTeam(id: number): Promise<Team | null> {
        return this.prisma.team.delete({ where: { id } });
    }
}