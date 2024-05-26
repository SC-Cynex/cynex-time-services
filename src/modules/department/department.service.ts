import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly departmentRepository: DepartmentRepository
  ) {}

  create(createDepartmentDto: Prisma.DepartmentCreateInput) {
    return this.departmentRepository.createDepartment(createDepartmentDto);
  }

  findAll() {
    return this.departmentRepository.getDepartments();
  }

  findOne(id: number) {
    return this.departmentRepository.getDepartmentById(id);
  }

  update(id: number, updateDepartmentDto: Prisma.DepartmentUpdateInput) {
    return this.departmentRepository.updateDepartment(id, updateDepartmentDto);
  }

  remove(id: number) {
    return this.departmentRepository.deleteDepartment(id);
  }
}
