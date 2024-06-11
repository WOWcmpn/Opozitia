import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from '../domain/news.entity';
import { Repository } from 'typeorm';
import { fullNewsModel } from '../../base/types/newsModels';
import { CommentsEntity } from '../../comments/domain/comments.entity';
import { CommentModel } from '../../base/types/commentsModels';

@Injectable()
export class NewsRepository {
  constructor(
    @InjectRepository(NewsEntity) private readonly newsRepository: Repository<NewsEntity>,
    @InjectRepository(CommentsEntity) private readonly commentsRepo: Repository<CommentsEntity>,
  ) {}

  async addNews(news: fullNewsModel) {
    return this.newsRepository.insert(news);
  }

  async addComment(comment: CommentModel) {
    await this.commentsRepo.insert(comment);
    return;
  }

  async updateFullImg() {
    await this.newsRepository
      .createQueryBuilder()
      .update()
      .set({ imgUrl: 'hq720.jpg' })
      .where('imgUrl IS NULL')
      .execute();

    return await this.newsRepository
      .createQueryBuilder()
      .update()
      .set({ fullImgUrl: 'hq720.jpg' })
      .where('fullImgUrl IS NULL')
      .execute();
  }
}
