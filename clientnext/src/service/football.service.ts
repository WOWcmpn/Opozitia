import { Championships, IChampionship } from '@/types/types';
import axios from '@/service/axios';

export const FootballService = {
  async getFootballByChampionship(championship: Championships): Promise<IChampionship[]> {
    const {data} = await axios.get('football/championship', {params: {championship}})
    return data
  }
}