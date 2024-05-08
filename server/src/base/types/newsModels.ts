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
  Economic = 'Economic',
  Policy = 'Policy',
  Business = 'Business',
  World = 'World',
}
