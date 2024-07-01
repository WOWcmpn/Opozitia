import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BottomCommentsEntity } from '../domain/bottomComments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BottomCommentsRepository {
  constructor(
    @InjectRepository(BottomCommentsEntity)
    private readonly bottomCommentsRepo: Repository<BottomCommentsEntity>,
  ) {}

  async updateByAdmin(id: string, data: { text: string }) {
    return await this.bottomCommentsRepo.update({ id }, data);
  }
}
