import { IsBoolean, IsEnum, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum newsCategory {
  Economy = 'Economy',
  Policy = 'Policy',
  Business = 'Business',
  World = 'World',
}

export class UpdateNews {
  @IsString()
  title: string;

  @IsEnum(newsCategory)
  category: newsCategory;

  @IsString()
  description: string;

  @IsString()
  viewDate: string;

  @IsString()
  imgUrl: string;

  @IsString()
  fullImgUrl: string;

  @IsBoolean()
  isPublished: boolean;
}

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
  isPublished: boolean;
}

export enum favoriteNewsCategory {
  Экономика = 'Экономика',
  Политика = 'Политика',
  Бизнес = 'Бизнес',
  Мир = 'Мир',
  Неизвестно = 'Неизвестно',
}

export class CreateNewsAdmin {
  @IsString()
  imgUrl: string;

  @IsString()
  fullImgUrl: string;

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

  @IsBoolean()
  isPublished: boolean;
}

export class CreateNews {
  @IsString()
  file: string;

  @ApiProperty()
  @IsString()
  @Length(5, 85)
  title: string;

  @ApiProperty()
  @IsString()
  @Length(30, 5000)
  description: string;

  @ApiProperty()
  @IsEnum(newsCategory)
  category: newsCategory;
}
