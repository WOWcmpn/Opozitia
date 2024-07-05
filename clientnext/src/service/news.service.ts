import axios from './axios';
import {
  ICreateNews,
  IDaysEvent,
  IHomeNews,
  IMainNews,
  INews,
  INewsVotes,
  IPollsNews,
  ISearchNews,
  ISingleNews,
  IWeather,
  quizVotes,
} from '@/types/types';

export const NewsService = {
  async getDaysEvent(): Promise<IDaysEvent[] | []> {
    const {data} = await axios.get('daysEvent/all')
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

  async getNewsByCategoryById(id: string): Promise<IPollsNews> {
    const { data } = await axios.get(`news/category/${id}`)
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
  }
};
