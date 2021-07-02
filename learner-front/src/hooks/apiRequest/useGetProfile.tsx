import axios from "axios";
import { IUserIdentity } from "../../components/auth/AuthContext";

const getIdentity = () => {
  const identity = localStorage.getItem("identity");
  if (identity) {
    try {
      return JSON.parse(identity) as IUserIdentity;
    } catch (e) {
      return { accessToken: null };
    }
  }
  return { accessToken: null };
};

export const useGetProfile = () => {
  const { accessToken } = getIdentity();
  const getProfile = async (): Promise<IUserIdentity> => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/profile`,
        {
          headers: {
            Authorization:
              accessToken !== null ? `Bearer ${accessToken}` : null,
          },
        }
      );
      return result.data;
    } catch (e) {
      localStorage.removeItem("identity");
      throw new Error();
    }
  };
  return {
    getProfile,
  };
};
