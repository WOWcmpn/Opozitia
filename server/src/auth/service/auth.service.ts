import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async comparePasswords(inputPassword: string, passwordHash: string) {
    return await bcrypt.compare(inputPassword, passwordHash);
  }

  async getUserId(accessToken: string) {
    if (accessToken) {
      try {
        const user = await this.jwtService.verify(accessToken);
        return user.userId;
      } catch (error) {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async createPasswordHash(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async createAccessToken(userId: string) {
    return this.jwtService.sign({ userId }, { expiresIn: '10000h' });
  }

  async createRefreshToken(userId: string) {
    return this.jwtService.sign({ userId }, { expiresIn: '100h' });
  }

  async verifyToken(token: string) {
    if (!token) throw new UnauthorizedException();
    return this.jwtService.verify(token);
  }
}
