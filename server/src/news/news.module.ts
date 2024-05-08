import { Module } from '@nestjs/common';
import { NewsController } from './controller/news.controller';
import { GetNewsUseCase } from './use-cases/getNews.use-case';
import { CheckNewsForAddUseCase } from './use-cases/checkNewsForAdd.use-case';
import { NewsRepository } from './repositories/news.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from './domain/news.entity';
import { NewsQueryRepository } from './repositories/news.query-repository';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity])],
  controllers: [NewsController],
  providers: [GetNewsUseCase, CheckNewsForAddUseCase, NewsRepository, NewsQueryRepository],
})
export class NewsModule {}
