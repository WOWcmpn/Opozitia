import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NewsEntity } from '../../news/domain/news.entity';
import { UserEntity } from '../../users/domain/user.entity';
import { formatDate } from '../../base/helpers/formatDate';
import { BottomCommentsEntity } from './bottomComments.entity';

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
  viewDate: string;

  @Column()
  newsId: string;

  @Column()
  userImage: string;

  @ManyToOne(() => NewsEntity, (n) => n.comments)
  news: NewsEntity;

  @ManyToOne(() => UserEntity, (u) => u.comments)
  user: UserEntity;

  @OneToMany(() => BottomCommentsEntity, (b) => b.comment)
  bottomComments: BottomCommentsEntity[];

  static createComment(text: string, userId: string, username: string, newsId: string) {
    const comment = new CommentsEntity();

    comment.text = text;
    comment.userId = userId;
    comment.username = username;
    comment.newsId = newsId;
    comment.createdAt = new Date();
    comment.viewDate = formatDate(new Date().toLocaleDateString());
    comment.userImage = 'users.png';

    return comment;
  }
}
