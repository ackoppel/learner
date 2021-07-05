import axios from "axios";
import { IUserIdentity } from "../../components/auth/AuthContext";
import { getIdentity } from "../helper/getIdentity";

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
      console.log(e.response);
      if (e.response.status === 401 && accessToken) {
        localStorage.removeItem("identity");
      }
      throw new Error();
    }
  };
  return {
    getProfile,
  };
};
