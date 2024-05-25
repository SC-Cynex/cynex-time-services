import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Get('users')
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Post('register')
  async register(@Body() createAuthDto: Prisma.UserCreateInput): Promise<Prisma.UserCreateInput> {
    try {
      return await this.userService.createUser(createAuthDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string): Promise<string> {
    return await this.userService.login(email, password);
  }
}
