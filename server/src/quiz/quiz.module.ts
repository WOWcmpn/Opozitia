import { Module } from '@nestjs/common';
import { QuizController } from './controller/quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from './domain/quiz.entity';
import { QuizQueryRepository } from './repositories/quiz.query-repository';
import { SendVoteUseCase } from './use-cases/sendVote.use-case';
import { AuthService } from '../auth/service/auth.service';
import { NewsEntity } from '../news/domain/news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizEntity, NewsEntity])],
  controllers: [QuizController],
  providers: [QuizQueryRepository, QuizQueryRepository, SendVoteUseCase, AuthService],
})
export class QuizModule {}
