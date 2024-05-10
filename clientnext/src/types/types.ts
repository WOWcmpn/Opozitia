import { StaticImageData } from "next/image";

export interface IHomeNews {
  news: INews[];
  amount: number;
  mainNews: INews[];
  swipeNews: INews[];
  bottomNewsOne: INews[];
  bottomNewsTwo: INews[];
  bottomNewsThree: INews[];
}

export interface ISingleNews {
  id: string;
  title: string;
  imgUrl: StaticImageData;
  createdAtTime: string;
  createdAtDate: string;
  viewDate: string;
  category: string;
  description: string;
  fullImgUrl: StaticImageData;
}

export interface IFullSingleNews {
  news: ISingleNews;
  sidebarNews: ISideBarsNews[];
}

export interface INews {
  id: string;
  title: string;
  imgUrl: string;
  createdAtTime: string;
  category: string;
  description: string;
}

export interface ISideBarsNews {
  id: string;
  title: string;
  imgUrl: string;
  createdAtTime: string;
  description: string;
  category: string;
}

export interface ILastNews {
  news: INews[];
  amount: number;
  sidebarNews: ISideBarsNews[];
}

export interface IFullNews {
  news: INews[];
  amount: number;
  sidebarNews: ISideBarsNews[];
}

export interface IRegisterUser {
  email: string;
  login: string;
  password: string;
  confirmPassword: string;
}

export type LatestNewsProps = {
  id: string;
  title: string;
  text: string;
  img: string;
  time: string;
  category: string;
};

export type MainBlockSlideProps = {
  title: string;
  img: StaticImageData | string;
  category: string;
  id: string;
};

export type GraphicsBlockProps = {
  name: string;
  title: string;
  tradeInfo: string;
  changeMinus: string;
  img: StaticImageData;
};

export type BlockContentProps = {
  title: string;
  firstLink: string;
  firstCategory: string;
  img: StaticImageData;
  link1: string;
  link2: string;
  link3: string;
};

export type HeaderProps = {
  className?: string;
  onClick?: React.Dispatch<React.SetStateAction<number>>;
  onLogin?: React.Dispatch<React.SetStateAction<number>>;
  onSearch?: React.Dispatch<React.SetStateAction<number>>;
  onNews?: React.Dispatch<React.SetStateAction<number>>;
};

export type PageNewsProps = {
  id: string;
  title: string;
  img: string;
  link1: string;
  link2: string;
  link3: string;
  createdAtTime: string;
  category: string;
};

export type CommentProps = {
  name: string;
  img: StaticImageData;
  class1: string;
  time: string;
  text: string;
  likes: number | string;
};

export type SearchResultProps = {
  title: string;
  img: StaticImageData;
  link1: string;
  link2: string;
  link3: string;
  text: string;
  time: string;
  topTitle: string;
};

export type CurrencyBodyProps = {
  graph1: StaticImageData;
  graph2: StaticImageData;
  colr: Array<string>;
  colb: Array<string>;
};

export type PopupProps = {
  onClick: React.Dispatch<React.SetStateAction<number>>;
  onPolls?: React.Dispatch<React.SetStateAction<number>>;
  classes: string;
};

interface Champs {
  img: StaticImageData;
  num: number;
  name: string;
  games: number;
  scores: number;
}

export type ChampionshipProps = {
  title: string;
  img: StaticImageData;
  champs: Array<Champs>;
};

export type PollsItemProps = {
  img: StaticImageData;
  title: string;
  agree: string;
  neutral: string;
  disagree: string;
  onClick: React.Dispatch<React.SetStateAction<number>>;
};

export type AccountPopupProps = {
  onClick: React.Dispatch<React.SetStateAction<number>>;
};

export type LoginPopupProps = {
  onClick: React.Dispatch<React.SetStateAction<number>>;
  setOption: React.Dispatch<React.SetStateAction<number>>;
};

export type SearchProps = {
  onSearch: React.Dispatch<React.SetStateAction<number>>;
};
