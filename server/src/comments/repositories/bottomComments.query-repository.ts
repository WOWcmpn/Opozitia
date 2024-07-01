import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BottomCommentsEntity } from '../domain/bottomComments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BottomCommentsQueryRepository {
  constructor(
    @InjectRepository(BottomCommentsEntity)
    private readonly bottomCommentsRepo: Repository<BottomCommentsEntity>,
  ) {}

  async getAll(
    username: string = '',
    text: string = '',
    sort: string = 'createdAt',
    order: 'ASC' | 'DESC' = 'DESC',
  ) {
    return await this.bottomCommentsRepo
      .createQueryBuilder('c')
      .select()
      .where('c.username ilike :username', { username: `%${username}%` })
      .andWhere('c.text ilike :text', { text: `%${text}%` })
      .orderBy(`c.${sort}`, order)
      .getMany();
  }

  async getById(id: string) {
    return await this.bottomCommentsRepo.findOneBy({ id });
  }
}
