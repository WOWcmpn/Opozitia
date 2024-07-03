import { Body, Controller, Get, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { BottomCommentsQueryRepository } from '../repositories/bottomComments.query-repository';
import { BottomCommentsRepository } from '../repositories/bottomComments.repository';

@Controller('bottomComments')
export class BottomCommentsController {
  constructor(
    private readonly bottomCommentsQueryRepo: BottomCommentsQueryRepository,
    private readonly bottomCommentsRepo: BottomCommentsRepository,
  ) {}

  @Get()
  @HttpCode(200)
  async getAllAdmin(
    @Query() query: { username_like: string; text_like: string; _order: 'asc' | 'desc'; _sort: string },
  ) {
    let sortBy: 'ASC' | 'DESC';
    if (query._order === 'asc') {
      sortBy = 'ASC';
      return await this.bottomCommentsQueryRepo.getAll(
        query.username_like,
        query.text_like,
        query._sort,
        sortBy,
      );
    } else if (query._order === 'desc') {
      sortBy = 'DESC';
      return await this.bottomCommentsQueryRepo.getAll(
        query.username_like,
        query.text_like,
        query._sort,
        sortBy,
      );
    } else {
      return await this.bottomCommentsQueryRepo.getAll(query.username_like, query.text_like, query._sort);
    }
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    return await this.bottomCommentsQueryRepo.getById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  async updateByAdmin(@Param('id') id: string, @Body() data: { text: string }) {
    return await this.bottomCommentsRepo.updateByAdmin(id, data);
  }
}
