import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domain/user.entity';
import { Repository } from 'typeorm';
import { ViewUserModel } from '../../base/types/userModels';
import { favoriteNewsCategory } from '../../base/types/newsModels';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) {}

  async createUser(user: ViewUserModel) {
    return await this.usersRepository.insert(user);
  }

  async updateConfirmation(userId: string) {
    return await this.usersRepository.update({ id: userId }, { isConfirmed: true });
  }

  async updatePassword(userId: string, password: string) {
    return await this.usersRepository.update({ id: userId }, { passwordHash: password });
  }

  async updateProfile(
    userId: string,
    login: string,
    email: string,
    location: string,
    age: string,
    favoriteNewsCategory: favoriteNewsCategory,
  ) {
    if (!login && !email) {
      return await this.usersRepository.update({ id: userId }, { location, age, favoriteNewsCategory });
    } else if (login && email) {
      return await this.usersRepository.update(
        { id: userId },
        { login, email, location, age, favoriteNewsCategory },
      );
    } else if (login && !email) {
      return await this.usersRepository.update(
        { id: userId },
        { login, location, age, favoriteNewsCategory },
      );
    } else if (email && !login) {
      return await this.usersRepository.update(
        { id: userId },
        { email, location, age, favoriteNewsCategory },
      );
    }
  }
}
