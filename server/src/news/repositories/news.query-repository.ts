import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from '../domain/news.entity';
import { Repository } from 'typeorm';
import { CommentsEntity } from '../../comments/domain/comments.entity';
import { newsCategory } from '../../base/types/newsModels';

@Injectable()
export class NewsQueryRepository {
  constructor(
    @InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>,
    @InjectRepository(CommentsEntity) private readonly commentsRepo: Repository<CommentsEntity>,
  ) {}

  async getAll(
    title_like: string = '',
    id_like: string,
    _sort: string = 'createdAtDate',
    _order: 'ASC' | 'DESC' = 'DESC',
    category: newsCategory | null,
    isPublished?: boolean | null,
  ) {
    if (isPublished === true || isPublished === false) {
      if (id_like) {
        if (!category) {
          return await this.newsRepository
            .createQueryBuilder('n')
            .select()
            .where('n.isPublished = :isPublished', { isPublished })
            .andWhere('n.title ilike :title', { title: `%${title_like}%` })
            .andWhere('n.id = :id', { id: id_like })
            .orderBy(`n.${_sort}`, _order)
            .getMany();
        } else {
          return await this.newsRepository
            .createQueryBuilder('n')
            .select()
            .where('n.isPublished = :isPublished', { isPublished })
            .andWhere('n.title ilike :title', { title: `%${title_like}%` })
            .andWhere('n.category = :category', { category })
            .andWhere('n.id = :id', { id: id_like })
            .orderBy(`n.${_sort}`, _order)
            .getMany();
        }
      } else {
        if (!category) {
          return await this.newsRepository
            .createQueryBuilder('n')
            .select()
            .where('n.isPublished = :isPublished', { isPublished })
            .andWhere('n.title ilike :title', { title: `%${title_like}%` })
            .orderBy(`n.${_sort}`, _order)
            .getMany();
        } else {
          return await this.newsRepository
            .createQueryBuilder('n')
            .select()
            .where('n.isPublished = :isPublished', { isPublished })
            .andWhere('n.title ilike :title', { title: `%${title_like}%` })
            .andWhere('n.category = :category', { category })
            .orderBy(`n.${_sort}`, _order)
            .getMany();
        }
      }
    } else {
      if (id_like) {
        if (!category) {
          return await this.newsRepository
            .createQueryBuilder('n')
            .select()
            .where('n.title ilike :title', { title: `%${title_like}%` })
            .andWhere('n.id = :id', { id: id_like })
            .orderBy(`n.${_sort}`, _order)
            .getMany();
        } else {
          return await this.newsRepository
            .createQueryBuilder('n')
            .select()
            .where('n.title ilike :title', { title: `%${title_like}%` })
            .andWhere('n.category = :category', { category })
            .andWhere('n.id = :id', { id: id_like })
            .orderBy(`n.${_sort}`, _order)
            .getMany();
        }
      } else {
        if (!category) {
          return await this.newsRepository
            .createQueryBuilder('n')
            .select()
            .where('n.title ilike :title', { title: `%${title_like}%` })
            .orderBy(`n.${_sort}`, _order)
            .getMany();
        } else {
          return await this.newsRepository
            .createQueryBuilder('n')
            .select()
            .where('n.title ilike :title', { title: `%${title_like}%` })
            .andWhere('n.category = :category', { category })
            .orderBy(`n.${_sort}`, _order)
            .getMany();
        }
      }
    }
  }

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
      .andWhere('n.isPublished != false')
      .orderBy('n.createdAtDate', 'DESC')
      .addOrderBy('n.createdAtTime', 'DESC')
      .limit(pageSize)
      .offset((pageNumber - 1) * pageSize)
      .getMany();
  }

  async getNewsByCategoryById(id: string) {
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
      .where('n.id = :id', { id })
      .getOne();
  }

  async getBySearch(searchNameTerm: string = '', pageNumber: number = 1) {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select(['n.id', 'n.title', 'n.description', 'n.createdAtTime', 'n.category', 'n.fullImgUrl'])
      .where('n.title ilike :title', { title: `%${searchNameTerm.trimStart()}%` })
      .andWhere('n.isPublished != false')
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
      .where('n.title ilike :title', { title: `%${searchNameTerm.trimStart()}%` })
      .andWhere('n.isPublished != false')
      .getCount();
  }

  async getAmountOfCategory(category: string, sorting: string = 'all') {
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
        .andWhere('n.isPublished != false')
        .getCount();
    } else if (sorting === 'month') {
      const monthDate = new Date(+startDate - MONTH);
      return await this.newsRepository
        .createQueryBuilder('n')
        .select(['n.id', 'n.title', 'n.createdAtTime', 'n.category', 'n.fullImgUrl'])
        .where('n.category = :category', { category })
        .andWhere('n.createdAtDate > :monthDate', { monthDate })
        .andWhere('n.isPublished != false')
        .getCount();
    } else if (sorting === 'year') {
      const yearDate = new Date(+startDate - YEAR);
      return await this.newsRepository
        .createQueryBuilder('n')
        .select(['n.id', 'n.title', 'n.createdAtTime', 'n.category', 'n.fullImgUrl'])
        .where('n.category = :category', { category })
        .andWhere('n.createdAtDate > :yearDate', { yearDate })
        .andWhere('n.isPublished != false')
        .getCount();
    } else if (sorting === 'all') {
      return await this.newsRepository
        .createQueryBuilder('n')
        .select(['n.id', 'n.title', 'n.createdAtTime', 'n.category', 'n.fullImgUrl'])
        .where('n.category = :category', { category })
        .andWhere('n.isPublished != false')
        .getCount();
    }
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
        .andWhere('n.isPublished != false')
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
        .andWhere('n.isPublished != false')
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
        .andWhere('n.isPublished != false')
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
        .andWhere('n.isPublished != false')
        .orderBy('n.createdAtDate', 'DESC')
        .addOrderBy('n.createdAtTime', 'DESC')
        .limit(pageSize)
        .offset((pageNumber - 1) * pageSize)
        .getMany();
    }
  }

  async getAmountOfLast(sorting: string = 'all') {
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
        .andWhere('n.isPublished != false')
        .orderBy('n.createdAtDate', 'DESC')
        .addOrderBy('n.createdAtTime', 'DESC')
        .getCount();
    } else if (sorting === 'month') {
      const monthDate = new Date(+startDate - MONTH);
      return await this.newsRepository
        .createQueryBuilder('n')
        .select(['n.id', 'n.title', 'n.fullImgUrl', 'n.createdAtTime', 'n.description', 'n.category'])
        .where('n.createdAtDate > :monthDate', { monthDate })
        .andWhere('n.isPublished != false')
        .orderBy('n.createdAtDate', 'DESC')
        .addOrderBy('n.createdAtTime', 'DESC')
        .getCount();
    } else if (sorting === 'year') {
      const yearDate = new Date(+startDate - YEAR);
      return await this.newsRepository
        .createQueryBuilder('n')
        .select(['n.id', 'n.title', 'n.fullImgUrl', 'n.createdAtTime', 'n.description', 'n.category'])
        .where('n.createdAtDate > :yearDate', { yearDate })
        .andWhere('n.isPublished != false')
        .orderBy('n.createdAtDate', 'DESC')
        .addOrderBy('n.createdAtTime', 'DESC')
        .getCount();
    } else if (sorting === 'all') {
      return await this.newsRepository
        .createQueryBuilder('n')
        .select(['n.id', 'n.title', 'n.fullImgUrl', 'n.createdAtTime', 'n.description', 'n.category'])
        .where('n.isPublished != false')
        .orderBy('n.createdAtDate', 'DESC')
        .addOrderBy('n.createdAtTime', 'DESC')
        .getCount();
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
        .andWhere('n.isPublished != false')
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
        .andWhere('n.isPublished != false')
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
        .andWhere('n.isPublished != false')
        .orderBy('n.createdAtDate', 'DESC')
        .addOrderBy('n.createdAtTime', 'DESC')
        .limit(pageSize)
        .offset((pageNumber - 1) * pageSize)
        .getMany();
    } else if (sorting === 'all') {
      return await this.newsRepository
        .createQueryBuilder('n')
        .select(['n.id', 'n.title', 'n.fullImgUrl', 'n.createdAtTime', 'n.description', 'n.category'])
        .where('n.isPublished != false')
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
      .andWhere('n.isPublished != false')
      .orderBy('n.createdAtDate', 'DESC')
      .addOrderBy('n.createdAtTime', 'DESC')
      .limit(20)
      .getMany();
  }

  async getSwipeNews() {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select()
      .where('n.isPublished != false')
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
      .where('n.isPublished != false')
      .orderBy('n.createdAtDate', 'DESC')
      .limit(5)
      .offset(15)
      .getMany();
  }

  async getBottomNews(pageSize: number, pageNumber: number) {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select(['n.id', 'n.title', 'n.imgUrl', 'n.category'])
      .where('n.isPublished != false')
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
        'n.category',
        'n.imgUrl',
        'n.fullImgUrl',
        'n.createdAtTime',
        'n.viewDate',
        'n.votePositive',
        'n.voteNegative',
        'n.voteNeutral',
        'n.isPublished',
      ])
      .where('n.id = :id', { id })
      .getOne();
  }

  async getComments(newsId: string, pageNumber: number = 1, sort: 'ASC' | 'DESC') {
    return await this.commentsRepo
      .createQueryBuilder('c')
      .select(['c.id', 'c.text', 'c.username', 'c.viewDate', 'c.userImage'])
      .where('c.newsId = :newsId', { newsId })
      .orderBy('c.createdAt', sort)
      .limit(5)
      .offset((pageNumber - 1) * 5)
      .getMany();
  }
}
