import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizEntity } from '../domain/quiz.entity';
import { quizVotes } from '../../base/types/quizModels';

@Injectable()
export class QuizQueryRepository {
  constructor(@InjectRepository(QuizEntity) private quizRepository: Repository<QuizEntity>) {}

  async getVoteByUserId(userId: string) {
    return await this.quizRepository.findOneBy({ userId });
  }

  async getVotesCountByNewsId(newsId: string, vote: quizVotes) {
    return await this.quizRepository.countBy({ newsId, vote });
  }

  async changeVote(userId: string, vote: quizVotes) {
    return await this.quizRepository.update({ userId }, { vote });
  }

  async createVote(newsId: string, vote: quizVotes, userId: string) {
    return await this.quizRepository.insert({ newsId, vote, userId });
  }
}
