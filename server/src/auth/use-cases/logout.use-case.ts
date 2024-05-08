import { Injectable } from '@nestjs/common';
import { AuthWhiteListRepository } from '../repositories/authWhiteList.repository';
import { AuthBlackListRepository } from '../repositories/authBlackList.repository';

@Injectable()
export class LogoutUseCase {
  constructor(
    private readonly authWhiteListRepository: AuthWhiteListRepository,
    private readonly authBlackListRepository: AuthBlackListRepository,
  ) {}

  async logout(refreshToken: string) {
    await this.authBlackListRepository.blackList(refreshToken);
    await this.authWhiteListRepository.deleteToken(refreshToken);
    return;
  }
}
