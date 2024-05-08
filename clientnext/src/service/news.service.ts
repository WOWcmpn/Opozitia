import axios from 'axios';
import { IFullNews, IFullSingleNews, IHomeNews, ILastNews } from '@/types/types';

axios.defaults.baseURL = 'http://localhost:4000/news'

export const NewsService = {
  async getBusinessNews(): Promise<IFullNews | null> {
    const {data} = await axios.get<IFullNews>('/business')
    return data
  },

  async getEconomyNews(): Promise<IFullNews | null> {
    const {data} = await axios.get<IFullNews>('/economika')
    return data
  },

  async getPolicyNews(): Promise<IFullNews | null> {
    const {data} = await axios.get<IFullNews>('/policy')
    return data
  },

  async getWorldNews(): Promise<IFullNews | null> {
    const {data} = await axios.get<IFullNews>('/world')
    return data
  },

  async getNewsById(id: string): Promise<IFullSingleNews | null> {
    const {data} = await axios.get<IFullSingleNews>(`/${id}`)
    return data
  },

  async getLastNews():Promise<ILastNews> {
    const {data} = await axios.get<ILastNews>('last-news')
    return data
  },

  async getNewsHome(): Promise<IHomeNews | null> {
    const {data} = await axios.get<IHomeNews>('/home')
    return data
  }
 }