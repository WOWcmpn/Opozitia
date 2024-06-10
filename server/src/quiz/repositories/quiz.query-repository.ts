import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizEntity } from '../domain/quiz.entity';
import { quizVotes } from '../../base/types/quizModels';
import { NewsEntity } from '../../news/domain/news.entity';

@Injectable()
export class QuizQueryRepository {
  constructor(
    @InjectRepository(QuizEntity) private quizRepository: Repository<QuizEntity>,
    @InjectRepository(NewsEntity) private newsRepo: Repository<NewsEntity>,
  ) {}

  async getVoteByUserId(userId: string, newsId: string) {
    return await this.quizRepository.findOneBy({ userId, newsId });
  }

  async getVotesCountByNewsId(newsId: string, vote: quizVotes) {
    return await this.quizRepository.countBy({ newsId, vote });
  }

  async changeVote(newsId: string, userId: string, vote: quizVotes, prevVote: quizVotes) {
    if (prevVote === 'Поддерживаю')
      await this.newsRepo.update({ id: newsId }, { votePositive: () => 'votePositive - 1' });
    if (prevVote === 'Не поддерживаю')
      await this.newsRepo.update({ id: newsId }, { voteNegative: () => 'voteNegative - 1' });
    if (prevVote === 'Нейтрально')
      await this.newsRepo.update({ id: newsId }, { voteNeutral: () => 'voteNeutral - 1' });

    if (vote === 'Поддерживаю')
      await this.newsRepo.update({ id: newsId }, { votePositive: () => 'votePositive + 1' });
    if (vote === 'Не поддерживаю')
      await this.newsRepo.update({ id: newsId }, { voteNegative: () => 'voteNegative + 1' });
    if (vote === 'Нейтрально')
      await this.newsRepo.update({ id: newsId }, { voteNeutral: () => 'voteNeutral + 1' });

    await this.quizRepository.update({ userId }, { vote });
  }

  async createVote(newsId: string, vote: quizVotes, userId: string) {
    await this.quizRepository.insert({ newsId, vote, userId });
    if (vote === 'Поддерживаю')
      await this.newsRepo.update({ id: newsId }, { votePositive: () => 'votePositive + 1' });
    if (vote === 'Не поддерживаю')
      await this.newsRepo.update({ id: newsId }, { voteNegative: () => 'voteNegative + 1' });
    if (vote === 'Нейтрально')
      await this.newsRepo.update({ id: newsId }, { voteNeutral: () => 'voteNeutral + 1' });
  }
}
