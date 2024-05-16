import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuizEntity } from '../../quiz/domain/quiz.entity';

@Entity()
export class NewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
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

  @Column()
  createdAtTime: string;

  @Column()
  createdAtDate: Date;

  @Column()
  viewDate: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  @OneToMany(() => QuizEntity, (q) => q.newsId, { onDelete: 'CASCADE' })
  quizVote: string;
}
