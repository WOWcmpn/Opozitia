import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersQueryRepository } from '../../users/repositories/users.query-repository';
import { NewsRepository } from '../repositories/news.repository';
import { NewsQueryRepository } from '../repositories/news.query-repository';
import { CommentsEntity } from '../../comments/domain/comments.entity';
import { CommentModel } from '../../base/types/commentsModels';

@Injectable()
export class CreateCommentUseCase {
  constructor(
    private readonly usersQueryRepo: UsersQueryRepository,
    private readonly newsRepo: NewsRepository,
    private readonly newsQueryRepo: NewsQueryRepository,
  ) {}

  async create(newsId: string, text: string, login: string) {
    const user = await this.usersQueryRepo.getUserByLogin(login);
    if (!user) throw new UnauthorizedException();
    const news = await this.newsQueryRepo.getNewsById(newsId);
    if (!news) throw new NotFoundException();

    const comment: CommentModel = CommentsEntity.createComment(text, user.id, user.login, news.id);
    return await this.newsRepo.addComment(comment);
  }
}
