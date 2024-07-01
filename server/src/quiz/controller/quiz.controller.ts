import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { SendVoteUseCase } from '../use-cases/sendVote.use-case';
import { QuizQueryRepository } from '../repositories/quiz.query-repository';
import { quizVotes, sendVoteModel } from '../../base/types/quizModels';
import { ApiTags } from '@nestjs/swagger';

@Controller('quiz')
@ApiTags('Quiz dssadsa')
export class QuizController {
  constructor(
    private readonly sendVoteUseCase: SendVoteUseCase,
    private readonly quizQueryRepository: QuizQueryRepository,
  ) {}

  @Post('vote/:newsId')
  @HttpCode(201)
  async vote(@Body() inputVote: sendVoteModel, @Param() query: { newsId: string }) {
    return await this.sendVoteUseCase.sendVote(inputVote.login, inputVote.inputVote, query.newsId);
  }

  @Get(':newsId')
  @HttpCode(200)
  async getVotes(@Param('newsId') newsId: string) {
    const like = await this.quizQueryRepository.getVotesCountByNewsId(newsId, quizVotes.Like);
    const dislike = await this.quizQueryRepository.getVotesCountByNewsId(newsId, quizVotes.Dislike);
    const amount = like + dislike;
    return {
      like: `${((like * 100) / amount).toFixed(2)}%`,
      dislike: `${((dislike * 100) / amount).toFixed(2)}%`,
    };
  }
}
