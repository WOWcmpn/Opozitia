import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Championships } from '../../base/types/footballModels';

@Entity()
export class FootballEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  place: number;

  @Column()
  team: string;

  @Column()
  games: number;

  @Column()
  points: number;

  @Column({ enum: Championships })
  championship: Championships;

  @Column()
  img: string;

  static createFootballTeam(
    place: number,
    team: string,
    games: number,
    points: number,
    championship: Championships,
    img: string,
  ) {
    const footballTeam = new FootballEntity();

    footballTeam.place = place;
    footballTeam.team = team;
    footballTeam.games = games;
    footballTeam.points = points;
    footballTeam.championship = championship;
    footballTeam.img = img;

    return footballTeam;
  }
}
