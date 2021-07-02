import axios from "axios";

export interface IUseRegister {
  registerUser: (
    username: string,
    password: string
  ) => Promise<IRegisterResponse>;
}

interface IRegisterResponse {
  success?: boolean;
  error?: string;
}

export const useRegister = (): IUseRegister => {
  const registerUser = async (
    username: string,
    password: string
  ): Promise<IRegisterResponse> => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        username,
        password,
      });
      return { success: true };
    } catch (e) {
      console.log(e.response);
      if (e.response.status === 409) {
        return { error: "Username is taken" };
      }
      if (e.response.status === 400) {
        return { error: "Password is too weak" };
      }
      return { error: "Something went wrong, please try again" };
    }
  };

  return {
    registerUser,
  };
};
