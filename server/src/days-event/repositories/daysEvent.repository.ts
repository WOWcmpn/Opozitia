import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DaysEventEntity } from '../domain/daysEvent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DaysEventRepository {
  constructor(
    @InjectRepository(DaysEventEntity) private readonly daysEventRepo: Repository<DaysEventEntity>,
  ) {}

  async createDayEvent(data: { title: string; viewDate: string; createdAt: Date; isPublished: boolean }) {
    return await this.daysEventRepo.insert(data);
  }

  async updateDayEvent(id: string, data: { title: string; isPublished: boolean }) {
    return await this.daysEventRepo.update({ id }, data);
  }

  async deleteById(id: string) {
    return await this.daysEventRepo.delete({ id });
  }
}
