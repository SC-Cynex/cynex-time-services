import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { DepartmentRepository } from './department.repository';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [DepartmentController],
  providers: [
    DepartmentService,
    DepartmentRepository,
    PrismaService
  ],
})
export class DepartmentModule {}
