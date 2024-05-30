import { Injectable } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  create(createAddressDto: Prisma.AddressCreateInput) {
    return this.addressRepository.createAddress(createAddressDto);
  }

  findAll() {
    return this.addressRepository.getAddresses();
  }

  findOne(id: number) {
    return this.addressRepository.getAddressById(id);
  }

  update(id: number, updateAddressDto: Prisma.AddressUpdateInput) {
    return this.addressRepository.updateAddress(id, updateAddressDto);
  }

  remove(id: number) {
    return this.addressRepository.deleteAddress(id);
  }
}
