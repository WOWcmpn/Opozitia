import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthBlackListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;
}
