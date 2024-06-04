import { StaticImageData } from "next/image";

export interface ISchedule {
  labels: string[]
  data: string[]
}

export interface ICurrency {
  id: string
  date: string
  viewDate: string
  EURToUSD: string
  USDToJPY: string
  GBPToUSD: string
  USDToRUB: string
  EURToRUB: string
  USDToRON: string
  EURToRON: string
  percentageEURToUSD: string,
  percentageUSDToJPY: string,
  percentageGBPToUSD: string,
  percentageUSDToRUB: string,
  percentageEURToRUB: string,
  percentageUSDToRON: string,
  percentageEURToRON: string,
  differenceEURToUSD: string,
  differenceUSDToJPY: string,
  differenceGBPToUSD: string,
  differenceUSDToRUB: string,
  differenceEURToRUB: string,
  differenceUSDToRON: string,
  differenceEURToRON: string,
}

export interface IWeather {
  location: string,
  time: string,
  currentTemperature: number,
  dayTemperature: number
  nightTemperature: number
  conditionText: string
  conditionIcon: string
  windMPH: number
  humidity: number
  chanceOfRain: number
  dateOne: string
  dayTemperatureOne: number
  nightTemperatureOne: number
  dayConditionTextOne: string
  dayConditionIconOne: string
  nightConditionTextOne: string
  nightConditionIconOne: string
  dateTwo: string
  dayTemperatureTwo: number
  nightTemperatureTwo: number
  dayConditionTextTwo: string
  dayConditionIconTwo: string
  nightConditionTextTwo: string
  nightConditionIconTwo: string
}

export interface IHomeNews {
  news: INews[];
  amount: number;
  mainNews: IMainNews[];
  swipeNews: INews[];
  bottomNewsOne: INews[];
  bottomNewsTwo: INews[];
  bottomNewsThree: INews[];
}

export interface IComments {
  text: string
  username: string
  viewDate: string
  userImage: string
}

export interface ISingleNews {
  id: string;
  title: string;
  imgUrl: string;
  createdAtTime: string;
  createdAtDate: string;
  viewDate: string;
  category: string;
  description: string;
  fullImgUrl: string;
}

export interface IMainNews {
  id: string;
  title: string;
  fullImgUrl: string;
  createdAtTime: string;
  category: string;
  description: string;
}

export interface INews {
  id: string;
  title: string;
  imgUrl: string;
  createdAtTime: string;
  category: string;
  description: string;
}

export interface ISearchNews {
  id: string;
  title: string;
  fullImgUrl: string;
  category: string;
  description: string;
  createdAtTime: string
}

export interface IRegisterUser {
  email: string;
  login: string;
  password: string;
  confirmPassword: string;
}

export interface IConfirmationCode {
  confirmationCode: string;
}

export interface ILoginUser {
  email: string;
  password: string;
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
  img: string;
  category: string;
  id: string;
};

export type GraphicsBlockProps = {
  name: string;
  title: string;
  tradeInfo: string;
  changeMinus: string;
  labels: string[];
  data: string[];
  img?: string
};

export type BlockContentProps = {
  title: string;
  firstLink: string;
  firstCategory: string;
  img: string;
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
  createdAtTime: string;
  category: string;
};

export type CurrencyProps = {
  name1: string;
  name2: string;
  img1: string;
  img2: string;
  rate: string;
  percentage: string;
  difference: string;
}

export type CommentProps = {
  name: string;
  img: string;
  class1: string;
  time: string;
  text: string;
  likes: number | string;
};

export type SearchResultProps = {
  title: string;
  img: string;
  id: string;
  text: string;
  time: string;
  category: string;
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
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export type PassPopupProps = {
  onClick: React.Dispatch<React.SetStateAction<number>>;
  setOption: React.Dispatch<React.SetStateAction<number>>;
  pass: string;
  setPass: React.Dispatch<React.SetStateAction<string>>;
  login: () => void;
};

export type RegisterEmailPopupProps = {
  onClick: React.Dispatch<React.SetStateAction<number>>;
  setOption: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export type RegisterPassPopupProps = {
  onClick: React.Dispatch<React.SetStateAction<number>>;
  setOption: React.Dispatch<React.SetStateAction<number>>;
  login: string;
  setLogin: React.Dispatch<React.SetStateAction<string>>;
  pass: string;
  setPass: React.Dispatch<React.SetStateAction<string>>;
  confirmPass: string;
  setConfirmPass: React.Dispatch<React.SetStateAction<string>>;
  register: () => void;
};

export type SearchProps = {
  onSearch: React.Dispatch<React.SetStateAction<number>>;
};
