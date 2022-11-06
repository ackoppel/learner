import axios from "axios";
import { getIdentity } from "../../helper/getIdentity";
import { ChainType } from "../../core/chain";
import { getApiRequestHeaders } from "../../helper/getApiRequestHeaders";

interface ICoin {
  name: ChainType;
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
          headers: getApiRequestHeaders(accessToken),
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
