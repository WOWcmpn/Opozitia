import axios from 'axios';
import * as cheerio from 'cheerio';
import wget from 'wget-improved';
import moment from 'moment/moment';

export async function getFullNewsHelper(link: string | undefined, fullImgUuid: string) {
  const news = { description: '', createdAtTime: '', fullImgUrl: '' };
  await axios.get(link!).then((res) => {
    const $ = cheerio.load(res.data);
    $('.article').each((i, elem) => {
      const description = $(elem).find('.article__body').find('p').text();
      const rawDateTime = $(elem).find('time').text();
      const fullImgUrl = $(elem).find('img').attr('src');
      wget.download(fullImgUrl!, `../clientnext/public/fullImage-news/${fullImgUuid}.webp`);
      const createdAtTime = rawDateTime.substring(rawDateTime.length - 5, rawDateTime.length);
      news.description = description;
      news.createdAtTime = createdAtTime;
      news.fullImgUrl = fullImgUrl!;
    });
  });
  return news;
}

export async function getFullNewsHelperRambler(link: string | undefined, fullImgUuid: string) {
  const news = {
    description: '',
    createdAtTime: '',
    createdAtDate: new Date(),
    fullImgUrl: '',
    viewDate: '',
  };
  await axios.get(link!).then((res) => {
    const $ = cheerio.load(res.data);
    $('._2mfTS').each((i, elem) => {
      const description = $(elem).find('p').text();
      const rawDateTime = $(elem).parent().find('._3xCUt').find('._2ntcK').find('time').text();
      const fullImgUrl = $(elem).find('img').attr('src');
      if (fullImgUrl) {
        wget.download(fullImgUrl!, `../clientnext/public/img/fullImage-news/${fullImgUuid}.webp`);
      }
      // else if (!fullImgUrl) {
      //         wget.download(
      //           'https://dfelectronics.com/wp-content/uploads/2016/07/635847974891062780-425303270_news.jpg?quality=100.3016070710090',
      //           `../client/img/fullImage-news/${fullImgUuid}.webp`,
      //         );
      //       }
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
