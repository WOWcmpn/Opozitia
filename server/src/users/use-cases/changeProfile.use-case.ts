import { BadRequestException, Injectable } from '@nestjs/common';
import { ChangeProfile } from '../../base/types/userModels';
import { UsersQueryRepository } from '../repositories/users.query-repository';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class ChangeProfileUseCase {
  constructor(
    private readonly usersQueryRepo: UsersQueryRepository,
    private readonly usersRepo: UsersRepository,
  ) {}

  async changeInformation(userId: string, data: ChangeProfile) {
    const user = await this.usersQueryRepo.getUserById(userId);
    let login: null | string = null;
    let email: null | string = null;

    if (data.email && data.email !== user?.email) {
      const isExists = await this.usersQueryRepo.getUserByEmail(data.email);
      if (isExists)
        throw new BadRequestException([
          { message: 'User with current email already exists', field: 'email' },
        ]);
      email = data.email;
    } else if (data.email === user?.email) {
      throw new BadRequestException([{ message: 'This already your email', field: 'email' }]);
    }

    if (data.login) {
      if (data.login === user?.login)
        throw new BadRequestException([{ message: 'This already your login', field: 'login' }]);
      const isExists = await this.usersQueryRepo.getUserByLogin(data.login);
      if (isExists)
        throw new BadRequestException([
          { message: 'User with current login already exists', field: 'login' },
        ]);
      login = data.login;
    }
    return await this.usersRepo.updateProfile(
      userId,
      login,
      email,
      data.location,
      data.age,
      data.favoriteNewsCategory,
    );
  }
}
