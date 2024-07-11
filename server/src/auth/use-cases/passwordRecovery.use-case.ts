import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersQueryRepository } from '../../users/repositories/users.query-repository';
import { EmailManager } from '../../base/helpers/emailManager';
import { add } from 'date-fns/add';
import { UsersRepository } from '../../users/repositories/users.repository';

@Injectable()
export class PasswordRecoveryUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly usersQueryRepo: UsersQueryRepository,
    private readonly emailManager: EmailManager,
  ) {}

  async sendCode(email: string) {
    const user = await this.usersQueryRepo.getUserByEmail(email);
    if (!user) throw new BadRequestException([{ message: "Email doesn't exists", field: 'email' }]);
    await this.emailManager.sendPasswordRecovery(user.email, user.recoveryConfirmation.recoveryCode);

    const newRecoveryCode = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');

    await this.usersRepo.updateRecoveryCode(user.id, newRecoveryCode);
    return { code: user.recoveryConfirmation.recoveryCode };
  }
}
