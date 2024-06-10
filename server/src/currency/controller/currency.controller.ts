import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CurrencyRepo } from '../repositories/currency.repo';
import { GetCurrencyUseCase } from '../use-cases/getCurrency.use-case';

@Controller('currency')
export class CurrencyController {
  constructor(
    private readonly currencyRepo: CurrencyRepo,
    private readonly getCurrencyUseCase: GetCurrencyUseCase,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  handleCurrency() {
    return this.getCurrencyUseCase.getCurrency();
  }

  @Get()
  @HttpCode(200)
  async getCurrency() {
    return await this.currencyRepo.getCurrency();
  }

  @Get('graphic')
  @HttpCode(200)
  async getGraphicCurrency() {
    return await this.currencyRepo.getGraphicCurrency();
  }

  @Get('params/:id')
  @HttpCode(200)
  async getCurrencyParam(@Param('id') id: string, @Query('pageSize') pageSize: number) {
    return await this.currencyRepo.getCurrencyByParam(id, pageSize);
  }

  @Get(':id')
  @HttpCode(200)
  async getCurrencyById(@Param('id') id: string) {
    return await this.currencyRepo.getCurrencyById(id);
  }
}
