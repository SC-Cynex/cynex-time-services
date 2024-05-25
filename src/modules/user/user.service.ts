import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { Prisma, User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;
  private readonly secret = this.configService.get<string>('jwt.secret');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.getUsers();

    for (let user of users)
      delete user.password;

    return users;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const existingUser = await this.getUserByEmail(data.email);

    if (existingUser)
      throw new BadRequestException('User already exists');

    let userData: any = data;
    const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);
    userData.password = hashedPassword;

    const newUser = await this.userRepository.createUser(userData);
    return newUser;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.getUserByEmail(email);

    if (!user)
      throw new Error('Invalid credentials');

    const passwordMatches = await bcrypt.compare(password, );

    if (!passwordMatches)
      throw new Error('Invalid credentials');

    // Gerar token jwt e retornar
    const payload = { userId: user.id, email: user.email, role: user.name };
    return this.jwtService.sign(payload, { secret: this.secret });;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(email);
  }
}
