import { Prisma, Address } from "@prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";

const prisma = new PrismaService();

export class AddressRepository {
    constructor(
    ) { }

    async createAddress(data: Prisma.AddressCreateInput): Promise<Address> {
        try {
            return await prisma.address.create({ data });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAddresses(): Promise<Address[]> {
        try {
            let addresses = await prisma.address.findMany();
            return addresses;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAddressById(id: number): Promise<Address | null> {
        try {
            return await prisma.address.findUnique({ where: { id } });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateAddress(id: number, data: Prisma.AddressUpdateInput): Promise<Address | null> {
        return await prisma.address.update({ where: { id }, data });
    }

    async deleteAddress(id: number): Promise<Address | null> {
        return await prisma.address.delete({ where: { id } });
    }
}
