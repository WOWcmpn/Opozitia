import axios from "axios";
import {
  IComments, ICurrency,
  IHomeNews, IMainNews,
  INews, ISearchNews, ISingleNews, IWeather
} from "@/types/types";

axios.defaults.baseURL = "http://localhost:4000/"
// axios.defaults.baseURL = "https://opozitia-server.vercel.app/";

export const NewsService = {
  async getCurrency(): Promise<ICurrency> {
    const {data} = await axios.get('news/currency')
    return data
  },

  async getGraphicCurrency(): Promise<ICurrency[]> {
    const {data} = await axios.get('news/graphic-currency')
    return data
  },

  async getWeather(city?: string): Promise<IWeather> {
    const {data} = await axios.get('news/weather')
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

  async getBusinessNews(pageNumber?: number, pageSize?: number, sorting?: string): Promise<IMainNews[]> {
    const { data } = await axios.get("news/business", {params: {
        pageNumber, pageSize, sorting
      }})
    return data;
  },

  async getEconomyNews(pageNumber?: number, pageSize?: number, sorting?: string): Promise<IMainNews[]> {
    const { data } = await axios.get("news/economika", {params: {
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

  async getComments(id: string, pageNumber: number) {
    const {data} = await axios.get<IComments[]>(`news/${id}/comments`, {params: {
      pageNumber
      }})
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

  async createComment(id: string, text: string) {
    const {data} = await axios.post(`news/${id}/test`, { data: { text } })
    return data
  }
};
