import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersQueryRepository } from '../../users/repositories/users.query-repository';
import { AuthService } from '../service/auth.service';
import { UsersRepository } from '../../users/repositories/users.repository';

@Injectable()
export class NewPasswordUseCase {
  constructor(
    private readonly usersQueryRepo: UsersQueryRepository,
    private readonly usersRepo: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async createNewPassword(password: string, code: string) {
    const user = await this.usersQueryRepo.getUserByRecoveryCode(code);
    if (!user) throw new BadRequestException([{ message: 'User not found', field: 'login' }]);
    if (user.recoveryConfirmation.recoveryCode !== code)
      throw new BadRequestException([{ message: 'RecoveryCode is false', field: 'recoveryCode' }]);
    if (user.recoveryConfirmation.expirationDate < new Date())
      throw new BadRequestException([{ message: 'Date has expired', field: 'expirationDate' }]);

    const newPassword = await this.authService.createPasswordHash(password);
    await this.usersRepo.updatePassword(user.id, newPassword);
    return;
  }
}
