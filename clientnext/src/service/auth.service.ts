import { IConfirmationCode, ILogin, ILoginUser, IRegisterUser } from "@/types/types";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "./axios";
import inMemoryJWT from "./inMemoryJWT";

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
  async setNewPassword(password: string) {
    const { data } = await axios.post('/auth/')
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
