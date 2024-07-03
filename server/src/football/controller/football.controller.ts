import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GetChampionshipsUseCase } from '../use-cases/getChampionships.use-case';
import { Championships } from '../../base/types/footballModels';
import { FootballQueryRepository } from '../repositories/football.query-repository';

@Controller('football')
export class FootballController {
  constructor(
    private readonly getChampionshipsUseCase: GetChampionshipsUseCase,
    private readonly footballQueryRepo: FootballQueryRepository,
  ) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async handleFootball() {
    await this.getChampionshipsUseCase.getChampionshipsSpain();
    await this.getChampionshipsUseCase.getChampionshipsGermany();
    await this.getChampionshipsUseCase.getChampionshipsItaly();
    await this.getChampionshipsUseCase.getChampionshipsFrance();
    await this.getChampionshipsUseCase.getChampionshipsEngland();
    return;
  }

  @Get('all')
  @HttpCode(200)
  async getFootballTeams() {
    await this.getChampionshipsUseCase.getChampionshipsSpain();
    await this.getChampionshipsUseCase.getChampionshipsGermany();
    await this.getChampionshipsUseCase.getChampionshipsItaly();
    await this.getChampionshipsUseCase.getChampionshipsFrance();
    await this.getChampionshipsUseCase.getChampionshipsEngland();
    return;
  }

  @Get('championship')
  @HttpCode(200)
  async getByChampionShip(@Query() query: { championship: Championships }) {
    return await this.footballQueryRepo.getByChampionship(query.championship);
  }
}
