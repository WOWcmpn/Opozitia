import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FootballEntity } from '../domain/football.entity';
import { Repository } from 'typeorm';
import { Championships, FootballTeamModel, UpdateFootballTeamModel } from '../../base/types/footballModels';

@Injectable()
export class FootballRepository {
  constructor(@InjectRepository(FootballEntity) private readonly footballRepo: Repository<FootballEntity>) {}

  async createFootballTeam(data: FootballTeamModel) {
    return await this.footballRepo.insert(data);
  }

  async updateFootballTeam(team: string, championship: Championships, data: UpdateFootballTeamModel) {
    return await this.footballRepo.update({ team, championship }, data);
  }
}
