import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domain/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersQueryRepository {
  constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) {}

  async getUserById(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async getUserByLogin(login: string) {
    return await this.usersRepository.findOneBy({ login });
  }

  async getUserByConfirmationCode(confirmationCode: string) {
    return await this.usersRepository
      .createQueryBuilder('u')
      .where(`u.emailConfirmation ->>'confirmationCode' = :code`, { code: confirmationCode })
      .getOne();
  }

  async getUserByRecoveryCode(recoveryCode: string) {
    return await this.usersRepository
      .createQueryBuilder('u')
      .where(`u.recoveryConfirmation ->>'recoveryCode' = :code`, { code: recoveryCode })
      .getOne();
  }

  async getUserProfileByLogin(login: string) {
    return await this.usersRepository
      .createQueryBuilder('u')
      .select(['u.email', 'u.login', 'u.age', 'u.location', 'u.favoriteNewsCategory'])
      .where('u.login = :login', { login })
      .getOne();
  }

  async getUserProfile(userId: string) {
    return await this.usersRepository
      .createQueryBuilder('u')
      .select(['u.email', 'u.login', 'u.age', 'u.location', 'u.favoriteNewsCategory'])
      .where('u.id = :userId', { userId })
      .getOne();
  }
}
