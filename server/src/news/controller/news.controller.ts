import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetNewsUseCase } from '../use-cases/getNews.use-case';
import { NewsQueryRepository } from '../repositories/news.query-repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateNews, newsCategory } from '../../base/types/newsModels';
import { AccessTokenGuard } from '../../auth/guards/accessToken.guard';
import { CreateNewsUseCase } from '../use-cases/createNews.use-case';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from '../../base/helpers/storage';
import { ApiTags, ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCommentModel } from '../../base/types/commentsModels';
import { AuthService } from '../../auth/service/auth.service';
import { Request } from 'express';
import { CreateCommentUseCase } from '../use-cases/createComment.use-case';
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
    private readonly authService: AuthService,
    private readonly createCommentUseCase: CreateCommentUseCase,
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
  async getAmountOfCategory(@Query() query: { category: string; sorting?: string }) {
    return await this.newsQueryRepository.getAmountOfCategory(query.category, query.sorting);
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
    const bottomNewsOne = await this.newsQueryRepository.getBottomNews(3, 20);
    const bottomNewsTwo = await this.newsQueryRepository.getBottomNews(3, 22);
    const bottomNewsThree = await this.newsQueryRepository.getBottomNews(3, 24);
    return { amount: news.length, news, swipeNews, mainNews, bottomNewsOne, bottomNewsTwo, bottomNewsThree };
  }

  @Get('category')
  @HttpCode(200)
  async getByCategory(@Query() query: { pageNumber: number; pageSize: number; category: string }) {
    return await this.newsQueryRepository.getNewsByCategory(query.pageNumber, query.pageSize, query.category);
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
  // @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file', { storage: fileStorage }))
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Create news by user' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data', 'string')
  @ApiBody({ type: CreateNews })
  @HttpCode(201)
  async createNews(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() inputData: CreateNews,
  ) {
    return await this.createNewsUseCase.createNews(
      inputData.title,
      inputData.description,
      inputData.category,
      file.filename,
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

  @Get(':id/comments')
  @HttpCode(200)
  async getComments(@Param('id') id: string, @Query() query: { pageNumber: number }) {
    return await this.newsQueryRepository.getComments(id, query.pageNumber);
  }

  @Post(':newsId/comments')
  @UseGuards(AccessTokenGuard)
  @HttpCode(201)
  async createComment(
    @Param('newsId') newsId: string,
    @Body() data: CreateCommentModel,
    @Req() req: Request,
  ) {
    const userId = await this.authService.getUserId(req.headers.authorization!.split(' ')[1]);
    return await this.createCommentUseCase.create(newsId, data.text, userId);
  }

  @Post(':newsId/test')
  @HttpCode(201)
  async createComment1(@Param('newsId') newsId: string, @Body('data') data: CreateCommentModel) {
    return await this.createCommentUseCase.create(newsId, data.text, data.login);
  }
}
