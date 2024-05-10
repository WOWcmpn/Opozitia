import { IRegisterUser } from "@/types/types";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/";

export const AuthService = {
  async register(user: IRegisterUser): Promise<any | null> {
    const data = await axios.post<IRegisterUser>(
      "auth/registration-password",
      user
    );
    return data;
  },
};
