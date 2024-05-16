import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/domain/user.entity';

@Entity()
export class AuthWhiteListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (u) => u.whiteTokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  usersId: UserEntity;
}
