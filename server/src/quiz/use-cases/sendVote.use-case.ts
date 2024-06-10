import { Injectable } from '@nestjs/common';
import { quizVotes } from '../../base/types/quizModels';
import { QuizQueryRepository } from '../repositories/quiz.query-repository';

@Injectable()
export class SendVoteUseCase {
  constructor(private readonly quizQueryRepository: QuizQueryRepository) {}

  async sendVote(userId: string, inputVote: quizVotes, newsId: string) {
    const isExists = await this.quizQueryRepository.getVoteByUserId(userId, newsId);
    if (isExists) {
      if (inputVote === isExists.vote) {
        return;
      }
      if (inputVote !== isExists.vote) {
        await this.quizQueryRepository.changeVote(newsId, userId, inputVote, isExists.vote);
        return;
      }
    } else {
      await this.quizQueryRepository.createVote(newsId, inputVote, userId);
      return;
    }
  }
}
