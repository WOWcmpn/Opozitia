import axios from '@/service/axios';
import { IProfileInfo } from '@/types/types';
import { AxiosResponse } from 'axios';

export const UsersService = {
  async sendEmail(name: string, location: string, text: string, email: string): Promise<AxiosResponse | null> {
    try {
      return await axios.post('users/send-question', { inputData: { name, location, text, email } })
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
    return await axios.put('users/profile/change-information', {
      userId,
      email,
      login,
      age,
      location,
      favoriteNewsCategory
    })
  },

  async getUserProfile(login: string): Promise<IProfileInfo> {
    const {data} = await axios.get('users/profile-login', {params: {
        login
      }})
    return data
  },
}