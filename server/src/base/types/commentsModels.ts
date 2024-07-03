import { IsString, Length } from 'class-validator';

export class CreateCommentModel {
  @IsString()
  @Length(5, 350)
  text: string;

  @IsString()
  login: string;
}

export class CommentModel {
  id: string;
  text: string;
  userId: string;
  username: string;
  createdAt: Date;
  newsId: string;
}

export class BottomCommentModel {
  id: string;
  text: string;
  userId: string;
  username: string;
  createdAt: Date;
  commentId: string;
}
