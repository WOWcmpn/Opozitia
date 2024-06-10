import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyEntity } from '../domain/currency.entity';
import { Repository } from 'typeorm';
import { ICurrency } from '../../base/types/currencyModels';

@Injectable()
export class CurrencyRepo {
  constructor(@InjectRepository(CurrencyEntity) private readonly currencyRepo: Repository<CurrencyEntity>) {}

  async getCurrencyByParam(name: string, pageSize: number = 7) {
    return await this.currencyRepo
      .createQueryBuilder('c')
      .orderBy('c.date', 'DESC')
      .select([
        `c.${name} AS rate`,
        `c.difference${name} AS difference`,
        `c.percentage${name} AS percentage`,
        'c.viewDate AS "viewDate"',
      ])
      .limit(pageSize)
      .getRawMany();
  }

  async getCurrencyById(name: string) {
    return await this.currencyRepo
      .createQueryBuilder('c')
      .orderBy('c.date', 'DESC')
      .select([`c.${name} AS rate`, `c.difference${name} AS difference`, `c.percentage${name} AS percentage`])
      .getRawOne();
  }

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
