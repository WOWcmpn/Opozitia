import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from '../domain/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsQueryRepository {
  constructor(@InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>) {}

  async getAllNewsByCategory(
    category: string,
    searchNameTerm: string = ' ',
    sortBy: string,
    pageNumber: number,
  ) {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select(['n.id', 'n.title', 'n.imgUrl', 'n.createdAtTime', 'n.category'])
      .where('n.category = :category', { category })
      .andWhere('n.title ilike :name', { name: `%${searchNameTerm.toString()}%` })
      .orderBy('n.createdAtDate', 'DESC')
      .addOrderBy('n.createdAtTime', 'DESC')
      .limit(20)
      .getMany();
  }

  async getNewsByTitle(title: string | undefined) {
    return await this.newsRepository.findOneBy({ title });
  }

  async getNewsById(id: string) {
    return await this.newsRepository.findOneBy({ id });
  }

  async getAllLastNews(searchNameTerm: string = ' ', sortBy: string, pageNumber: number) {
    return await this.newsRepository
      .createQueryBuilder('n')
      .select(['n.id', 'n.title', 'n.imgUrl', 'n.createdAtTime', 'n.description'])
      .where('n.title ilike :name', { name: `%${searchNameTerm.toString()}%` })
      .orderBy('n.createdAtDate', 'DESC')
      .addOrderBy('n.createdAtTime', 'DESC')
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
}
