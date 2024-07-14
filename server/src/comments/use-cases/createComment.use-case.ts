import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersQueryRepository } from '../../users/repositories/users.query-repository';
import { CommentModel } from '../../base/types/commentsModels';
import { NewsQueryRepository } from '../../news/repositories/news.query-repository';
import { CommentsEntity } from '../domain/comments.entity';
import { CommentsRepository } from '../repositories/comments.repository';

@Injectable()
export class CreateCommentUseCase {
  constructor(
    private readonly usersQueryRepo: UsersQueryRepository,
    private readonly commentsRepo: CommentsRepository,
    private readonly newsQueryRepo: NewsQueryRepository,
  ) {}

  async create(newsId: string, text: string, login: string) {
    const user = await this.usersQueryRepo.getUserByLogin(login);
    if (!user) throw new UnauthorizedException();
    const news = await this.newsQueryRepo.getNewsById(newsId);
    if (!news) throw new NotFoundException();

    const comment: CommentModel = CommentsEntity.createComment(text, user.id, user.login, news.id);
    return await this.commentsRepo.addComment(comment);
  }
}
