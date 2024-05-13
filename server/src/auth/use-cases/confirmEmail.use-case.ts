import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersQueryRepository } from '../../users/repositories/users.query-repository';
import { UsersRepository } from '../../users/repositories/users.repository';

@Injectable()
export class ConfirmEmailUseCase {
  constructor(
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async confirmEmail(confirmationCode: string) {
    const user = await this.usersQueryRepository.getUserByConfirmationCode(confirmationCode);
    if (!user) throw new BadRequestException([{ message: 'User not found', field: 'code' }]);
    if (user.isConfirmed)
      throw new BadRequestException([{ message: 'User already confirmed', field: 'code' }]);
    if (user.emailConfirmation.confirmationCode !== confirmationCode)
      throw new BadRequestException([{ message: 'Invalid confirmationCode', field: 'code' }]);
    if (user.emailConfirmation.expirationDate < new Date())
      throw new BadRequestException([{ message: 'expirationDate expired', field: 'code' }]);

    return await this.usersRepository.updateConfirmation(user.id);
  }
}
