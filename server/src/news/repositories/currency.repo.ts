import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyEntity } from '../domain/currency.entity';
import { Repository } from 'typeorm';
import { ICurrency } from '../../base/types/currencyModels';

@Injectable()
export class CurrencyRepo {
  constructor(@InjectRepository(CurrencyEntity) private readonly currencyRepo: Repository<CurrencyEntity>) {}

  // async getTwoCurrencies() {
  //   return await this.currencyRepo
  //     .createQueryBuilder('c')
  //     .select()
  //     .orderBy('c.date', 'DESC')
  //     .limit(2)
  //     .getMany();
  // }

  async getCurrency() {
    return await this.currencyRepo.createQueryBuilder('c').select().orderBy('c.date', 'DESC').getOne();
  }

  async getGraphicCurrency() {
    return await this.currencyRepo
      .createQueryBuilder('c')
      .select()
      .orderBy('c.date', 'DESC')
      .limit(7)
      .getMany();
  }

  async createCurrency(currency: ICurrency) {
    return await this.currencyRepo.insert(currency);
  }
}
