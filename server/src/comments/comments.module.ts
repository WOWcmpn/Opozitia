import { Module } from '@nestjs/common';
import { CommentsController } from './controller/comments.controller';

@Module({
  controllers: [CommentsController],
  providers: [],
})
export class CommentsModule {}
