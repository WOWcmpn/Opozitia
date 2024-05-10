import { ILoginUser, IRegisterUser } from "@/types/types";
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Access-Control-Allow-Methods"] =
  "GET, PUT, POST, DELETE, OPTIONS";

export const AuthService = {
  async register(user: IRegisterUser): Promise<any | null> {
    const data = await axios.post<IRegisterUser>(
      "auth/registration-password",
      user
    );
    return data;
  },

  async login(user: ILoginUser): Promise<any | null> {
    const data = await axios.post<ILoginUser>("auth/login", user);
    return data;
  },
};
