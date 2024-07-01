import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from '../domain/news.entity';
import { Repository } from 'typeorm';
import { fullNewsModel, UpdateNews } from '../../base/types/newsModels';
import { CommentsEntity } from '../../comments/domain/comments.entity';
import { CommentModel } from '../../base/types/commentsModels';

@Injectable()
export class NewsRepository {
  constructor(
    @InjectRepository(NewsEntity) private readonly newsRepository: Repository<NewsEntity>,
    @InjectRepository(CommentsEntity) private readonly commentsRepo: Repository<CommentsEntity>,
  ) {}

  async deleteNews(id: string) {
    return await this.newsRepository.delete({ id });
  }

  async updateNews(id: string, data: UpdateNews) {
    return await this.newsRepository.update({ id }, data);
  }

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
      .set({ imgUrl: 'https://i.ytimg.com/vi/lSO0b8n_8BA/maxresdefault.jpg' })
      .where('imgUrl IS NULL')
      .execute();

    return await this.newsRepository
      .createQueryBuilder()
      .update()
      .set({ fullImgUrl: 'https://i.ytimg.com/vi/lSO0b8n_8BA/maxresdefault.jpg' })
      .where('fullImgUrl IS NULL')
      .execute();
  }
}
