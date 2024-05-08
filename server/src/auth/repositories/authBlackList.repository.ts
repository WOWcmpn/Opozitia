import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthBlackListEntity } from '../domain/authBlackList.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthBlackListRepository {
  constructor(
    @InjectRepository(AuthBlackListEntity) private authBlackListRepository: Repository<AuthBlackListEntity>,
  ) {}

  async blackList(refreshToken: string) {
    return await this.authBlackListRepository.insert({ token: refreshToken });
  }

  async findInvalidToken(token: string) {
    return await this.authBlackListRepository.findOneBy({ token });
  }
}
