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

  async getAllVotes() {
    return await this.quizRepository.find();
  }

  async getVoteByLogin(login: string, newsId: string) {
    return await this.quizRepository.findOneBy({ login, newsId });
  }

  async getVotesCountByNewsId(newsId: string, vote: quizVotes) {
    return await this.quizRepository.countBy({ newsId, vote });
  }

  async changeVote(newsId: string, login: string, vote: quizVotes, prevVote: quizVotes) {
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

    await this.quizRepository.update({ login }, { vote });
  }

  async createVote(newsId: string, vote: quizVotes, login: string) {
    await this.quizRepository.insert({ newsId, vote, login });
    if (vote === 'Поддерживаю')
      await this.newsRepo.update({ id: newsId }, { votePositive: () => 'votePositive + 1' });
    if (vote === 'Не поддерживаю')
      await this.newsRepo.update({ id: newsId }, { voteNegative: () => 'voteNegative + 1' });
    if (vote === 'Нейтрально')
      await this.newsRepo.update({ id: newsId }, { voteNeutral: () => 'voteNeutral + 1' });
  }
}
