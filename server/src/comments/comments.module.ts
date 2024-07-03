import { Module } from '@nestjs/common';
import { CommentsController } from './controller/comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from './domain/comments.entity';
import { BottomCommentsEntity } from './domain/bottomComments.entity';
import { CommentsQueryRepository } from './repositories/comments.query-repository';
import { CreateBottomCommentUseCase } from './use-cases/createBottomComment.use-case';
import { CommentsRepository } from './repositories/comments.repository';
import { UsersQueryRepository } from '../users/repositories/users.query-repository';
import { UserEntity } from '../users/domain/user.entity';
import { BottomCommentsController } from './controller/bottomComments.controller';
import { BottomCommentsQueryRepository } from './repositories/bottomComments.query-repository';
import { BottomCommentsRepository } from './repositories/bottomComments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsEntity, BottomCommentsEntity, UserEntity])],
  controllers: [CommentsController, BottomCommentsController],
  providers: [
    CommentsQueryRepository,
    CommentsRepository,
    CreateBottomCommentUseCase,
    UsersQueryRepository,
    BottomCommentsQueryRepository,
    BottomCommentsRepository,
  ],
})
export class CommentsModule {}
