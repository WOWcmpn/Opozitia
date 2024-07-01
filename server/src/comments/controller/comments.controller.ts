import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateCommentModel } from '../../base/types/commentsModels';
import { CreateBottomCommentUseCase } from '../use-cases/createBottomComment.use-case';
import { CommentsQueryRepository } from '../repositories/comments.query-repository';
import { CommentsRepository } from '../repositories/comments.repository';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly createBottomCommentUseCase: CreateBottomCommentUseCase,
    private readonly commentsQueryRepo: CommentsQueryRepository,
    private readonly commentsRepo: CommentsRepository,
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

  @Get('bottom/:id')
  @HttpCode(200)
  async getBottomComments(@Param('id') id: string) {
    return await this.commentsQueryRepo.getBottomComments(id);
  }

  @Get()
  @HttpCode(200)
  async getAllAdmin(
    @Query() query: { login_like: string; text_like: string; _order: 'asc' | 'desc'; _sort: string },
  ) {
    let sortBy: 'ASC' | 'DESC';
    if (query._order === 'asc') {
      sortBy = 'ASC';
      return await this.commentsQueryRepo.getAll(query.login_like, query.text_like, query._sort, sortBy);
    } else if (query._order === 'desc') {
      sortBy = 'DESC';
      return await this.commentsQueryRepo.getAll(query.login_like, query.text_like, query._sort, sortBy);
    } else {
      return await this.commentsQueryRepo.getAll(query.login_like, query.text_like, query._sort);
    }
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    return await this.commentsQueryRepo.getCommentById(id);
  }

  @Patch(':id')
  @HttpCode(204)
  async updateByAdmin(@Param('id') id: string, @Body() data: { text: string }) {
    return await this.commentsRepo.updateById(id, data);
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteById(@Param('id') id: string) {
    return await this.commentsRepo.deleteById(id);
  }
}
