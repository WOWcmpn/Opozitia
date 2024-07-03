import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Championships } from '../../base/types/footballModels';
import { CheckFootballUseCase } from './checkFootball.use-case';

@Injectable()
export class GetChampionshipsUseCase {
  constructor(private readonly checkFootballUseCase: CheckFootballUseCase) {}

  async getChampionshipsSpain() {
    await axios
      .get('https://www.championat.com/football/_spain.html', { timeout: 2000 })
      .then((res) => {
        const $ = cheerio.load(res.data);
        $('.results-table')
          .find('tbody')
          .find('tr')
          .each((i, elem) => {
            const place = $(elem)
              .find('.results-table__zone')
              .text()
              .replace(/[^0-9]/g, '');
            const team = $(elem).find('._nowrap').find('.table-item__name').text();
            const img = $(elem).find('._nowrap').find('.table-item__logo').find('img').attr('data-src');
            const games = $(elem).find('.results-table__main').first().text();
            const points = $(elem)
              .find('.results-table__main')
              .next()
              .text()
              .replace(/[^0-9]/g, '');
            const championship = Championships.Spain;
            this.checkFootballUseCase.checkFootball(+place, team, +games, +points, championship, img!);
          });
      })
      .catch((error) => {
        console.error('spain error ', error);
      });
  }

  async getChampionshipsGermany() {
    await axios
      .get('https://www.championat.com/football/_germany.html', { timeout: 3000 })
      .then((res) => {
        const $ = cheerio.load(res.data);
        $('.results-table')
          .find('tbody')
          .find('tr')
          .each((i, elem) => {
            const place = $(elem)
              .find('.results-table__zone')
              .text()
              .replace(/[^0-9]/g, '');
            const team = $(elem).find('._nowrap').find('.table-item__name').text();
            const img = $(elem).find('._nowrap').find('.table-item__logo').find('img').attr('data-src');
            const games = $(elem).find('.results-table__main').first().text();
            const points = $(elem)
              .find('.results-table__main')
              .next()
              .text()
              .replace(/[^0-9]/g, '');
            const championship = Championships.Germany;
            this.checkFootballUseCase.checkFootball(+place, team, +games, +points, championship, img!);
          });
      })
      .catch((error) => {
        console.error('spain error ', error);
      });
  }

  async getChampionshipsItaly() {
    await axios
      .get('https://www.championat.com/football/_italy.html', { timeout: 4000 })
      .then((res) => {
        const $ = cheerio.load(res.data);
        $('.results-table')
          .find('tbody')
          .find('tr')
          .each((i, elem) => {
            const place = $(elem)
              .find('.results-table__zone')
              .text()
              .replace(/[^0-9]/g, '');
            const team = $(elem).find('._nowrap').find('.table-item__name').text();
            const img = $(elem).find('._nowrap').find('.table-item__logo').find('img').attr('data-src');
            const games = $(elem).find('.results-table__main').first().text();
            const points = $(elem)
              .find('.results-table__main')
              .next()
              .text()
              .replace(/[^0-9]/g, '');
            const championship = Championships.Italy;
            this.checkFootballUseCase.checkFootball(+place, team, +games, +points, championship, img!);
          });
      })
      .catch((error) => {
        console.error('spain error ', error);
      });
  }

  async getChampionshipsFrance() {
    await axios
      .get('https://www.championat.com/football/_france.html', { timeout: 5000 })
      .then((res) => {
        const $ = cheerio.load(res.data);
        $('.results-table')
          .find('tbody')
          .find('tr')
          .each((i, elem) => {
            const place = $(elem)
              .find('.results-table__zone')
              .text()
              .replace(/[^0-9]/g, '');
            const team = $(elem).find('._nowrap').find('.table-item__name').text();
            const img = $(elem).find('._nowrap').find('.table-item__logo').find('img').attr('data-src');
            const games = $(elem).find('.results-table__main').first().text();
            const points = $(elem)
              .find('.results-table__main')
              .next()
              .text()
              .replace(/[^0-9]/g, '');
            const championship = Championships.France;
            this.checkFootballUseCase.checkFootball(+place, team, +games, +points, championship, img!);
          });
      })
      .catch((error) => {
        console.error('spain error ', error);
      });
  }

  async getChampionshipsEngland() {
    await axios
      .get('https://www.championat.com/football/_england.html', { timeout: 6000 })
      .then((res) => {
        const $ = cheerio.load(res.data);
        $('.results-table')
          .find('tbody')
          .find('tr')
          .each((i, elem) => {
            const place = $(elem)
              .find('.results-table__zone')
              .text()
              .replace(/[^0-9]/g, '');
            const team = $(elem).find('._nowrap').find('.table-item__name').text();
            const img = $(elem).find('._nowrap').find('.table-item__logo').find('img').attr('data-src');
            const games = $(elem).find('.results-table__main').first().text();
            const points = $(elem)
              .find('.results-table__main')
              .next()
              .text()
              .replace(/[^0-9]/g, '');
            const championship = Championships.England;
            this.checkFootballUseCase.checkFootball(+place, team, +games, +points, championship, img!);
          });
      })
      .catch((error) => {
        console.error('spain error ', error);
      });
  }
}
