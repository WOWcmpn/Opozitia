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

  async createNewPassword(password: string, email: string) {
    const user = await this.usersQueryRepo.getUserByEmail(email);
    if (!user) throw new BadRequestException([{ message: 'User not found', field: 'login' }]);

    const newCode = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
    const newPassword = await this.authService.createPasswordHash(password);

    await this.usersRepo.updatePassword(user.id, newPassword);
    await this.usersRepo.updateRecoveryCode(user.id, newCode);
    return;
  }
}
