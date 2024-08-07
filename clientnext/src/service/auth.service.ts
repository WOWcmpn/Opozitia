import { IConfirmationCode, ILogin, ILoginUser, IRegisterUser } from '@/types/types';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from './axios';
import inMemoryJWT from './inMemoryJWT';

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = inMemoryJWT.getToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export const AuthService = {
  async comparePasswords(password: string, login: string): Promise<AxiosResponse | null> {
    try {
      return await axios.post('/users/compare-passwords', {password, login})
    } catch (err) {
      console.error('compare password error ', err);
      return null
    }
  },

  async setNewPassword(password: string, email: string): Promise<AxiosResponse | null> {
    try {
      return await axios.post('/auth/new-password', {newPassword: password, email})
    } catch (err) {
      console.error('new password error ', err);
      return null
    }
  },

  async sendRecoveryPassCode(email: string): Promise<{code: string} | null> {
    try {
      const {data} = await axios.post('/auth/password-recovery', { email })
      return data
    } catch (err) {
      console.error('sendRecoveryPassCode error ', err);
      return null
    }
  },

  async changePassword(password: string, login: string): Promise<AxiosResponse | null> {
    return await axios.post('/auth/change-password', { newPassword: password, login })
  },

  async register(user: IRegisterUser): Promise<{code: string} | null> {
    try {
      const response: AxiosResponse = await axios.post("/auth/registration-password", user);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      return null;
    }
  },

  async registrationCode(code: IConfirmationCode): Promise<AxiosResponse | null> {
    try {
      const response: AxiosResponse = await axios.post("/auth/registration-code", code);
      return response.data;
    } catch (error) {
      console.error("Registration code error:", error);
      return null;
    }
  },

  async login(user: ILoginUser): Promise<ILogin | null> {
    try {
      const response: AxiosResponse = await axios.post("/auth/login", user);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  },
};
