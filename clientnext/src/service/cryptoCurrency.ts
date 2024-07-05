import { ICrypto, ICurrency, IFullCrypto, IFullCurrency, IMainCrypto } from '@/types/types';
import axios from '@/service/axios';

export const CryptoCurrency = {
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
}