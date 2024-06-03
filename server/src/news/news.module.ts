import { Module } from '@nestjs/common';
import { NewsController } from './controller/news.controller';
import { GetNewsUseCase } from './use-cases/getNews.use-case';
import { CheckNewsForAddUseCase } from './use-cases/checkNewsForAdd.use-case';
import { NewsRepository } from './repositories/news.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from './domain/news.entity';
import { NewsQueryRepository } from './repositories/news.query-repository';
import { CreateNewsUseCase } from './use-cases/createNews.use-case';
import { QuizEntity } from '../quiz/domain/quiz.entity';
import { AuthService } from '../auth/service/auth.service';
import { CreateCommentUseCase } from './use-cases/createComment.use-case';
import { UsersQueryRepository } from '../users/repositories/users.query-repository';
import { CommentsEntity } from '../comments/domain/comments.entity';
import { UserEntity } from '../users/domain/user.entity';
import { GetWeatherUseCase } from './use-cases/getWeather.use-case';
import { GetCurrencyUseCase } from './use-cases/getCurrency.use-case';
import { CurrencyEntity } from './domain/currency.entity';
import { CurrencyRepo } from './repositories/currency.repo';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity, QuizEntity, CommentsEntity, UserEntity, CurrencyEntity])],
  controllers: [NewsController],
  providers: [
    GetNewsUseCase,
    CheckNewsForAddUseCase,
    CreateNewsUseCase,
    CreateCommentUseCase,
    GetWeatherUseCase,
    GetCurrencyUseCase,
    NewsRepository,
    NewsQueryRepository,
    UsersQueryRepository,
    CurrencyRepo,
    AuthService,
  ],
})
export class NewsModule {}
