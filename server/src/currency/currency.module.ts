import { Module } from '@nestjs/common';
import { CurrencyController } from './controller/currency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyEntity } from './domain/currency.entity';
import { CurrencyRepo } from './repositories/currency.repo';
import { GetCurrencyUseCase } from './use-cases/getCurrency.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyEntity])],
  controllers: [CurrencyController],
  providers: [CurrencyRepo, GetCurrencyUseCase],
})
export class CurrencyModule {}
