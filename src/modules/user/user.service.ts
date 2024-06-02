import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserRepository } from "./user.repository";
import { Prisma, User } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  private readonly saltRounds = 10;
  private readonly secret = this.configService.get<string>("jwt.secret");

  constructor(
    private userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.getUsers();

    for (let user of users) delete user.password;

    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.getUserById(id);

    if (!user) throw new BadRequestException("User not found");

    delete user.password;

    return user;
  }

  async getUsersWithNullTeamId(): Promise<User[]> {
    const users = await this.userRepository.getUsersWithNullTeamId();

    for (let user of users) delete user.password;

    return users;
  }

  async getUsersByTeamId(teamId: number): Promise<User[]> {
    const users = await this.userRepository.getUsersByTeamId(teamId);

    for (let user of users) delete user.password;

    return users;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const existingUser = await this.getUserByEmail(data.email);

    if (existingUser)
      throw new BadRequestException(
        "Este email já está cadastrado. Por favor, use um email diferente."
      );

    let userData: any = data;
    const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);
    userData.password = hashedPassword;

    const newUser = await this.userRepository.createUser(userData);
    return newUser;
  }

  async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: number }> {
    const user = await this.getUserByEmail(email);

    if (!user) throw new Error("Credenciais inválidas");

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) throw new Error("Credenciais inválidas");

    const payload = { userId: user.id, email: user.email, role: user.name };
    return {
      token: this.jwtService.sign(payload, { secret: this.secret }),
      user: user.id,
    };
  }

  async deleteUser(id: number): Promise<User> {
    return this.userRepository.deleteUser(id);
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    try {
      return this.userRepository.updateUser(parseInt(id, 10), data);
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(email);
  }
}
