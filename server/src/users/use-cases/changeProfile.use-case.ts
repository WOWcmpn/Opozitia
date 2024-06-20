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

  async changeInformation(data: ChangeProfile) {
    const user = await this.usersQueryRepo.getUserById(data.userId);
    let login: string = '';
    let email: string = '';

    if (data.email && data.email !== user?.email) {
      const isExists = await this.usersQueryRepo.getUserByEmail(data.email);
      if (isExists)
        throw new BadRequestException([
          { message: 'User with current email already exists', field: 'email' },
        ]);
      email = data.email;
    } else if (data.email === user?.email) {
      email = data.email;
      // throw new BadRequestException([{ message: 'This already your email', field: 'email' }]);
    }

    if (data.login) {
      if (data.login === user?.login) {
        login = data.login;
      } else if (data.login !== user?.login) {
        const isExists = await this.usersQueryRepo.getUserByLogin(data.login);
        if (isExists)
          throw new BadRequestException([
            { message: 'User with current login already exists', field: 'login' },
          ]);
      }
      login = data.login;
    }

    return await this.usersRepo.updateProfile(
      data.userId,
      login,
      email,
      data.location,
      data.age,
      data.favoriteNewsCategory,
    );
  }
}
