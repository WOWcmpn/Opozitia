import { StaticImageData } from "next/image";

export interface City {
  city_id: string
  country_id: string
  region_id: string
  name: string
}

export interface IChangeProfile {
  originalLogin: string
  email: string
  login: string
  age: string
  location: string
  favoriteNewsCategory: string
}

export interface IProfileInfo {
  email: string
  login: string
  age: string
  location: string
  favoriteNewsCategory: string
}

export type userAccount = {
  setChange: React.Dispatch<React.SetStateAction<number>>;
  setPassRecovery: React.Dispatch<React.SetStateAction<number>>
}

export interface ILogin {
  accessToken: string
  login: string
  email: string
  location: string
  id: string
  favoriteNewsCategory: string
  age: string
}

export interface ICreateNews {
  file: any;
  title: string;
  newsCategory: string;
  description: string;
}

export interface INewsVotes {
  title: string
  votePositive: number
  voteNegative: number
  voteNeutral: number
}

export enum quizVotes {
  Dislike = 'Не поддерживаю',
  Like = 'Поддерживаю',
  Whatever = 'Нейтрально',
}

export interface IFullCrypto {
  rate: string
  percentage: string
  difference: string
  viewDate: string
}

export interface IFullCurrency {
  rate: string
  percentage: string
  difference: string
  viewDate: string
}

export interface IMainCrypto {
  rate: string
  percentage: string
  difference: string
}

export interface IMainCurrency {
  rate: string
  percentage: string
  difference: string
}

export interface ISchedule {
  labels: string[]
  data: string[]
}

export interface ICrypto {
  id: string,
  date: string,
  viewDate: string,
  time: string,
  rateBTC: string,
  rateETH: string,
  rateBNB: string,
  rateNOT: string,
  rateSOL: string,
  rateLTC: string,
  rateBCH: string,
  percentageBTC: string,
  percentageETH: string,
  percentageBNB: string,
  percentageNOT: string,
  percentageSOL: string,
  percentageLTC: string,
  percentageBCH: string,
  differenceBTC: string,
  differenceETH: string,
  differenceBNB: string,
  differenceNOT: string,
  differenceSOL: string,
  differenceLTC: string,
  differenceBCH: string
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

export interface IPollsNews {
  id: string
  title: string
  fullImgUrl: string
  category: string
  votePositive: string
  voteNegative: string
  voteNeutral: string
}

export interface IHomeNews {
  news: INews[];
  amount: number;
  mainNews: IMainNews[];
  swipeNews: INews[];
  bottomNewsOne: BottomNews[];
  bottomNewsTwo: BottomNews[];
  bottomNewsThree: BottomNews[];
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
  votePositive: string
  voteNegative: string
  voteNeutral: string
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
  percentage: string;
  labels: string[];
  data: string[];
  img?: string
};

export type BottomNews = {
  id: string
  title: string
  imgUrl: string
  category: string
}

export type BlockContentProps = {
  title: string;
  firstLink: string;
  firstCategory: string;
  img: string;
  link1: BottomNews;
  link2: BottomNews;
  link3: BottomNews;
};

export type HeaderProps = {
  className?: string;
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

export interface ICurrencyElement {
  img: string
  name: string;
  rate: string;
  percentage: string;
  difference: string;
  url: string;
}

export type CryptoValueProps = {
  name: string;
  img: string;
  rate: string;
  percentage: string;
  difference: string;
}

export type CurrencyValueProps = {
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
  name: string,
  page: number
};

// export type CurrencyBodyProps = {
//   graph1: StaticImageData;
//   graph2: StaticImageData;
//   colr: Array<string>;
//   colb: Array<string>;
// };

export type PopupProps = {
  onClick: React.Dispatch<React.SetStateAction<number>>;
  onPolls?: React.Dispatch<React.SetStateAction<number>>;
  classes: string;
  positive: number
  negative: number
  neutral: number
  title: string
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
  id: string
  img: string;
  title: string;
  agree: number;
  neutral: number;
  disagree: number;
  onClick: React.Dispatch<React.SetStateAction<number>>;
  onPositiveVote: React.Dispatch<React.SetStateAction<number>>
  onNegativeVote: React.Dispatch<React.SetStateAction<number>>
  onNeutralVote: React.Dispatch<React.SetStateAction<number>>
  onTitle: React.Dispatch<React.SetStateAction<string>>
};

export type AccountPopupProps = {
  onClick: React.Dispatch<React.SetStateAction<number>>;
};

export type RecoveryPopupProps = {
  onClick: React.Dispatch<React.SetStateAction<number>>;
  setPassRecovery: React.Dispatch<React.SetStateAction<number>>
  setEmail: React.Dispatch<React.SetStateAction<string>>
  sendRecoveryCode: () => void
};

export type LoginPopupProps = {
  onClick: React.Dispatch<React.SetStateAction<number>>;
  setOption: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export type ConfirmCodeProps = {
  onClick: React.Dispatch<React.SetStateAction<number>>;
  setInputConfirmCode: React.Dispatch<React.SetStateAction<string>>
  email: string
  confirm: () => void
};

export type ConfirmRecoveryCodeProps = {
  onClick: React.Dispatch<React.SetStateAction<number>>;
  setInputConfirmCode: React.Dispatch<React.SetStateAction<string>>
  email: string
  confirmCode: () => void
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
  login: string;
  setLogin: React.Dispatch<React.SetStateAction<string>>;
  pass: string;
  setPass: React.Dispatch<React.SetStateAction<string>>;
  confirmPass: string;
  setConfirmPass: React.Dispatch<React.SetStateAction<string>>;
  register: () => void;
};

export type NewPassPopupProps = {
  onClick: React.Dispatch<React.SetStateAction<number>>;
  pass: string;
  setPass: React.Dispatch<React.SetStateAction<string>>;
  confirmPass: string;
  setConfirmPass: React.Dispatch<React.SetStateAction<string>>;
  setPrevPassword: React.Dispatch<React.SetStateAction<string>>;
  newPassword: () => void
};

export type NewRecoveryPassPopupProps = {
  onClick: React.Dispatch<React.SetStateAction<number>>;
  recoveryPass: string;
  setRecoveryPass: React.Dispatch<React.SetStateAction<string>>;
  confirmRecoveryPass: string;
  setConfirmRecoveryPass: React.Dispatch<React.SetStateAction<string>>;
  newRecoveryPassword: () => void
};

export type SearchProps = {
  onSearch: React.Dispatch<React.SetStateAction<number>>;
};
