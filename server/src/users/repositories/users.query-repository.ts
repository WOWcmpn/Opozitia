import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domain/user.entity';
import { Repository } from 'typeorm';
import { favoriteNewsCategory } from '../../base/types/newsModels';

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

  async getAllUsersAdmin(
    login_like: string = '',
    _sort: string = 'createdAt',
    _order: 'ASC' | 'DESC' = 'DESC',
    category: favoriteNewsCategory | null,
    isConfirmed?: boolean,
  ) {
    if (isConfirmed) {
      if (!category) {
        return await this.usersRepository
          .createQueryBuilder('u')
          .select()
          .where('u.login ilike :login', { login: `%${login_like}%` })
          .andWhere('u.isConfirmed = :isConfirmed', { isConfirmed })
          .orderBy(`u.${_sort}`, _order)
          .getMany();
      } else {
        return await this.usersRepository
          .createQueryBuilder('u')
          .select()
          .where('u.favoriteNewsCategory = :category', { category })
          .andWhere('u.login ilike :login', { login: `%${login_like}%` })
          .andWhere('u.isConfirmed = :isConfirmed', { isConfirmed })
          .orderBy(`u.${_sort}`, _order)
          .getMany();
      }
    } else {
      if (!category) {
        return await this.usersRepository
          .createQueryBuilder('u')
          .select()
          .where('u.login ilike :login', { login: `%${login_like}%` })
          .orderBy(`u.${_sort}`, _order)
          .getMany();
      } else {
        return await this.usersRepository
          .createQueryBuilder('u')
          .select()
          .where('u.favoriteNewsCategory = :category', { category })
          .andWhere('u.login ilike :login', { login: `%${login_like}%` })
          .orderBy(`u.${_sort}`, _order)
          .getMany();
      }
    }
  }
}
