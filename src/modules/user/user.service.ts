import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  async getUserByEmail(email: string): Promise<User | null> {
    return this.userR.getUserByEmail(email);
  }

  async login(email: string, password: string): Promise<ILoginResponse> {
    const user = await this.getUserByEmail(email);

    if (!user)
      throw new Error('Invalid credentials');

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches)
      throw new Error('Invalid credentials');

    // Criação da sessão ao fazer login
    const session = await this.createSession(user.id.toString());
    return { accessToken: session.accessToken, refreshToken: session.refreshToken };
  }
}
