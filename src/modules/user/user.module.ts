import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService, 
    UserRepository, 
    JwtService,
    PrismaService
  ],
})
export class UserModule {}
