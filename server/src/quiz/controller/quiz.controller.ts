import { Body, Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { SendVoteUseCase } from '../use-cases/sendVote.use-case';
import { QuizQueryRepository } from '../repositories/quiz.query-repository';
import { AuthService } from '../../auth/service/auth.service';
import { quizVotes, sendVoteModel } from '../../base/types/quizModels';

@Controller('quiz')
export class QuizController {
  constructor(
    private readonly sendVoteUseCase: SendVoteUseCase,
    private readonly quizQueryRepository: QuizQueryRepository,
    private readonly authService: AuthService,
  ) {}

  @Post('vote/:newsId')
  @HttpCode(201)
  async vote(@Req() req: Request, @Body() inputVote: sendVoteModel, @Param('newsId') newsId: string) {
    // const accessToken = req.headers.authorization;
    // const userId = await this.authService.getUserId(accessToken!);
    const userId = '153ca853-a3e7-4645-b109-71a8978472аa';
    return await this.sendVoteUseCase.sendVote(userId, inputVote.inputVote, newsId);
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
