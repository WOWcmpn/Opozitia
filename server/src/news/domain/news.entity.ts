import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentsEntity } from '../../comments/domain/comments.entity';

@Entity()
export class NewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  link: string;

  @Index()
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  imgUrl: string;

  @Column({ nullable: true })
  fullImgUrl: string;

  @Column({ nullable: true })
  createdAtTime: string;

  @Column({ nullable: true })
  createdAtDate: Date;

  @Column({ nullable: true })
  viewDate: string;

  @Column()
  category: string;

  @Column({ nullable: true, default: 0 })
  votePositive: number;

  @Column({ nullable: true, default: 0 })
  voteNegative: number;

  @Column({ nullable: true, default: 0 })
  voteNeutral: number;

  @OneToMany(() => CommentsEntity, (c) => c.news)
  comments: CommentsEntity[];
}
