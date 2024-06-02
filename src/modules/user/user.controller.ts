import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  BadRequestException,
  Put
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

  @Get("User/null")
  async getUsersWithNullTeamId(): Promise<User[]> {
    try {
      return await this.userService.getUsersWithNullTeamId();
    } catch (error) {
      throw new HttpException(
        "Erro ao buscar usuários com teamId nulo",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<User> {
    return await this.userService.getUserById(+id);
  }

  @Get("team/:teamId")
  async getUsersByTeamId(@Param("teamId") teamId: string): Promise<User[]> {
    try {
      return await this.userService.getUsersByTeamId(+teamId);
    } catch (error) {
      throw new HttpException(
        "Erro ao buscar usuários pelo teamId",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post("register")
  async register(
    @Body() createAuthDto: Prisma.UserCreateInput
  ): Promise<{ status: string; message: string }> {
    try {
      await this.userService.createUser(createAuthDto);
      return { status: "success", message: "Usuário registrado com sucesso" };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } 
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
    team: number;
  }> {
    try {
      const token = await this.userService.login(email, password);
      return {
        status: "success",
        message: "Login realizado com sucesso!",
        token: token.token,
        user: token.user,
        team: token.team,
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

  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: Prisma.UserUpdateInput
  ): Promise<{ status: string; message: string; statusCode: number }> {
    try {
      await this.userService.update(+id, updateUserDto);
      return {
        status: "success",
        message: "Usuário atualizado com sucesso!",
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return{
        status: "error",
        message: "Erro ao atualizar o usuário!",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string): Promise<User> {
    return await this.userService.deleteUser(+id);
  }
}
