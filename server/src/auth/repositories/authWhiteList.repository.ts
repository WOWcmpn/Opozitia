import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthWhiteListEntity } from '../domain/authWhiteList.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthWhiteListRepository {
  constructor(
    @InjectRepository(AuthWhiteListEntity) private authWhiteListRepository: Repository<AuthWhiteListEntity>,
  ) {}

  async createToken(token: string, userId: string) {
    return await this.authWhiteListRepository.insert({ token, userId });
  }

  async deleteToken(token: string) {
    return await this.authWhiteListRepository.delete({ token });
  }
}
