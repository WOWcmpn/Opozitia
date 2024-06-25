import { Injectable } from '@nestjs/common';
import { newsEconomicModel } from '../../base/types/newsModels';
import { NewsRepository } from '../repositories/news.repository';
import { getFullNewsHelper, getFullNewsHelperRambler } from '../../base/helpers/getFullNews.helper';
import { NewsQueryRepository } from '../repositories/news.query-repository';
import wget from 'wget-improved';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

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
      const fullImgUuid = uuidv4();
      const fullNews = await getFullNewsHelper(news.link, fullImgUuid);
      setTimeout(() => {
        // let validFullImg = '';
        // try {
        //   const test = fs
        //     .readdirSync('../clientnext/public/img/fullImage-news')
        //     .find((img) => img === `${fullImgUuid}.webp`);
        //   validFullImg = test!;
        // } catch (error) {
        //   console.log('1 ', error);
        // }
        return this.newsRepository.addNews({
          link: news.link!,
          title: news.title!,
          imgUrl: news.imgUrl!,
          fullImgUrl: fullNews.fullImgUrl!,
          //fullImgUrl: validFullImg!,
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
    console.log(news);
    const isExists = await this.newsQueryRepository.getNewsByTitle(news.title);
    if (isExists) {
      return;
    } else if (!isExists) {
      const uuidImgUrl = uuidv4();
      const fullImgUuid = uuidv4();
      wget.download(news.imgUrl!, `../clientnext/public/img/preview-images/${uuidImgUrl}.webp`);
      const fullNews = await getFullNewsHelperRambler(news.link, fullImgUuid);
      setTimeout(() => {
        // const validImg = fs
        //   .readdirSync('../clientnext/public/img/preview-images')
        //   .find((img) => img === `${uuidImgUrl}.webp`);
        // let validFullImg = '';
        // try {
        //   const test2 = fs
        //     .readdirSync('../clientnext/public/img/fullImage-news')
        //     .find((img) => img === `${fullImgUuid}.webp`);
        //   validFullImg = test2!;
        // } catch (error) {
        //   console.log('2 ', error);
        // }

        return this.newsRepository.addNews({
          link: news.link!,
          title: news.title!,
          imgUrl: news.imgUrl!,
          fullImgUrl: fullNews.fullImgUrl,
          // imgUrl: validImg!,
          // fullImgUrl: validFullImg!,
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
