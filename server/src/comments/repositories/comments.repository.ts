import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BottomCommentsEntity } from '../domain/bottomComments.entity';
import { BottomCommentModel, CommentModel } from '../../base/types/commentsModels';
import { Injectable } from '@nestjs/common';
import { CommentsEntity } from '../domain/comments.entity';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(BottomCommentsEntity)
    private readonly bottomCommentsRepo: Repository<BottomCommentsEntity>,
    @InjectRepository(CommentsEntity)
    private readonly commentsRepo: Repository<CommentsEntity>,
  ) {}

  async addComment(comment: CommentModel) {
    await this.commentsRepo.insert(comment);
    return;
  }

  async createBottomComment(bottomComment: BottomCommentModel) {
    return await this.bottomCommentsRepo.insert(bottomComment);
  }

  async deleteById(id: string) {
    return await this.commentsRepo.delete({ id });
  }

  async updateById(id: string, data: { text: string }) {
    return await this.commentsRepo.update({ id }, data);
  }
}
