import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NewsEntity } from '../../news/domain/news.entity';
import { UserEntity } from '../../users/domain/user.entity';

@Entity()
export class CommentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column({ nullable: true })
  userId: string;

  @Column()
  username: string;

  @Column()
  createdAt: Date;

  @Column()
  newsId: string;

  @ManyToOne(() => NewsEntity, (n) => n.comments)
  news: NewsEntity;

  @ManyToOne(() => UserEntity, (u) => u.comments)
  user: UserEntity;

  static createComment(text: string, userId: string, username: string, newsId: string) {
    const comment = new CommentsEntity();

    comment.text = text;
    comment.userId = userId;
    comment.username = username;
    comment.newsId = newsId;
    comment.createdAt = new Date();

    return comment;
  }
}
