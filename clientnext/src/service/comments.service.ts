import axios from '@/service/axios';
import { IComments } from '@/types/types';
import { AxiosResponse } from 'axios';

export const CommentsService = {
  async createComment(id: string, text: string, login: string) {
    const {data} = await axios.post(`news/${id}/test`, { data: { text, login } })
    return data
  },

  async getComments(id: string, pageNumber: number, sort: 'ASC' | 'DESC' = 'DESC'): Promise<IComments[]> {
    const {data} = await axios.get<IComments[]>(`news/${id}/comments`, {params: {
        pageNumber, sort
      }})
    return data
  },

  async getCountComments(newsId: string): Promise<number> {
    const {data} = await axios.get(`comments/count-comments/${newsId}`)
    return data
  },

  async createBottomComment(commentId: string, text: string, login: string): Promise<AxiosResponse | null> {
    return await axios.post(`comments/createBottom/${commentId}`, {data: {text, login}})
  },

  async getBottomComments(commentId: string): Promise<IComments[] | []> {
    const {data} = await axios.get(`comments/bottom/${commentId}`)
    return data
  },
}