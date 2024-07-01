import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DaysEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  viewDate: string;

  @Column()
  createdAt: Date;

  @Column()
  isPublished: boolean;
}
