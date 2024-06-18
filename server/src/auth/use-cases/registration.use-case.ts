import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailManager } from '../../base/helpers/emailManager';
import { UserEntity } from '../../users/domain/user.entity';
import { InputUserModel, ViewUserModel } from '../../base/types/userModels';
import { AuthService } from '../service/auth.service';
import { UsersQueryRepository } from '../../users/repositories/users.query-repository';
import { UsersRepository } from '../../users/repositories/users.repository';

@Injectable()
export class RegistrationUseCase {
  constructor(
    private readonly emailManager: EmailManager,
    private readonly authService: AuthService,
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createUserForRegistration(userModel: InputUserModel) {
    const isExistsEmail = await this.usersQueryRepository.getUserByEmail(userModel.email);
    const isExistsLogin = await this.usersQueryRepository.getUserByLogin(userModel.login);
    if (isExistsEmail)
      throw new BadRequestException([{ message: 'User with current email already exists', field: 'email' }]);
    if (isExistsLogin)
      throw new BadRequestException([{ message: 'User with current login already exists', field: 'login' }]);
    if (userModel.password !== userModel.confirmPassword) {
      throw new BadRequestException([{ message: "Passwords doesn't match", field: 'password' }]);
    } else {
      const passwordHash = await this.authService.createPasswordHash(userModel.password);
      const user: ViewUserModel = UserEntity.createUserFirstStep(userModel, passwordHash);
      await this.emailManager.sendEmailConfirmationCode(
        userModel.email,
        user.emailConfirmation.confirmationCode,
      );
      await this.usersRepository.createUser(user);
      return { code: user.emailConfirmation.confirmationCode };
    }
  }
}
