import { Module } from '@nestjs/common';
import { FootballController } from './controller/football.controller';
import { GetChampionshipsUseCase } from './use-cases/getChampionships.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FootballEntity } from './domain/football.entity';
import { CheckFootballUseCase } from './use-cases/checkFootball.use-case';
import { FootballQueryRepository } from './repositories/football.query-repository';
import { FootballRepository } from './repositories/football.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FootballEntity])],
  controllers: [FootballController],
  providers: [GetChampionshipsUseCase, CheckFootballUseCase, FootballQueryRepository, FootballRepository],
})
export class FootballModule {}
