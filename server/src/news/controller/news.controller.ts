import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { GetNewsUseCase } from '../use-cases/getNews.use-case';
import { NewsQueryRepository } from '../repositories/news.query-repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { newsCategory } from '../../base/types/newsModels';

@Controller('news')
export class NewsController {
  constructor(
    private readonly getNewsUseCase: GetNewsUseCase,
    private readonly newsQueryRepository: NewsQueryRepository,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  handleEveryHour() {
    return this.getNewsUseCase.getNews();
  }

  @Get('economika')
  @HttpCode(200)
  async findAllEconomic(@Query() query: { form: string; sortBy: string; pageNumber: number }) {
    const news = await this.newsQueryRepository.getAllNewsByCategory(
      newsCategory.Economy,
      query.form,
      query.sortBy,
      query.pageNumber,
    );
    const lastNews = await this.newsQueryRepository.getLastNewsSidebar(newsCategory.Economy);
    return { news, amount: news.length, sidebarNews: lastNews };
  }

  @Get('policy')
  @HttpCode(200)
  async findAllPolicy(@Query() query: { form: string; sortBy: string; pageNumber: number }) {
    const news = await this.newsQueryRepository.getAllNewsByCategory(
      newsCategory.Policy,
      query.form,
      query.sortBy,
      query.pageNumber,
    );
    const lastNews = await this.newsQueryRepository.getLastNewsSidebar(newsCategory.Policy);
    return { news, amount: news.length, sidebarNews: lastNews };
  }

  @Get('business')
  @HttpCode(200)
  async findAllBusiness(@Query() query: { form: string; sortBy: string; pageNumber: number }) {
    const news = await this.newsQueryRepository.getAllNewsByCategory(
      newsCategory.Business,
      query.form,
      query.sortBy,
      query.pageNumber,
    );
    const lastNews = await this.newsQueryRepository.getLastNewsSidebar(newsCategory.Business);
    return { news, amount: news.length, sidebarNews: lastNews };
  }

  @Get('world')
  @HttpCode(200)
  async getAllWorld(@Query() query: { form: string; sortBy: string; pageNumber: number }) {
    const news = await this.newsQueryRepository.getAllNewsByCategory(
      newsCategory.World,
      query.form,
      query.sortBy,
      query.pageNumber,
    );
    const lastNews = await this.newsQueryRepository.getLastNewsSidebar(newsCategory.World);
    return { news, amount: news.length, sidebarNews: lastNews };
  }

  @Get('last-news')
  @HttpCode(200)
  async getLastNews(@Query() query: { form: string; sortBy: string; pageNumber: number }) {
    const news = await this.newsQueryRepository.getAllLastNews(query.form, query.sortBy, query.pageNumber);
    const sidebarNews = await this.newsQueryRepository.getLastNewsSidebar('');
    return { news, amount: news.length, sidebarNews };
  }

  @Get('home')
  @HttpCode(200)
  async getLastNewsSidebar() {
    const news = await this.newsQueryRepository.getLastNewsSidebar('');
    const swipeNews = await this.newsQueryRepository.getSwipeNews();
    const mainNews = await this.newsQueryRepository.getMainNews();
    const bottomNewsOne = await this.newsQueryRepository.getBottomNews(3, 20);
    const bottomNewsTwo = await this.newsQueryRepository.getBottomNews(3, 22);
    const bottomNewsThree = await this.newsQueryRepository.getBottomNews(3, 24);
    return { news, amount: news.length, swipeNews, mainNews, bottomNewsOne, bottomNewsTwo, bottomNewsThree };
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    const singleNews = await this.newsQueryRepository.getNewsById(id);
    const lastNews = await this.newsQueryRepository.getLastNewsSidebar('');
    return { news: singleNews, sidebarNews: lastNews };
  }
}
