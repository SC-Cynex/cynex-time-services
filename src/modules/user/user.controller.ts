import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string): Promise<string> {
    return await this.userService.login(email, password);
  }
}
