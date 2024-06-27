import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FootballEntity } from '../domain/football.entity';
import { Repository } from 'typeorm';
import { Championships } from '../../base/types/footballModels';

@Injectable()
export class FootballQueryRepository {
  constructor(@InjectRepository(FootballEntity) private readonly footballRepo: Repository<FootballEntity>) {}

  async findByTeamAndChampionship(team: string, championship: Championships) {
    return await this.footballRepo.findOneBy({ team, championship });
  }

  async getByChampionship(championship: Championships) {
    return await this.footballRepo
      .createQueryBuilder('c')
      .select()
      .where('c.championship = :championship', { championship })
      .orderBy('c.place', 'ASC')
      .getMany();
  }
}
