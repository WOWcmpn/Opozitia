import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from '../domain/news.entity';
import { Repository } from 'typeorm';
import { CommentsEntity } from '../../comments/domain/comments.entity';

@Injectable()
export class NewsQueryRepository {
  constructor(
    @InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>,
    @InjectRepository(CommentsEntity) private readonly commentsRepo: Repository<CommentsEntity>,
  ) {}

  async getNewsByCategory(pageNumber: number, pageSize: number, category: string = 'Economy') {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select([
        'n.id',
        'n.title',
        'n.fullImgUrl',
        'n.category',
        'n.votePositive',
        'n.voteNegative',
        'n.voteNeutral',
      ])
      .where('n.category = :category', { category })
      .orderBy('n.createdAtDate', 'DESC')
      .addOrderBy('n.createdAtTime', 'DESC')
      .limit(pageSize)
      .offset((pageNumber - 1) * pageSize)
      .getMany();
  }

  async getBySearch(searchNameTerm: string = '', pageNumber: number = 1) {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select(['n.id', 'n.title', 'n.description', 'n.createdAtTime', 'n.category', 'n.fullImgUrl'])
      .where('n.title ilike :title', { title: `%${searchNameTerm}%` })
      .orderBy('n.createdAtDate', 'DESC')
      .addOrderBy('n.createdAtTime', 'DESC')
      .limit(30)
      .offset((pageNumber - 1) * 10)
      .getMany();
  }

  async getCountSearch(searchNameTerm: string = '') {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select(['n.id', 'n.title', 'n.description', 'n.createdAtTime', 'n.category', 'n.fullImgUrl'])
      .where('n.title ilike :title', { title: `%${searchNameTerm}%` })
      .getCount();
  }

  async getAllNewsByCategory(
    category: string,
    pageNumber: number = 1,
    pageSize: number = 10,
    sorting: string = 'all',
  ) {
    const DAY = 24 * 3600 * 1000;
    const MONTH = 30 * DAY;
    const YEAR = 365.2425 * DAY;
    const startDate = new Date();

    if (sorting === 'week') {
      const weekDate = new Date(+startDate - 7 * DAY);
      return await this.newsRepository
        .createQueryBuilder('n')
        .select(['n.id', 'n.title', 'n.createdAtTime', 'n.category', 'n.fullImgUrl'])
        .where('n.category = :category', { category })
        .andWhere('n.createdAtDate > :weekDate', { weekDate })
        .orderBy('n.createdAtDate', 'DESC')
        .addOrderBy('n.createdAtTime', 'DESC')
        .limit(pageSize)
        .offset((pageNumber - 1) * pageSize)
        .getMany();
    } else if (sorting === 'month') {
      const monthDate = new Date(+startDate - MONTH);
      return await this.newsRepository
        .createQueryBuilder('n')
        .select(['n.id', 'n.title', 'n.createdAtTime', 'n.category', 'n.fullImgUrl'])
        .where('n.category = :category', { category })
        .andWhere('n.createdAtDate > :monthDate', { monthDate })
        .orderBy('n.createdAtDate', 'DESC')
        .addOrderBy('n.createdAtTime', 'DESC')
        .limit(pageSize)
        .offset((pageNumber - 1) * pageSize)
        .getMany();
    } else if (sorting === 'year') {
      const yearDate = new Date(+startDate - YEAR);
      return await this.newsRepository
        .createQueryBuilder('n')
        .select(['n.id', 'n.title', 'n.createdAtTime', 'n.category', 'n.fullImgUrl'])
        .where('n.category = :category', { category })
        .andWhere('n.createdAtDate > :yearDate', { yearDate })
        .orderBy('n.createdAtDate', 'DESC')
        .addOrderBy('n.createdAtTime', 'DESC')
        .limit(pageSize)
        .offset((pageNumber - 1) * pageSize)
        .getMany();
    } else if (sorting === 'all') {
      return await this.newsRepository
        .createQueryBuilder('n')
        .select(['n.id', 'n.title', 'n.createdAtTime', 'n.category', 'n.fullImgUrl'])
        .where('n.category = :category', { category })
        .orderBy('n.createdAtDate', 'DESC')
        .addOrderBy('n.createdAtTime', 'DESC')
        .limit(pageSize)
        .offset((pageNumber - 1) * pageSize)
        .getMany();
    }
  }

