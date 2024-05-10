import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from '../domain/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsQueryRepository {
  constructor(@InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>) {}

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

  async getAllNewsByCategory(category: string, sortBy: string, pageNumber: number = 1) {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select(['n.id', 'n.title', 'n.imgUrl', 'n.createdAtTime', 'n.category'])
      .where('n.category = :category', { category })
      .orderBy('n.createdAtDate', 'DESC')
      .addOrderBy('n.createdAtTime', 'DESC')
      .offset(pageNumber)
      .limit(20)
      .getMany();
  }

  async getAllLastNews(sortBy: string, pageNumber: number = 1) {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select(['n.id', 'n.title', 'n.imgUrl', 'n.createdAtTime', 'n.description', 'n.category'])
      .orderBy('n.createdAtDate', 'DESC')
      .addOrderBy('n.createdAtTime', 'DESC')
      .offset(pageNumber)
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
    return await this.newsRepository.findOneBy({ id });
  }
}
