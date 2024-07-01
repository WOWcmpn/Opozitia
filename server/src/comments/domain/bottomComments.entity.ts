import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/domain/user.entity';
import { CommentsEntity } from './comments.entity';
import { formatDate } from '../../base/helpers/formatDate';

@Entity()
export class BottomCommentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column({ nullable: true })
  userId: string;

  @Column()
  username: string;

  @Column()
  userImage: string;

  @Column()
  createdAt: Date;

  @Column()
  viewDate: string;

  @Column()
  commentId: string;

  @ManyToOne(() => UserEntity, (u) => u.bottomComments)
  user: UserEntity;

  @ManyToOne(() => CommentsEntity, (c) => c.bottomComments)
  comment: CommentsEntity;

  static createBottomComment(text: string, userId: string, username: string, commentId: string) {
    const bottomComment = new BottomCommentsEntity();

    bottomComment.text = text;
    bottomComment.userId = userId;
    bottomComment.username = username;
    bottomComment.commentId = commentId;
    bottomComment.createdAt = new Date();
    bottomComment.viewDate = formatDate(new Date().toLocaleDateString());
    bottomComment.userImage = 'users.png';

    return bottomComment;
  }
}
