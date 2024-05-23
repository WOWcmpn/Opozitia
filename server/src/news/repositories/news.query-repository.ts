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

  async getBySearch(searchNameTerm: string = '') {
    const news = await this.newsRepository
      .createQueryBuilder('n')
      .select()
      .where('n.title ilike :title', { title: `%${searchNameTerm}%` })
      .orderBy('n.createdAtDate', 'DESC')
      .addOrderBy('n.createdAtTime', 'DESC')
      .limit(20)
      .getMany();

    const count = await this.newsRepository
      .createQueryBuilder('n')
      .select()
      .where('n.title ilike :title', { title: `%${searchNameTerm}%` })
      .getCount();
    return { count, news };
  }

  async getAllNewsByCategory(
    category: string,
    sortBy: string,
    pageNumber: number = 1,
    pageSize: number = 10,
  ) {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select(['n.id', 'n.title', 'n.imgUrl', 'n.createdAtTime', 'n.category'])
      .where('n.category = :category', { category })
      .orderBy('n.createdAtDate', 'DESC')
      .addOrderBy('n.createdAtTime', 'DESC')
      .limit(pageSize)
      .offset((pageNumber - 1) * pageSize)
      .getMany();
  }

  async getAllLastNews(sortBy: string, pageNumber: number = 1, pageSize: number = 10) {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select(['n.id', 'n.title', 'n.imgUrl', 'n.createdAtTime', 'n.description', 'n.category'])
      .orderBy('n.createdAtDate', 'DESC')
      .addOrderBy('n.createdAtTime', 'DESC')
      .limit(pageSize)
      .offset((pageNumber - 1) * pageSize)
      .getMany();
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
      .select()
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
