import { Module } from '@nestjs/common';
import { CommentsController } from './controller/comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from './domain/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsEntity])],
  controllers: [CommentsController],
  providers: [],
})
export class CommentsModule {}
