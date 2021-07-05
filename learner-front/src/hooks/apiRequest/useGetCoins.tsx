import axios from "axios";
import { getIdentity } from "../helper/getIdentity";

interface ICoin {
  name: string;
  priceUsd: string;
  decimals: number;
  lastSync: Date;
}

interface IUseGetCoins {
  getCoins: () => Promise<ICoin[]>;
}

export const useGetCoins = (): IUseGetCoins => {
  const { accessToken } = getIdentity();

  const getCoins = async (): Promise<ICoin[]> => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/coin`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      if (e.response.status === 401 && accessToken) {
        localStorage.removeItem("identity");
      }
      throw new Error(e);
    }
  };

  return {
    getCoins,
  };
};