  async getAllLastNews(pageNumber: number = 1, pageSize: number = 10, sorting: string = 'all') {
    const DAY = 24 * 3600 * 1000;
    const MONTH = 30 * DAY;
    const YEAR = 365.2425 * DAY;
    const startDate = new Date();

    if (sorting === 'week') {
      const weekDate = new Date(+startDate - 7 * DAY);
      return await this.newsRepository
        .createQueryBuilder('n')
        .select(['n.id', 'n.title', 'n.fullImgUrl', 'n.createdAtTime', 'n.description', 'n.category'])
        .where('n.createdAtDate > :weekDate', { weekDate })
        .orderBy('n.createdAtDate', 'DESC')
        .addOrderBy('n.createdAtTime', 'DESC')
        .limit(pageSize)
        .offset((pageNumber - 1) * pageSize)
        .getMany();
    } else if (sorting === 'month') {
      const monthDate = new Date(+startDate - MONTH);
      return await this.newsRepository
        .createQueryBuilder('n')
        .select(['n.id', 'n.title', 'n.fullImgUrl', 'n.createdAtTime', 'n.description', 'n.category'])
        .where('n.createdAtDate > :monthDate', { monthDate })
        .orderBy('n.createdAtDate', 'DESC')
        .addOrderBy('n.createdAtTime', 'DESC')
        .limit(pageSize)
        .offset((pageNumber - 1) * pageSize)
        .getMany();
    } else if (sorting === 'year') {
      const yearDate = new Date(+startDate - YEAR);
      return await this.newsRepository
        .createQueryBuilder('n')
        .select(['n.id', 'n.title', 'n.fullImgUrl', 'n.createdAtTime', 'n.description', 'n.category'])
        .where('n.createdAtDate > :yearDate', { yearDate })
        .orderBy('n.createdAtDate', 'DESC')
        .addOrderBy('n.createdAtTime', 'DESC')
        .limit(pageSize)
        .offset((pageNumber - 1) * pageSize)
        .getMany();
    } else if (sorting === 'all') {
      return await this.newsRepository
        .createQueryBuilder('n')
        .select(['n.id', 'n.title', 'n.fullImgUrl', 'n.createdAtTime', 'n.description', 'n.category'])
        .orderBy('n.createdAtDate', 'DESC')
        .addOrderBy('n.createdAtTime', 'DESC')
        .limit(pageSize)
        .offset((pageNumber - 1) * pageSize)
        .getMany();
    }
  }

  async getLastNewsSidebar(category: string | '') {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select()
      .where('n.category != :category', { category })
      .orderBy('n.createdAtDate', 'DESC')
      .addOrderBy('n.createdAtTime', 'DESC')
      .limit(20)
      .getMany();
  }

  async getSwipeNews() {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select()
      .orderBy('n.createdAtDate', 'DESC')
      .addOrderBy('n.createdAtTime', 'DESC')
      .limit(10)
      .offset(3)
      .getMany();
  }

  async getMainNews() {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select(['n.id', 'n.title', 'n.fullImgUrl', 'n.createdAtTime', 'n.category', 'n.description'])
      .orderBy('n.createdAtDate', 'DESC')
      .limit(5)
      .offset(15)
      .getMany();
  }

  async getBottomNews(pageSize: number, pageNumber: number) {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select(['n.id', 'n.title'])
      .orderBy('n.createdAtDate', 'DESC')
      .limit(pageSize)
      .offset(pageNumber)
      .getMany();
  }

  async getNewsByTitle(title: string | undefined) {
    return await this.newsRepository.findOneBy({ title });
  }

  async getNewsVotes(id: string) {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select(['n.title', 'n.votePositive', 'n.voteNegative', 'n.voteNeutral'])
      .where('n.id = :id', { id })
      .getOne();
  }

  async getNewsById(id: string) {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select([
        'n.id',
        'n.title',
        'n.description',
        'n.imgUrl',
        'n.fullImgUrl',
        'n.createdAtTime',
        'n.viewDate',
        'n.quizVote',
      ])
      .where('n.id = :id', { id })
      .getOne();

    // const comments = await this.commentsRepo
    //   .createQueryBuilder('c')
    //   .select(['c.text', 'c.username', 'c.viewDate', 'c.userImage'])
    //   .where('c.newsId = :id', { id })
    //   .limit(5)
    //   .getMany();
    //
    // return {
    //   id: news?.id,
    //   title: news?.title,
    //   description: news?.description,
    //   imgUrl: news?.imgUrl,
    //   fullImgUrl: news?.fullImgUrl,
    //   createdAtTime: news?.createdAtTime,
    //   viewDate: news?.viewDate,
    //   category: news?.category,
    //   quizVote: news?.quizVote,
    //   comments: comments || [],
    // };
  }

  async getComments(newsId: string, pageNumber: number = 1) {
    return await this.commentsRepo
      .createQueryBuilder('c')
      .select(['c.text', 'c.username', 'c.viewDate', 'c.userImage'])
      .where('c.newsId = :newsId', { newsId })
      .limit(5)
      .offset((pageNumber - 1) * 5)
      .getMany();
  }
}
