import { BadRequestException, Injectable } from '@nestjs/common';
import { fullNewsModel, newsCategory } from '../../base/types/newsModels';
import { NewsQueryRepository } from '../repositories/news.query-repository';
import { NewsRepository } from '../repositories/news.repository';
import { formatTime } from '../../base/helpers/formatTime';
import { formatDate } from '../../base/helpers/formatDate';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateNewsUseCase {
  constructor(
    private readonly newsQueryRepo: NewsQueryRepository,
    private readonly newsRepo: NewsRepository,
  ) {}

  async createNews(title: string, description: string, category: newsCategory, img: string) {
    const isExists = await this.newsQueryRepo.getNewsByTitle(title);
    if (isExists) throw new BadRequestException([{ message: 'This news already exists', field: 'title' }]);
    const time = formatTime(new Date());
    const news: fullNewsModel = {
      link: uuidv4(),
      title: title,
      imgUrl: img,
      fullImgUrl: img,
      description: description,
      createdAtTime: time,
      createdAtDate: new Date(),
      category: category,
      viewDate: formatDate(new Date().toLocaleDateString()),
    };

    await this.newsRepo.addNews(news);
    return 'News have created';
  }
}
