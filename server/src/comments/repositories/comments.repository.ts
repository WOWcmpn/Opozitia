import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BottomCommentsEntity } from '../domain/bottomComments.entity';
import { BottomCommentModel } from '../../base/types/commentsModels';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(BottomCommentsEntity)
    private readonly bottomCommentsRepo: Repository<BottomCommentsEntity>,
  ) {}

  async createBottomComment(bottomComment: BottomCommentModel) {
    return await this.bottomCommentsRepo.insert(bottomComment);
  }
}
