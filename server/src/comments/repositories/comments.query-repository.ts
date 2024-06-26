import { InjectRepository } from '@nestjs/typeorm';
import { CommentsEntity } from '../domain/comments.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BottomCommentsEntity } from '../domain/bottomComments.entity';

@Injectable()
export class CommentsQueryRepository {
  constructor(
    @InjectRepository(CommentsEntity) private readonly commentsRepo: Repository<CommentsEntity>,
    @InjectRepository(BottomCommentsEntity)
    private readonly bottomCommentsRepo: Repository<BottomCommentsEntity>,
  ) {}

  async getCommentById(id: string) {
    return await this.commentsRepo.findOneBy({ id });
  }

  async getBottomComments(commentId: string) {
    return await this.bottomCommentsRepo
      .createQueryBuilder('c')
      .select(['c.id', 'c.text', 'c.username', 'c.viewDate', 'c.userImage'])
      .where('c.commentId = :commentId', { commentId })
      .orderBy('c.createdAt', 'ASC')
      .getMany();
  }

  async getCountComments(newsId: string) {
    return await this.commentsRepo
      .createQueryBuilder('c')
      .select()
      .where('c.newsId = :newsId', { newsId })
      .getCount();
  }
}
