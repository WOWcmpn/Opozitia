import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateCommentModel } from '../../base/types/commentsModels';
import { CreateBottomCommentUseCase } from '../use-cases/createBottomComment.use-case';
import { CommentsQueryRepository } from '../repositories/comments.query-repository';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly createBottomCommentUseCase: CreateBottomCommentUseCase,
    private readonly commentsQueryRepo: CommentsQueryRepository,
  ) {}

  @Post('createBottom/:commentId')
  @HttpCode(201)
  async createBottomComment(@Param('commentId') commentId: string, @Body('data') data: CreateCommentModel) {
    return await this.createBottomCommentUseCase.createBottomComment(commentId, data.text, data.login);
  }

  @Get('count-comments/:newsId')
  @HttpCode(200)
  async getCountComments(@Param('newsId') newsId: string) {
    return await this.commentsQueryRepo.getCountComments(newsId);
  }

  @Get(':id')
  @HttpCode(200)
  async getBottomComments(@Param('id') id: string) {
    return await this.commentsQueryRepo.getBottomComments(id);
  }
}
