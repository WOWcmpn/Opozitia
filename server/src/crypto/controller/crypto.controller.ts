import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { GetCryptoUseCase } from '../use-cases/getCrypto.use-case';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CryptoRepo } from '../repositories/crypto.repo';

@Controller('crypto')
export class CryptoController {
  constructor(
    private readonly getCryptoUseCase: GetCryptoUseCase,
    private readonly cryptoRepo: CryptoRepo,
  ) {}

  @Cron(CronExpression.EVERY_2_HOURS)
  async handleCrypto() {
    return await this.getCryptoUseCase.getCrypto();
  }

  @Get('full/:id')
  @HttpCode(200)
  async getCryptoFull(@Param('id') id: string, @Query('pageSize') pageSize: number) {
    return await this.cryptoRepo.getCryptoFull(id, pageSize);
  }

  @Get('last')
  @HttpCode(200)
  async getLastCrypto() {
    return await this.cryptoRepo.getLastCrypto();
  }

  @Get('graphic')
  @HttpCode(200)
  async getCrypto() {
    return await this.cryptoRepo.getCrypto();
  }

  @Get(':id')
  @HttpCode(200)
  async getCryptoById(@Param('id') id: string) {
    return await this.cryptoRepo.getCryptoById(id);
  }
}
