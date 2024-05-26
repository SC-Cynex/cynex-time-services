import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository
  ) {}

  create(createRoleDto: Prisma.RoleCreateInput) {
    return this.roleRepository.createRole(createRoleDto);
  }

  findAll() {
    return this.roleRepository.getRoles();
  }

  findOne(id: number) {
    return this.roleRepository.getRoleById(id);
  }

  update(id: number, updateRoleDto: Prisma.RoleUpdateInput) {
    return this.roleRepository.updateRole(id, updateRoleDto);
  }

  remove(id: number) {
    return this.roleRepository.deleteRole(id);
  }
}
