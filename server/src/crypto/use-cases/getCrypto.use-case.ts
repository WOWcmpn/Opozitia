import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CryptoEntity } from '../domain/crypto.entity';
import { CryptoRepo } from '../repositories/crypto.repo';

@Injectable()
export class GetCryptoUseCase {
  constructor(private readonly cryptoRepo: CryptoRepo) {}

  async getCrypto() {
    const resBTC = await axios.get(`https://rest.coinapi.io/v1/exchangerate/BTC/USD`, {
      headers: { 'X-CoinAPI-Key': 'D50055AD-2966-44AE-86F5-650E313BEAB7' },
    });

    const resETH = await axios.get(`https://rest.coinapi.io/v1/exchangerate/ETH/USD`, {
      headers: { 'X-CoinAPI-Key': 'D50055AD-2966-44AE-86F5-650E313BEAB7' },
    });

    const resBNB = await axios.get(`https://rest.coinapi.io/v1/exchangerate/BNB/USD`, {
      headers: { 'X-CoinAPI-Key': 'D50055AD-2966-44AE-86F5-650E313BEAB7' },
    });

    const resNOT = await axios.get(`https://rest.coinapi.io/v1/exchangerate/NOT/USD`, {
      headers: { 'X-CoinAPI-Key': 'D50055AD-2966-44AE-86F5-650E313BEAB7' },
    });

    const resSOL = await axios.get(`https://rest.coinapi.io/v1/exchangerate/SOL/USD`, {
      headers: { 'X-CoinAPI-Key': 'D50055AD-2966-44AE-86F5-650E313BEAB7' },
    });

    const resLTC = await axios.get(`https://rest.coinapi.io/v1/exchangerate/LTC/USD`, {
      headers: { 'X-CoinAPI-Key': 'D50055AD-2966-44AE-86F5-650E313BEAB7' },
    });

    const resBCH = await axios.get(`https://rest.coinapi.io/v1/exchangerate/BCH/USD`, {
      headers: { 'X-CoinAPI-Key': 'D50055AD-2966-44AE-86F5-650E313BEAB7' },
    });

    const prevCrypto = await this.cryptoRepo.getLastCrypto();
    const date = new Date().toLocaleDateString().replaceAll('/', '.');
    const viewDate = date.substring(0, 6) + date.substring(8, 10);
    const time = new Date(resBTC.data.time).toLocaleTimeString();

    const percentageBTC = ((resBTC.data.rate / prevCrypto!.rateBTC - 1) * 100).toFixed(2);
    const percentageETH = ((resETH.data.rate / prevCrypto!.rateETH - 1) * 100).toFixed(2);
    const percentageBNB = ((resBNB.data.rate / prevCrypto!.rateBNB - 1) * 100).toFixed(2);
    const percentageNOT = ((resNOT.data.rate / prevCrypto!.rateNOT - 1) * 100).toFixed(2);
    const percentageSOL = ((resSOL.data.rate / prevCrypto!.rateSOL - 1) * 100).toFixed(2);
    const percentageLTC = ((resLTC.data.rate / prevCrypto!.rateLTC - 1) * 100).toFixed(2);
    const percentageBCH = ((resBCH.data.rate / prevCrypto!.rateBCH - 1) * 100).toFixed(2);

    const differenceBTC = (resBTC.data.rate - prevCrypto!.rateBTC).toFixed(4);
    const differenceETH = (resETH.data.rate - prevCrypto!.rateETH).toFixed(4);
    const differenceBNB = (resBNB.data.rate - prevCrypto!.rateBNB).toFixed(4);
    const differenceNOT = (resNOT.data.rate - prevCrypto!.rateNOT).toFixed(4);
    const differenceSOL = (resSOL.data.rate - prevCrypto!.rateSOL).toFixed(4);
    const differenceLTC = (resLTC.data.rate - prevCrypto!.rateLTC).toFixed(4);
    const differenceBCH = (resBCH.data.rate - prevCrypto!.rateBCH).toFixed(4);

    const crypto = CryptoEntity.createCrypto(
      viewDate,
      time,
      resBTC.data.rate,
      resETH.data.rate,
      resBNB.data.rate,
      resNOT.data.rate,
      resSOL.data.rate,
      resLTC.data.rate,
      resBCH.data.rate,
      percentageBTC,
      percentageETH,
      percentageBNB,
      percentageNOT,
      percentageSOL,
      percentageLTC,
      percentageBCH,
      differenceBTC,
      differenceETH,
      differenceBNB,
      differenceNOT,
      differenceSOL,
      differenceLTC,
      differenceBCH,
    );

    const isExists = await this.cryptoRepo.getCryptoByDate(viewDate);
    if (isExists) {
      await this.cryptoRepo.updateCrypto(viewDate, crypto);
    } else {
      await this.cryptoRepo.createCrypto(crypto);
    }
    return;
  }
}
