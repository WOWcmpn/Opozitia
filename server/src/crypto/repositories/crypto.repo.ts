import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoEntity } from '../domain/crypto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CryptoRepo {
  constructor(@InjectRepository(CryptoEntity) private readonly cryptoRepo: Repository<CryptoEntity>) {}

  async createCrypto(crypto: CryptoEntity) {
    return await this.cryptoRepo.insert(crypto);
  }

  async getLastCrypto() {
    return await this.cryptoRepo.createQueryBuilder('c').select().orderBy('c.date', 'DESC').getOne();
  }

  async getCrypto() {
    return await this.cryptoRepo
      .createQueryBuilder('c')
      .select()
      .orderBy('c.date', 'DESC')
      .limit(7)
      .getMany();
  }

  async getCryptoById(name: string) {
    let currName: string = '';
    if (name === 'Bitcoin') currName = 'BTC';
    if (name === 'Ethereum') currName = 'ETH';
    if (name === 'BNB') currName = 'BNB';
    if (name === 'Notcoin') currName = 'NOT';
    if (name === 'Solana') currName = 'SOL';
    if (name === 'Litecoin') currName = 'LTC';
    if (name === 'Bitcoin Cash') currName = 'BCH';

    return await this.cryptoRepo
      .createQueryBuilder('c')
      .select([
        `c.rate${currName} AS rate`,
        `c.difference${currName} AS difference`,
        `c.percentage${currName} AS percentage`,
      ])
      .orderBy('c.date', 'DESC')
      .getRawOne();
  }

  async getCryptoFull(name: string, pageSize: number = 7) {
    let currName: string = '';
    if (name === 'Bitcoin') currName = 'BTC';
    if (name === 'Ethereum') currName = 'ETH';
    if (name === 'BNB') currName = 'BNB';
    if (name === 'Notcoin') currName = 'NOT';
    if (name === 'Solana') currName = 'SOL';
    if (name === 'Litecoin') currName = 'LTC';
    if (name === 'Bitcoin Cash') currName = 'BCH';

    return await this.cryptoRepo
      .createQueryBuilder('c')
      .select([
        `c.rate${currName} AS rate`,
        `c.difference${currName} AS difference`,
        `c.percentage${currName} AS percentage`,
        'c.viewDate AS "viewDate"',
      ])
      .orderBy('c.date', 'DESC')
      .limit(pageSize)
      .getRawMany();
  }

  async getCryptoByDate(date: string) {
    return await this.cryptoRepo.findOneBy({ viewDate: date });
  }

  async updateCrypto(date: string, crypto: CryptoEntity) {
    return await this.cryptoRepo.update({ viewDate: date }, crypto);
  }
}
