import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CurrencyRepo } from '../repositories/currency.repo';
import { CurrencyEntity } from '../domain/currency.entity';

@Injectable()
export class GetCurrencyUseCase {
  constructor(private readonly currencyRepo: CurrencyRepo) {}

  async getCurrency() {
    const resEUR = await axios.get(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json`,
    );
    const resUSD = await axios.get(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`,
    );
    const resGBP = await axios.get(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/gbp.json`,
    );
    const prevCurrency = await this.currencyRepo.getCurrency();

    const percentageEURToUSD = ((resEUR.data.eur.usd / prevCurrency!.EURToUSD - 1) * 100).toFixed(2);
    const percentageUSDToJPY = ((resUSD.data.usd.jpy / prevCurrency!.USDToJPY - 1) * 100).toFixed(2);
    const percentageGBPToUSD = ((resGBP.data.gbp.usd / prevCurrency!.GBPToUSD - 1) * 100).toFixed(2);
    const percentageUSDToRUB = ((resUSD.data.usd.rub / prevCurrency!.USDToRUB - 1) * 100).toFixed(2);
    const percentageEURToRUB = ((resEUR.data.eur.rub / prevCurrency!.EURToRUB - 1) * 100).toFixed(2);
    const percentageUSDToRON = ((resUSD.data.usd.ron / prevCurrency!.USDToRON - 1) * 100).toFixed(2);
    const percentageEURToRON = ((resEUR.data.eur.ron / prevCurrency!.EURToRON - 1) * 100).toFixed(2);

    const differenceEURToUSD = (resEUR.data.eur.usd - prevCurrency!.EURToUSD).toFixed(4);
    const differenceUSDToJPY = (resUSD.data.usd.jpy - prevCurrency!.USDToJPY).toFixed(4);
    const differenceGBPToUSD = (resGBP.data.gbp.usd - prevCurrency!.GBPToUSD).toFixed(4);
    const differenceUSDToRUB = (resUSD.data.usd.rub - prevCurrency!.USDToRUB).toFixed(4);
    const differenceEURToRUB = (resEUR.data.eur.rub - prevCurrency!.EURToRUB).toFixed(4);
    const differenceUSDToRON = (resUSD.data.usd.ron - prevCurrency!.USDToRON).toFixed(4);
    const differenceEURToRON = (resEUR.data.eur.ron - prevCurrency!.EURToRON).toFixed(4);

    const currency = CurrencyEntity.createCurrency(
      resEUR.data.eur.usd,
      resUSD.data.usd.jpy,
      resGBP.data.gbp.usd,
      resUSD.data.usd.rub,
      resEUR.data.eur.rub,
      resUSD.data.usd.ron,
      resEUR.data.eur.ron,
      percentageEURToUSD,
      percentageUSDToJPY,
      percentageGBPToUSD,
      percentageUSDToRUB,
      percentageEURToRUB,
      percentageUSDToRON,
      percentageEURToRON,
      differenceEURToUSD,
      differenceUSDToJPY,
      differenceGBPToUSD,
      differenceUSDToRUB,
      differenceEURToRUB,
      differenceUSDToRON,
      differenceEURToRON,
    );
    await this.currencyRepo.createCurrency(currency);
    return;
  }
}
