import { IConfirmationCode, ILoginUser, IRegisterUser } from "@/types/types";
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
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
  async register(user: IRegisterUser): Promise<AxiosResponse | null> {
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

  async login(user: ILoginUser): Promise<AxiosResponse | null> {
    try {
      const response: AxiosResponse = await axios.post("/auth/login", user);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  },
};

// axios.interceptors.request.use(
//   function (config) {
//     const accessToken = inMemoryJWT.getToken();
//
//     if (accessToken != "") {
//       config.headers["authorization"] = `Bearer ${accessToken}`;
//     }
//
//     return config;
//   },
//   function (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );
//
// export const AuthService = {
//   async register(user: IRegisterUser): Promise<any | null> {
//     const { data } = await axios.post<IRegisterUser>(
//       "/auth/registration-password",
//       user
//     );
//     return data;
//   },
//
//   async registrationCode(code: IConfirmationCode): Promise<any | null> {
//     const { data } = await axios.post<IConfirmationCode>(
//       "/auth/registration-code",
//       code
//     );
//     return data;
//   },
//
//   async login(user: ILoginUser): Promise<any | null> {
//     const { data } = await axios.post<ILoginUser>("/auth/login", user);
//     return data;
//   },
// };
