import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GetCurrencyUseCase {
  constructor() {}

  async getCurrency(value: string) {
    const apiToken = '3713e1f2d08effa07f148cd8c4e70542c110933d';
    const res = await axios.get(
      `http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/currency?query=${value}`,
      { headers: { Authorization: 'Token ' + apiToken } },
    );
    return res.data;
  }
}
