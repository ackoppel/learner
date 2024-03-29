import axios from "axios";
import { IUserIdentity } from "../../components/auth/AuthContext";
import { getIdentity } from "../../helper/getIdentity";
import { getApiRequestHeaders } from "../../helper/getApiRequestHeaders";

export const useGetProfile = () => {
  const { accessToken } = getIdentity();
  const getProfile = async (): Promise<IUserIdentity> => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/profile`,
        {
          headers: getApiRequestHeaders(accessToken),
        }
      );
      return result.data;
    } catch (e) {
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
