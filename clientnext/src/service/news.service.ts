import axios from "axios";
import {
  IComments,
  IHomeNews,
  INews, ISingleNews
} from "@/types/types";

axios.defaults.baseURL = "http://localhost:4000/";

export const NewsService = {
  async getBusinessNews(pageNumber?: number, pageSize?: number): Promise<INews[]> {
    const { data } = await axios.get("news/business", {params: {
        pageNumber, pageSize
      }})
    return data;
  },

  async getEconomyNews(pageNumber?: number, pageSize?: number): Promise<INews[]> {
    const { data } = await axios.get("news/economika", {params: {
        pageNumber, pageSize
      }});
    return data;
  },

  async getPolicyNews(pageNumber?: number, pageSize?: number): Promise<INews[]> {
    const { data } = await axios.get("news/policy", {params: {
        pageNumber, pageSize
      }});
    return data;
  },

  async getWorldNews(pageNumber?: number, pageSize?: number): Promise<INews[]> {
    const { data } = await axios.get("news/world", {params: {
        pageNumber, pageSize
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

  async getLastNews(pageNumber?: number, pageSize?: number): Promise<INews[]> {
    const { data } = await axios.get<INews[]>("news/last-news", {params: {
        pageNumber, pageSize
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
