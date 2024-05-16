import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { CheckNewsForAddUseCase } from './checkNewsForAdd.use-case';
import { newsCategory } from '../../base/types/newsModels';
import moment from 'moment';

@Injectable()
export class GetNewsUseCase {
  constructor(private checkNewsForAddUseCase: CheckNewsForAddUseCase) {}

  async getNews() {
    await axios
      .get('https://www.mk.ru/economics/')
      .then((res) => {
        const $ = cheerio.load(res.data);
        $('.article-listing__item').each((i, elem) => {
          const link = $(elem).find('.listing-preview__content').attr('href');
          const title = $(elem).find('.listing-preview__content > .listing-preview__title').first().text();
          const imgUrl = $(elem).find('img').attr('src');
          const viewDate = $(elem).parent().parent().find('h2').text();
          const createdAtDate = new Date(moment(viewDate, 'DD MMMM YYYY', 'ru').format());
          const category = newsCategory.Economy;
          this.checkNewsForAddUseCase.checkNews({ title, link, imgUrl, createdAtDate, category, viewDate });
        });
      })
      .catch((error) => {
        console.error('Test: ', error);
      });

    await axios
      .get('https://www.mk.ru/politics/')
      .then((res) => {
        const $ = cheerio.load(res.data);
        $('.article-listing__item').each((i, elem) => {
          const link = $(elem).find('.listing-preview__content').attr('href');
          const title = $(elem).find('.listing-preview__content > .listing-preview__title').first().text();
          const imgUrl = $(elem).find('img').attr('src');
          const viewDate = $(elem).parent().parent().find('h2').text();
          const createdAtDate = new Date(moment(viewDate, 'DD MMMM YYYY', 'ru').format());
          const category = newsCategory.Policy;
          this.checkNewsForAddUseCase.checkNews({ title, link, imgUrl, createdAtDate, category, viewDate });
        });
      })
      .catch((error) => {
        console.error('Test: ', error);
      });

    await axios
      .get('https://finance.rambler.ru/business/')
      .then((res) => {
        const $ = cheerio.load(res.data);
        $('._4Niiv').each((i, elem) => {
          const link = $(elem).find('._1uRkW').attr('href');
          const title = $(elem).find('._2C1Rd').text();
          const imgUrl = $(elem).find('img').attr('src');
          const category = newsCategory.Business;
          this.checkNewsForAddUseCase.checkNewsRambler({ title, link, imgUrl, category });
        });
      })
      .catch((error) => {
        console.error('Test: ', error);
      });

    await axios
      .get('https://news.rambler.ru/world/')
      .then((res) => {
        const $ = cheerio.load(res.data);
        $('._4Niiv').each((i, elem) => {
          const link = $(elem).find('._1uRkW').attr('href');
          const title = $(elem).find('._2C1Rd').text();
          const imgUrl = $(elem).find('img').attr('src');
          const category = newsCategory.World;
          this.checkNewsForAddUseCase.checkNewsRambler({ title, link, imgUrl, category });
        });
      })
      .catch((error) => {
        console.error('Test: ', error);
      });
  }
}
