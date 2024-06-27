import axios, { AxiosResponse } from 'axios';
import {
  IComments,
  ICreateNews,
  ICrypto,
  ICurrency,
  IFullCrypto,
  IFullCurrency,
  IHomeNews,
  IMainCrypto,
  IMainNews,
  INews,
  INewsVotes,
  IPollsNews,
  IProfileInfo,
  ISearchNews,
  ISingleNews,
  IWeather,
  quizVotes,
} from '@/types/types';

axios.defaults.baseURL = "http://localhost:4000/"
// axios.defaults.baseURL = "https://opozitia-server.vercel.app/";

export const NewsService = {
  async getCountComments(newsId: string): Promise<number> {
    const {data} = await axios.get(`comments/count-comments/${newsId}`)
    return data
  },

  async createBottomComment(commentId: string, text: string, login: string): Promise<AxiosResponse | null> {
    return await axios.post(`comments/createBottom/${commentId}`, {data: {text, login}})
  },

  async getBottomComments(commentId: string): Promise<IComments[] | []> {
    const {data} = await axios.get(`comments/${commentId}`)
    return data
  },

  async sendEmail(name: string, location: string, text: string): Promise<AxiosResponse | null> {
    try {
      return await axios.post('user/send-question', { inputData: { name, location, text } })
    } catch (err) {
      console.error('Service send email error ', err);
      return null
    }
  },

  async changeProfile(
    userId: string,
    email: string,
    login: string,
    age: string,
    location: string,
    favoriteNewsCategory: string
  ) {
    return await axios.put('user/profile/change-information', {
      userId,
      email,
      login,
      age,
      location,
      favoriteNewsCategory
    })
  },

  async getUserProfile(login: string): Promise<IProfileInfo> {
    const {data} = await axios.get('user/profile-login', {params: {
      login
      }})
    return data
  },

  async getCryptoFull(id: string, pageSize: number): Promise<IFullCrypto[]> {
    const {data} = await axios.get(`crypto/full/${id}`, {params: {
      pageSize
      }})
    return data
  },

  async getCryptoById(id: string): Promise<IMainCrypto> {
    const {data} = await axios.get(`crypto/${id}`)
    return data
  },

  async getLastCrypto(): Promise<ICrypto> {
    const {data} = await axios.get('crypto/last')
    return data
  },

  async getGraphicCrypto(): Promise<ICrypto[]> {
    const {data} = await axios.get('crypto/graphic')
    return data
  },

  async getCurrencyParams(id: string, pageSize: number): Promise<IFullCurrency[]> {
    const {data} = await axios.get(`currency/params/${id}`, { params: { pageSize} })
    return data
  },

  async getCurrencyById(id: string) {
    const {data} = await axios.get(`currency/${id}`)
    return data
  },

  async getCurrency(): Promise<ICurrency> {
    const {data} = await axios.get('currency')
    return data
  },

  async getGraphicCurrency(): Promise<ICurrency[]> {
    const {data} = await axios.get('currency/graphic')
    return data
  },

  async getWeather(city: string): Promise<IWeather> {
    const {data} = await axios.get('news/weather', {params: { city }})
    return data
  },

  async sendVote(vote: quizVotes, id: string, login: string) {
    const {data} = await axios.post(`quiz/vote/${id}`, {inputVote: vote, login})
    return data
  },

  async createNews(inputData: ICreateNews): Promise<string> {
    const {data} = await axios.post('news/create-news', {file: inputData.file,
      title: inputData.title, description: inputData.description, category: inputData.newsCategory})
    return data
  },

  async getNewsVotes(id: string): Promise<INewsVotes> {
    const {data} = await axios.get(`news/${id}/votes`)
    return data
  },

  async getNewsByCategory(pageNumber: number, pageSize: number, category?: string): Promise<IPollsNews[]> {
    const { data } = await axios.get('news/category', { params: {
      pageNumber, pageSize, category
    }})
    return data
  },

  async getSearchNews(searchNameTerm?: string, pageNumber?: number): Promise<ISearchNews[]> {
    const {data} = await axios.get('news/search', {params: {
      searchNameTerm, pageNumber
      }})
    return data
  },

  async getCountSearch(searchNameTerm?: string): Promise<number> {
    const {data} = await axios.get('news/search-count', {params: {
      searchNameTerm
      }})
    return data
  },

  async getAmountOfCategory(category: string, sorting?: string): Promise<number> {
    const {data} = await axios.get('news/amount', {params: {
      category, sorting
      }})
    return data
  },

  async getBusinessNews(pageNumber?: number, pageSize?: number, sorting?: string): Promise<IMainNews[]> {
    const { data } = await axios.get("news/business", {params: {
        pageNumber, pageSize, sorting
      }})
    return data;
  },

  async getEconomyNews(pageNumber?: number, pageSize?: number, sorting?: string): Promise<IMainNews[]> {
    const { data } = await axios.get("news/economy", {params: {
        pageNumber, pageSize, sorting
      }});
    console.log(data);
    return data;
  },

  async getPolicyNews(pageNumber?: number, pageSize?: number, sorting?: string): Promise<IMainNews[]> {
    const { data } = await axios.get("news/policy", {params: {
        pageNumber, pageSize, sorting
      }});
    return data;
  },

  async getWorldNews(pageNumber?: number, pageSize?: number, sorting?: string): Promise<IMainNews[]> {
    const { data } = await axios.get("news/world", {params: {
        pageNumber, pageSize, sorting
      }});
    return data;
  },

  async getSidebarNews(category?: string): Promise<INews[]> {
    const { data } = await axios.get("news/sidebar", {params: {category}})
    return data
  },

  async getNewsById(id: string): Promise<ISingleNews> {
    const { data } = await axios.get<ISingleNews>(`news/${id}`);
    return data;
  },

  async getComments(id: string, pageNumber: number, sort: 'ASC' | 'DESC' = 'DESC'): Promise<IComments[]> {
    const {data} = await axios.get<IComments[]>(`news/${id}/comments`, {params: {
      pageNumber, sort
      }})
    return data
  },

  async getAmountOfLast(sorting?: string): Promise<number> {
    const {data} = await axios.get('news/amount-last', {params: {sorting}})
    return data
  },

  async getLastNews(pageNumber?: number, pageSize?: number, sorting?: string): Promise<IMainNews[]> {
    const { data } = await axios.get<IMainNews[]>("news/last-news", {params: {
        pageNumber, pageSize, sorting
      }});
    return data;
  },

  async getNewsHome(): Promise<IHomeNews | null> {
    const { data } = await axios.get<IHomeNews>("news/home");
    return data;
  },

  async createComment(id: string, text: string, login: string) {
    const {data} = await axios.post(`news/${id}/test`, { data: { text, login } })
    return data
  }
};
