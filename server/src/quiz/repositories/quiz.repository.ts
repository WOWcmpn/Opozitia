import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizEntity } from '../domain/quiz.entity';
import { Repository } from 'typeorm';
import { quizVotes } from '../../base/types/quizModels';

@Injectable()
export class QuizRepository {
  constructor(@InjectRepository(QuizEntity) private quizRepository: Repository<QuizEntity>) {}

  async createVote(voteStatus: quizVotes, newsId: string, userId: string) {
    return;
  }
}
