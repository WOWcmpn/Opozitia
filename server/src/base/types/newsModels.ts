import { IsEnum, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface newsEconomicModel {
  link: string | undefined;
  title: string | undefined;
  imgUrl: string | undefined;
  createdAtDate?: Date | undefined;
  category: newsCategory;
  viewDate?: string;
}

export interface fullNewsModel {
  link: string;
  title: string;
  imgUrl: string;
  fullImgUrl: string;
  description: string;
  createdAtTime: string;
  createdAtDate: Date;
  category: string;
  viewDate: string;
}

export enum newsCategory {
  Economy = 'Economy',
  Policy = 'Policy',
  Business = 'Business',
  World = 'World',
}

export enum favoriteNewsCategory {
  Экономика = 'Экономика',
  Политика = 'Политика',
  Бизнес = 'Бизнес',
  Мир = 'Мир',
}

export class CreateNews {
  // @ApiProperty({ type: 'string', format: 'binary' })
  // file: any;

  @ApiProperty()
  @IsString()
  @Length(8, 35)
  title: string;

  @ApiProperty()
  @IsString()
  @Length(30, 5000)
  description: string;

  @ApiProperty()
  @IsEnum(newsCategory)
  category: newsCategory;
}
