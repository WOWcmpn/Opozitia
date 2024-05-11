import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserModel } from '../../base/types/userModels';
import { UsersQueryRepository } from '../../users/repositories/users.query-repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CheckCredentialsUseCase {
  constructor(private readonly usersQueryRepository: UsersQueryRepository) {}

  async checkCredentials(inputData: LoginUserModel) {
    const user = await this.usersQueryRepository.getUserByEmail(inputData.email);
    if (!user) throw new UnauthorizedException();
    if (!user.isConfirmed) throw new UnauthorizedException();
    const comparePassword = await bcrypt.compare(inputData.password, user.passwordHash);

    if (!comparePassword) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
