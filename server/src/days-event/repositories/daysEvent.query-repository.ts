import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DaysEventEntity } from '../domain/daysEvent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DaysEventQueryRepository {
  constructor(
    @InjectRepository(DaysEventEntity) private readonly daysEventRepo: Repository<DaysEventEntity>,
  ) {}

  async getAll(title: string = '', sortBy: string = 'createdAt', orderBy: 'ASC' | 'DESC' = 'DESC') {
    return await this.daysEventRepo
      .createQueryBuilder('d')
      .select()
      .where('d.title ilike :title', { title: `%${title}%` })
      .orderBy(`d.${sortBy}`, orderBy)
      .getMany();
  }

  async getDaysEvent() {
    return await this.daysEventRepo
      .createQueryBuilder('d')
      .select()
      .where('d.isPublished != false')
      .getMany();
  }

  async getById(id: string) {
    return await this.daysEventRepo.findOneBy({ id });
  }
}
