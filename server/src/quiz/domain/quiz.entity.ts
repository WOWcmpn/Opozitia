import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NewsEntity } from '../../news/domain/news.entity';
import { quizVotes } from '../../base/types/quizModels';

@Entity()
export class QuizEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'newsId' })
  @ManyToOne(() => NewsEntity, (n) => n.quizVote)
  newsIdKey: string;

  @Column()
  newsId: string;

  @Column({ enum: quizVotes })
  vote: quizVotes;

  @Column()
  userId: string;
}
