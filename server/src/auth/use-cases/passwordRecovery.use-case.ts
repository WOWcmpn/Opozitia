import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersQueryRepository } from '../../users/repositories/users.query-repository';
import { EmailManager } from '../../base/helpers/emailManager';

@Injectable()
export class PasswordRecoveryUseCase {
  constructor(
    private readonly usersQueryRepo: UsersQueryRepository,
    private readonly emailManager: EmailManager,
  ) {}

  async sendCode(email: string) {
    const user = await this.usersQueryRepo.getUserByEmail(email);
    if (!user) throw new BadRequestException([{ message: "Email doesn't exists", field: 'email' }]);
    await this.emailManager.sendPasswordRecovery(user.email, user.recoveryConfirmation.recoveryCode);
    return;
  }
}
