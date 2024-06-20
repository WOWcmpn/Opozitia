import { Injectable } from '@nestjs/common';
import { quizVotes } from '../../base/types/quizModels';
import { QuizQueryRepository } from '../repositories/quiz.query-repository';

@Injectable()
export class SendVoteUseCase {
  constructor(private readonly quizQueryRepository: QuizQueryRepository) {}

  async sendVote(login: string, inputVote: quizVotes, newsId: string) {
    const isExists = await this.quizQueryRepository.getVoteByLogin(login, newsId);
    if (isExists) {
      if (inputVote === isExists.vote) {
        return;
      }
      if (inputVote !== isExists.vote) {
        await this.quizQueryRepository.changeVote(newsId, login, inputVote, isExists.vote);
        return;
      }
    } else {
      await this.quizQueryRepository.createVote(newsId, inputVote, login);
      return;
    }
  }
}
