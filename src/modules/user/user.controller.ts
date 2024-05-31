import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Prisma, User } from "@prisma/client";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("users")
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<User> {
    return await this.userService.getUserById(+id);
  }

  @Post("register")
  async register(
    @Body() createAuthDto: Prisma.UserCreateInput
  ): Promise<{ status: string; message: string }> {
    try {
      await this.userService.createUser(createAuthDto);
      return { status: "success", message: "Usuário registrado com sucesso" };
    } catch (error) {
      throw new HttpException(
        "Internal server error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post("login")
  async login(
    @Body("email") email: string,
    @Body("password") password: string
  ): Promise<{
    status: string;
    message: string;
    statusCode: number;
    token: string;
    user: number;
  }> {
    try {
      const token = await this.userService.login(email, password);
      return {
        status: "success",
        message: "Login realizado com sucesso!",
        token: token.token,
        user: token.user,
        statusCode: HttpStatus.ACCEPTED,
      };
    } catch (error) {
      if (error.message === "Credenciais inválidas") {
        throw new HttpException(
          "Credenciais inválidas",
          HttpStatus.UNAUTHORIZED
        );
      } else {
        throw new HttpException(
          "Erro interno no servidor",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string): Promise<User> {
    return await this.userService.deleteUser(+id);
  }
}
