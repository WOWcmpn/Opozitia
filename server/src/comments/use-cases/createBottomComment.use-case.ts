import { UsersQueryRepository } from '../../users/repositories/users.query-repository';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommentsQueryRepository } from '../repositories/comments.query-repository';
import { BottomCommentsEntity } from '../domain/bottomComments.entity';
import { BottomCommentModel } from '../../base/types/commentsModels';
import { CommentsRepository } from '../repositories/comments.repository';

@Injectable()
export class CreateBottomCommentUseCase {
  constructor(
    private readonly usersQueryRepo: UsersQueryRepository,
    private readonly commentsQueryRepo: CommentsQueryRepository,
    private readonly commentsRepo: CommentsRepository,
  ) {}

  async createBottomComment(commentId: string, text: string, login: string) {
    const user = await this.usersQueryRepo.getUserByLogin(login);
    if (!user) throw UnauthorizedException;
    const comment = await this.commentsQueryRepo.getCommentById(commentId);
    if (!comment) throw new NotFoundException();

    const bottomComment: BottomCommentModel = BottomCommentsEntity.createBottomComment(
      text,
      user.id,
      user.login,
      commentId,
    );
    await this.commentsRepo.createBottomComment(bottomComment);
    return;
  }
}
