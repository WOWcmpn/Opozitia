import { Module } from '@nestjs/common';
import { QuizController } from './controller/quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from './domain/quiz.entity';
import { QuizQueryRepository } from './repositories/quiz.query-repository';
import { SendVoteUseCase } from './use-cases/sendVote.use-case';
import { AuthService } from '../auth/service/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuizEntity])],
  controllers: [QuizController],
  providers: [QuizQueryRepository, QuizQueryRepository, SendVoteUseCase, AuthService],
})
export class QuizModule {}
