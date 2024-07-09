import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { DaysEventQueryRepository } from '../repositories/daysEvent.query-repository';
import { DaysEventRepository } from '../repositories/daysEvent.repository';

@Controller('daysEvent')
export class DaysEventController {
  constructor(
    private readonly daysEventQueryRepo: DaysEventQueryRepository,
    private readonly daysEventRepo: DaysEventRepository,
  ) {}

  @Get()
  @HttpCode(200)
  async getAll(
    @Query() query: { title_like: string; _order: 'asc' | 'desc'; _sort: string; isPublished: string },
  ) {
    let isPublished: boolean;
    let order: 'ASC' | 'DESC';
    if (query.isPublished === 'true') {
      isPublished = true;
      if (query._order === 'asc') {
        order = 'ASC';
        return await this.daysEventQueryRepo.getAll(query.title_like, query._sort, order, isPublished);
      } else if (query._order === 'desc') {
        order = 'DESC';
        return await this.daysEventQueryRepo.getAll(query.title_like, query._sort, order, isPublished);
      } else {
        return await this.daysEventQueryRepo.getAll(query.title_like, query._sort, 'DESC', isPublished);
      }
    } else if (query.isPublished === 'false') {
      isPublished = false;
      if (query._order === 'asc') {
        order = 'ASC';
        return await this.daysEventQueryRepo.getAll(query.title_like, query._sort, order, isPublished);
      } else if (query._order === 'desc') {
        order = 'DESC';
        return await this.daysEventQueryRepo.getAll(query.title_like, query._sort, order, isPublished);
      } else {
        return await this.daysEventQueryRepo.getAll(query.title_like, query._sort, 'DESC', isPublished);
      }
    } else {
      if (query._order === 'asc') {
        order = 'ASC';
        return await this.daysEventQueryRepo.getAll(query.title_like, query._sort, order);
      } else if (query._order === 'desc') {
        order = 'DESC';
        return await this.daysEventQueryRepo.getAll(query.title_like, query._sort, order);
      } else {
        return await this.daysEventQueryRepo.getAll(query.title_like, query._sort, 'DESC');
      }
    }
  }

  @Get('all')
  @HttpCode(200)
  async getAllDaysEvent() {
    return await this.daysEventQueryRepo.getDaysEvent();
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    return await this.daysEventQueryRepo.getById(id);
  }

  @Post()
  @HttpCode(201)
  async createDayEvent(@Body() data: { title: string; viewDate: string; isPublished: boolean }) {
    return await this.daysEventRepo.createDayEvent({
      title: data.title,
      viewDate: new Date(data.viewDate).toDateString(),
      createdAt: new Date(data.viewDate),
      isPublished: data.isPublished,
    });
  }

  @Patch(':id')
  @HttpCode(201)
  async updateDayEvent(@Param('id') id: string, @Body() data: { title: string; isPublished: boolean }) {
    return await this.daysEventRepo.updateDayEvent(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteById(@Param('id') id: string) {
    return await this.daysEventRepo.deleteById(id);
  }
}
