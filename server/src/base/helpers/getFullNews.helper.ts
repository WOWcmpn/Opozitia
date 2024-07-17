import axios from 'axios';
import * as cheerio from 'cheerio';
import moment from 'moment/moment';

export async function getFullNewsHelper(link: string | undefined) {
  const news = { description: '', createdAtTime: '', fullImgUrl: '' };
  await axios.get(link!).then((res) => {
    const $ = cheerio.load(res.data);
    $('.article').each((i, elem) => {
      const description = $(elem).find('.article__body').find('p').text();
      const rawDateTime = $(elem).find('time').text();
      const fullImgUrl = $(elem).find('img').attr('src');
      const createdAtTime = rawDateTime.substring(rawDateTime.length - 5, rawDateTime.length);
      news.description = description;
      news.createdAtTime = createdAtTime;
      news.fullImgUrl = fullImgUrl!;
    });
  });
  return news;
}

export async function getFullNewsHelperRambler(link: string | undefined) {
  const news = {
    description: '',
    createdAtTime: '',
    createdAtDate: new Date(),
    fullImgUrl: '',
    viewDate: '',
  };
  await axios.get(link!).then((res) => {
    const $ = cheerio.load(res.data);
    $('.DhNxCs8u').each((i, elem) => {
      const description = $(elem).find('p').text();
      const rawDateTime = $(elem).parent().find('.trydH9DS').find('.WkZl0ZQ3').find('time').text();
      const fullImgUrl = $(elem).find('img').attr('src');
      const createdAtTime = rawDateTime.slice(rawDateTime.length - 5, rawDateTime.length);
      const viewDate = `${rawDateTime.slice(0, rawDateTime.length - 7)} 2024`;
      const createdAtDate = new Date(moment(viewDate, 'DD MMMM YYYY', 'ru').format());
      news.description = description;
      news.createdAtTime = createdAtTime;
      news.fullImgUrl = fullImgUrl!;
      news.createdAtDate = createdAtDate;
      news.viewDate = viewDate;
    });
  });
  return news;
}
