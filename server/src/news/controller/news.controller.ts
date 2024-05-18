import {
  Body,
  Controller,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentModel } from '../../base/types/commentsModels';
import { AuthService } from '../../auth/service/auth.service';
import { Request } from 'express';
import { CreateCommentUseCase } from '../use-cases/createComment.use-case';

@Controller('news')
@ApiTags('News')
export class NewsController {
  constructor(
    private readonly getNewsUseCase: GetNewsUseCase,
    private readonly newsQueryRepository: NewsQueryRepository,
    private readonly createNewsUseCase: CreateNewsUseCase,
    private readonly authService: AuthService,
    private readonly createCommentUseCase: CreateCommentUseCase,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  handleEveryHour() {
    return this.getNewsUseCase.getNews();
  }

  @Get('policy')
  @HttpCode(200)
  async findAllPolicy(@Query() query: { sortBy: string; pageNumber: number }) {
    const news = await this.newsQueryRepository.getAllNewsByCategory(
      newsCategory.Policy,
      query.sortBy,
      query.pageNumber,
    );
    const lastNews = await this.newsQueryRepository.getLastNewsSidebar(newsCategory.Policy);
    return { amount: news.length, news, sidebarNews: lastNews };
  }

  @Get('business')
  @HttpCode(200)
  async findAllBusiness(@Query() query: { sortBy: string; pageNumber: number }) {
    const news = await this.newsQueryRepository.getAllNewsByCategory(
      newsCategory.Business,
      query.sortBy,
      query.pageNumber,
    );
    const lastNews = await this.newsQueryRepository.getLastNewsSidebar(newsCategory.Business);
    return { amount: news.length, news, sidebarNews: lastNews };
  }

  @Get('economika')
  @HttpCode(200)
  async findAllEconomic(@Query() query: { sortBy: string; pageNumber: number }) {
    const news = await this.newsQueryRepository.getAllNewsByCategory(
      newsCategory.Economy,
      query.sortBy,
      query.pageNumber,
    );
    const lastNews = await this.newsQueryRepository.getLastNewsSidebar(newsCategory.Economy);
    return { amount: news.length, news, sidebarNews: lastNews };
  }

  @Get('world')
  @HttpCode(200)
  async getAllWorld(@Query() query: { sortBy: string; pageNumber: number }) {
    const news = await this.newsQueryRepository.getAllNewsByCategory(
      newsCategory.World,
      query.sortBy,
      query.pageNumber,
    );
    const lastNews = await this.newsQueryRepository.getLastNewsSidebar(newsCategory.World);
    return { amount: news.length, news, sidebarNews: lastNews };
  }

  @Get('last-news')
  @HttpCode(200)
  async getLastNews(@Query() query: { sortBy: string; pageNumber: number }) {
    const news = await this.newsQueryRepository.getAllLastNews(query.sortBy, query.pageNumber);
    const sidebarNews = await this.newsQueryRepository.getLastNewsSidebar('');
    return { amount: news.length, news, sidebarNews };
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

  @Get('search')
  @HttpCode(200)
  async findBySearch(@Query() query: { searchNameTerm: string }) {
    const data = await this.newsQueryRepository.getBySearch(query.searchNameTerm);
    if (data.news.length === 0) throw new NotFoundException();
    return { amount: data.count, news: data.news };
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    const singleNews = await this.newsQueryRepository.getNewsById(id);
    const lastNews = await this.newsQueryRepository.getLastNewsSidebar('');
    return { news: singleNews, sidebarNews: lastNews };
  }

  @Post('create-news')
  @UseGuards(AccessTokenGuard)
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
    @UploadedFile(new ParseFilePipe({ validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })] }))
    file: Express.Multer.File,
    @Body() createNewsTest: CreateNews,
  ) {
    return await this.createNewsUseCase.createNews(
      createNewsTest.title,
      createNewsTest.description,
      createNewsTest.category,
      file.filename,
    );
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
}
