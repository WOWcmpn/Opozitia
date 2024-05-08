import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthBlackListRepository } from '../repositories/authBlackList.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly authBlackListRepository: AuthBlackListRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = req.cookies.refreshToken;
    if (!token) throw new UnauthorizedException();

    const isInvalid = await this.authBlackListRepository.findInvalidToken(token);
    if (isInvalid) throw new UnauthorizedException();

    try {
      await this.jwtService.verify(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
