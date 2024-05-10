import { IConfirmationCode, ILoginUser, IRegisterUser } from "@/types/types";
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import axios from "./axios";
import inMemoryJWT from "./inMemoryJWT";

axios.interceptors.request.use(
  function (config) {
    const accessToken = inMemoryJWT.getToken();

    if (accessToken != "") {
      config.headers["authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export const AuthService = {
  async register(user: IRegisterUser): Promise<any | null> {
    const { data } = await axios.post<IRegisterUser>(
      "/auth/registration-password",
      user
    );
    return data;
  },

  async registrationCode(code: IConfirmationCode): Promise<any | null> {
    const { data } = await axios.post<IConfirmationCode>(
      "/auth/registration-code",
      code
    );
    return data;
  },

  async login(user: ILoginUser): Promise<any | null> {
    const { data } = await axios.post<ILoginUser>("/auth/login", user);
    return data;
  },
};
