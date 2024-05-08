import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domain/user.entity';
import { Repository } from 'typeorm';
import { viewUserModel } from '../../base/types/userModels';
@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) {}

  async createUser(user: viewUserModel) {
    return await this.usersRepository.insert(user);
  }

  async updateConfirmation(userId: string) {
    return await this.usersRepository.update({ id: userId }, { isConfirmed: true });
  }
}
