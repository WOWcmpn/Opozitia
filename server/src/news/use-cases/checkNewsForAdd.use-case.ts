import { Injectable } from '@nestjs/common';
import { newsEconomicModel } from '../../base/types/newsModels';
import { NewsRepository } from '../repositories/news.repository';
import { getFullNewsHelper, getFullNewsHelperRambler } from '../../base/helpers/getFullNews.helper';
import { NewsQueryRepository } from '../repositories/news.query-repository';

@Injectable()
export class CheckNewsForAddUseCase {
  constructor(
    private newsQueryRepository: NewsQueryRepository,
    private newsRepository: NewsRepository,
  ) {}

  async checkNews(news: newsEconomicModel) {
    const isExists = await this.newsQueryRepository.getNewsByTitle(news.title);
    if (isExists) {
      return;
    } else if (!isExists) {
      const fullNews = await getFullNewsHelper(news.link);
      setTimeout(() => {
        return this.newsRepository.addNews({
          link: news.link!,
          title: news.title!,
          imgUrl: news.imgUrl!,
          fullImgUrl: fullNews.fullImgUrl!,
          description: fullNews.description,
          createdAtTime: fullNews.createdAtTime,
          createdAtDate: news.createdAtDate!,
          category: news.category,
          viewDate: news.viewDate!,
        });
      }, 3000);
    }
  }

  async checkNewsRambler(news: newsEconomicModel) {
    const isExists = await this.newsQueryRepository.getNewsByTitle(news.title);
    if (isExists) {
      return;
    } else if (!isExists) {
      const fullNews = await getFullNewsHelperRambler(news.link);
      setTimeout(() => {
        return this.newsRepository.addNews({
          link: news.link!,
          title: news.title!,
          imgUrl: news.imgUrl!,
          fullImgUrl: fullNews.fullImgUrl,
          description: fullNews.description,
          createdAtTime: fullNews.createdAtTime,
          createdAtDate: fullNews.createdAtDate,
          category: news.category,
          viewDate: fullNews.viewDate,
        });
      }, 3000);
    }
  }
}
