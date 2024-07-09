export enum favoriteNewsCategory {
  Экономика = 'Экономика',
  Политика = 'Политика',
  Бизнес = 'Бизнес',
  Мир = 'Мир',
  Неизвестно = 'Неизвестно'
}

export enum newsCategory {
  Economy = 'Economy',
  Policy = 'Policy',
  Business = 'Business',
  World = 'World',
}

export interface IDaysEvent {
  id: string
  title: string
  viewDate: string
  createdAt: Date
  isPublished: boolean
}

export interface INews {
  id: string
  title: string
  viewDate: string
  category: newsCategory
  createdAtDate: Date
  createdAtTime: string
  description: string
  imgUrl: string
  fullImgUrl: string
  votePositive: number
  voteNegative: number
  voteNeutral: number
}

interface ISearchNews {
  title: string;
  id: string
}

interface ISearchUsers {
  login: string;
}

interface ISearchComments {
  text: string;
  login: string
}

interface ISearchBottomComments {
  text: string;
  username: string
}

export interface IUsers {
  id: string
  email: string
  login: string
  location: string
  favoriteNewsCategory: favoriteNewsCategory
  isConfirmed: true | false
  createdAt: string
  age: string
}

export interface IComments {
  id: string
  text: string
  username: string
  createdAt: Date
  newsId: string
  viewDate: string
}

export interface IBottomComments {
  id: string
  text: string
  username: string
  createdAt: Date
  commentId: string
  viewDate: string
}