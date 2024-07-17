import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { GetNewsUseCase } from '../use-cases/getNews.use-case';
import { NewsQueryRepository } from '../repositories/news.query-repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateNews, CreateNewsAdmin, newsCategory, UpdateNews } from '../../base/types/newsModels';
import { CreateNewsUseCase } from '../use-cases/createNews.use-case';
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NewsRepository } from '../repositories/news.repository';
import { GetWeatherUseCase } from '../use-cases/getWeather.use-case';

@Controller('news')
@ApiTags('News')
export class NewsController {
  constructor(
    private readonly getNewsUseCase: GetNewsUseCase,
    private readonly newsQueryRepository: NewsQueryRepository,
    private readonly newsRepo: NewsRepository,
    private readonly createNewsUseCase: CreateNewsUseCase,
    private readonly getWeatherUseCase: GetWeatherUseCase,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  handleNews() {
    return this.getNewsUseCase.getNews();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  handleImg() {
    return this.newsRepo.updateFullImg();
  }

  @Get()
  @HttpCode(200)
  async getAllAdmin(
    @Query()
    query: {
      title_like: string;
      id_like: string;
      _sort: string;
      _order: 'asc' | 'desc';
      category: newsCategory;
      isPublished: string;
    },
  ) {
    let isPublished: boolean;
    let sortBy: 'ASC' | 'DESC';
    if (query.isPublished === 'true') {
      isPublished = true;
      if (!query._order) {
        sortBy = 'DESC';
        return await this.newsQueryRepository.getAll(
          query.title_like,
          query.id_like,
          query._sort,
          sortBy,
          query.category,
          isPublished,
        );
      } else if (query._order === 'asc') {
        sortBy = 'ASC';
        return await this.newsQueryRepository.getAll(
          query.title_like,
          query.id_like,
          query._sort,
          sortBy,
          query.category,
          isPublished,
        );
      } else {
        sortBy = 'DESC';
        return await this.newsQueryRepository.getAll(
          query.title_like,
          query.id_like,
          query._sort,
          sortBy,
          query.category,
          isPublished,
        );
      }
    } else if (query.isPublished === 'false') {
      isPublished = false;
      if (!query._order) {
        sortBy = 'DESC';
        return await this.newsQueryRepository.getAll(
          query.title_like,
          query.id_like,
          query._sort,
          sortBy,
          query.category,
          isPublished,
        );
      } else if (query._order === 'asc') {
        sortBy = 'ASC';
        return await this.newsQueryRepository.getAll(
          query.title_like,
          query.id_like,
          query._sort,
          sortBy,
          query.category,
          isPublished,
        );
      } else {
        sortBy = 'DESC';
        return await this.newsQueryRepository.getAll(
          query.title_like,
          query.id_like,
          query._sort,
          sortBy,
          query.category,
          isPublished,
        );
      }
    } else {
      if (!query._order) {
        sortBy = 'DESC';
        return await this.newsQueryRepository.getAll(
          query.title_like,
          query.id_like,
          query._sort,
          sortBy,
          query.category,
          null,
        );
      } else if (query._order === 'asc') {
        sortBy = 'ASC';
        return await this.newsQueryRepository.getAll(
          query.title_like,
          query.id_like,
          query._sort,
          sortBy,
          query.category,
          null,
        );
      } else {
        sortBy = 'DESC';
        return await this.newsQueryRepository.getAll(
          query.title_like,
          query.id_like,
          query._sort,
          sortBy,
          query.category,
          null,
        );
      }
    }
  }

  @Patch(':id')
  @HttpCode(204)
  async updateNewsAdmin(@Param('id') id: string, @Body() data: UpdateNews) {
    return await this.newsRepo.updateNews(id, data);
  }

  @Post()
  @HttpCode(201)
  async createNewsByAdmin(@Body() inputData: CreateNewsAdmin) {
    return await this.createNewsUseCase.createNewsAdmin(
      inputData.title,
      inputData.description,
      inputData.category,
      inputData.imgUrl,
      inputData.fullImgUrl,
      inputData.isPublished,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteByAdmin(@Param('id') id: string) {
    return await this.newsRepo.deleteNews(id);
  }

  @Get('weather')
  @HttpCode(200)
  async getWeather(@Query() inputCity: { city: string }) {
    let city: string = inputCity.city;
    if (inputCity.city === 'Неизвестно' || !inputCity.city) {
      city = 'Кишинев';
    }
    return await this.getWeatherUseCase.getWeather(city);
  }

  @Get('amount')
  @HttpCode(200)
  async getAmountOfCategory(@Query() query: { category: string }) {
    return await this.newsQueryRepository.getAmountOfCategory(query.category);
  }

  @Get('sidebar')
  @HttpCode(200)
  async getSidebar(@Query() query: { category: newsCategory }) {
    return await this.newsQueryRepository.getLastNewsSidebar(query.category);
  }

  @Get('policy')
  @HttpCode(200)
  async findAllPolicy(@Query() query: { pageNumber: number; pageSize: number; sorting?: string }) {
    return await this.newsQueryRepository.getAllNewsByCategory(
      newsCategory.Policy,
      query.pageNumber,
      query.pageSize,
      query.sorting,
    );
  }

  @Get('business')
  @HttpCode(200)
  async findAllBusiness(@Query() query: { pageNumber: number; pageSize: number; sorting?: string }) {
    return await this.newsQueryRepository.getAllNewsByCategory(
      newsCategory.Business,
      query.pageNumber,
      query.pageSize,
      query.sorting,
    );
  }

  @Get('economy')
  @HttpCode(200)
  async findAllEconomic(@Query() query: { pageNumber: number; pageSize: number; sorting?: string }) {
    return await this.newsQueryRepository.getAllNewsByCategory(
      newsCategory.Economy,
      query.pageNumber,
      query.pageSize,
      query.sorting,
    );
  }

  @Get('world')
  @HttpCode(200)
  async getAllWorld(@Query() query: { pageNumber: number; pageSize: number; sorting?: string }) {
    return await this.newsQueryRepository.getAllNewsByCategory(
      newsCategory.World,
      query.pageNumber,
      query.pageSize,
      query.sorting,
    );
  }

  @Get('amount-last')
  @HttpCode(200)
  async getAmountOfLast() {
    return await this.newsQueryRepository.getAmountOfLast();
  }

  @Get('last-news')
  @HttpCode(200)
  async getLastNews(@Query() query: { pageNumber: number; pageSize: number; sorting?: string }) {
    return await this.newsQueryRepository.getAllLastNews(query.pageNumber, query.pageSize, query.sorting);
  }

  @Get('home')
  @HttpCode(200)
  async getLastNewsSidebar() {
    const news = await this.newsQueryRepository.getLastNewsSidebar('');
    const swipeNews = await this.newsQueryRepository.getSwipeNews();
    const mainNews = await this.newsQueryRepository.getMainNews();
    const bottomNewsOne = await this.newsQueryRepository.getBottomNews(5, 2);
    const bottomNewsTwo = await this.newsQueryRepository.getBottomNews(5, 8);
    const bottomNewsThree = await this.newsQueryRepository.getBottomNews(5, 13);
    return { amount: news.length, news, swipeNews, mainNews, bottomNewsOne, bottomNewsTwo, bottomNewsThree };
  }

  @Get('category')
  @HttpCode(200)
  async getByCategory(@Query() query: { pageNumber: number; pageSize: number; category: string }) {
    return await this.newsQueryRepository.getNewsByCategory(query.pageNumber, query.pageSize, query.category);
  }

  @Get('category/:id')
  @HttpCode(200)
  async getByCategoryById(@Param('id') id: string) {
    return await this.newsQueryRepository.getNewsByCategoryById(id);
  }

  @Get('search')
  @HttpCode(200)
  async findBySearch(@Query() query: { searchNameTerm: string; pageNumber: number }) {
    return await this.newsQueryRepository.getBySearch(query.searchNameTerm, query.pageNumber);
  }

  @Get('search-count')
  @HttpCode(200)
  async countSearch(@Query() query: { searchNameTerm: string }) {
    return await this.newsQueryRepository.getCountSearch(query.searchNameTerm);
  }

  @Post('create-news')
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Create news by users' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateNews })
  @HttpCode(201)
  async createNews(@Body() inputData: CreateNews) {
    return await this.createNewsUseCase.createNews(
      inputData.title,
      inputData.description,
      inputData.category,
      inputData.file,
    );
  }

  @Get(':id/votes')
  @HttpCode(200)
  async getNewsVotes(@Param('id') id: string) {
    return await this.newsQueryRepository.getNewsVotes(id);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.newsQueryRepository.getNewsById(id);
  }
}
