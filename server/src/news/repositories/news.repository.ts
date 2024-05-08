import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from '../domain/news.entity';
import { Repository } from 'typeorm';
import { fullNewsModel } from '../../base/types/newsModels';

@Injectable()
export class NewsRepository {
  constructor(@InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>) {}

  async addNews(news: fullNewsModel) {
    return this.newsRepository.insert(news);
  }
}
