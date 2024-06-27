import { Injectable } from '@nestjs/common';
import { FootballQueryRepository } from '../repositories/football.query-repository';
import { Championships, FootballTeamModel } from '../../base/types/footballModels';
import { FootballRepository } from '../repositories/football.repository';
import { FootballEntity } from '../domain/football.entity';

@Injectable()
export class CheckFootballUseCase {
  constructor(
    private readonly footballQueryRepo: FootballQueryRepository,
    private readonly footballRepo: FootballRepository,
  ) {}

  async checkFootball(
    place: number,
    team: string,
    games: number,
    points: number,
    championship: Championships,
    img: string,
  ) {
    const isExists = await this.footballQueryRepo.findByTeamAndChampionship(team, championship);
    if (!isExists) {
      const footballTeam: FootballTeamModel = FootballEntity.createFootballTeam(
        place,
        team,
        games,
        points,
        championship,
        img,
      );
      return await this.footballRepo.createFootballTeam(footballTeam);
    } else {
      return await this.footballRepo.updateFootballTeam(team, championship, {
        place,
        team,
        games,
        points,
        championship,
        img,
      });
    }
  }
}
