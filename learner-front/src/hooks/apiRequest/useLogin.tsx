import axios from "axios";
import { IUserIdentity } from "../../components/auth/AuthContext";

export interface IUseLogin {
  login: (username: string, password: string) => Promise<IUserIdentity>;
}

export const useLogin = (): IUseLogin => {
  const login = async (
    username: string,
    password: string
  ): Promise<IUserIdentity> => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          username,
          password,
        }
      );
      return result.data;
    } catch (e) {
      throw new Error(e.response.code);
    }
  };
  return {
    login,
  };
};
